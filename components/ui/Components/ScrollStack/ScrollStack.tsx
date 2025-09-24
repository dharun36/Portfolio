/*
  Installed from https://reactbits.dev/ts/tailwind/
*/

import React, { ReactNode, useLayoutEffect, useRef, useCallback } from "react";
import Lenis from "lenis";

export interface ScrollStackItemProps {
  itemClassName?: string;
  style?: React.CSSProperties;
  children: ReactNode;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({
  children,
  itemClassName = "",
  style,
}) => (
  <div
    className={`scroll-stack-card relative h-96 mx-auto my-8 rounded-[40px] shadow-[0_0_30px_rgba(0,0,0,0.1)] dark:shadow-[0_0_30px_rgba(160,160,160,0.1)] box-border origin-top ${itemClassName}`.trim()}
    style={{
      backfaceVisibility: "hidden",
      marginLeft: "auto",
      marginRight: "auto",
      transition: 'none', // Explicitly disable transitions
      ...style,
    }}
  >
    {children}
  </div>
);

interface ScrollStackProps {
  className?: string;
  children: ReactNode;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  scaleDuration?: number;
  rotationAmount?: number;
  blurAmount?: number;
  onStackComplete?: () => void;
}

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = "",
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = "20%",
  scaleEndPosition = "10%",
  baseScale = 0.85,
  // Remove unused or transition-related props
  scaleDuration = 0, // Set to 0 to disable
  rotationAmount = 0,
  blurAmount = 0,
  onStackComplete,
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const lastTransformsRef = useRef(new Map<number, any>());
  const isUpdatingRef = useRef(false);

  const calculateProgress = useCallback((scrollTop: number, start: number, end: number) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value: string | number, containerHeight: number) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value as string);
  }, []);

  // Debounced update function to reduce calculation frequency
  const updateCardTransforms = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller || !cardsRef.current.length || isUpdatingRef.current) return;

    // Prevent multiple simultaneous updates
    isUpdatingRef.current = true;

    const scrollTop = scroller.scrollTop;
    const containerHeight = scroller.clientHeight;
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);
    const endElement = scroller.querySelector('.scroll-stack-end') as HTMLElement;
    const endElementTop = endElement ? endElement.offsetTop : 0;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const cardTop = card.offsetTop;
      const triggerStart = cardTop - stackPositionPx - (itemStackDistance * i);
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - stackPositionPx - (itemStackDistance * i);
      const pinEnd = endElementTop - containerHeight / 2;

      // Simplify scale calculation - less smooth but more performant
      let scaleProgress = 0;
      if (scrollTop >= triggerStart) {
        if (scrollTop >= triggerEnd) {
          scaleProgress = 1;
        } else {
          // Use simple division instead of calculateProgress for better performance
          scaleProgress = (scrollTop - triggerStart) / (triggerEnd - triggerStart);
        }
      }

      const targetScale = baseScale + (i * itemScale);
      const scale = 1 - scaleProgress * (1 - targetScale);
      // Remove rotation effect
      const rotation = 0;

      // Remove blur effect entirely
      const blur = 0;

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + (itemStackDistance * i);
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + (itemStackDistance * i);
      }

      const newTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100
      };

      const lastTransform = lastTransformsRef.current.get(i);
      // Increase threshold to reduce update frequency - prevents micro-updates that cause glittering
      const hasChanged = !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.5 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.005 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.5 ||
        Math.abs(lastTransform.blur - newTransform.blur) > 0.5;

      if (hasChanged) {
        // Simplified transform without transition effect
        const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale})`;
        // Remove blur effect completely

        // Apply transform directly without transition
        card.style.transform = transform;
        card.style.filter = '';
        card.style.transition = 'none'; // Explicitly disable transitions

        lastTransformsRef.current.set(i, newTransform);
      }

      if (i === cardsRef.current.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    isUpdatingRef.current = false;
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    onStackComplete,
    calculateProgress,
    parsePercentage,
  ]);

  // Add throttling to scroll handler to prevent excessive calculations
  const handleScroll = useCallback(() => {
    if (isUpdatingRef.current) return;
    updateCardTransforms();
  }, [updateCardTransforms]);

  const setupLenis = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const lenis = new Lenis({
      wrapper: scroller,
      content: scroller.querySelector('.scroll-stack-inner') as HTMLElement,
      // Remove easing for direct response without transitions
      duration: 0,
      easing: (t) => t, // Linear easing (no easing)
      // Disable smooth scrolling completely
      smoothWheel: false,
      touchMultiplier: 1,
      infinite: false,
      gestureOrientation: 'vertical',
      wheelMultiplier: 1,
      lerp: 0.1,
      syncTouch: true,
      syncTouchLerp: 0.075,
    });

    lenis.on('scroll', handleScroll);

    const raf = (time: number) => {
      lenis.raf(time);
      animationFrameRef.current = requestAnimationFrame(raf);
    };
    animationFrameRef.current = requestAnimationFrame(raf);

    lenisRef.current = lenis;
    return lenis;
  }, [handleScroll]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(scroller.querySelectorAll(".scroll-stack-card")) as HTMLElement[];
    cardsRef.current = cards;
    const transformsCache = lastTransformsRef.current;

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      // Remove GPU acceleration hints completely for simpler rendering
      card.style.willChange = 'auto';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      // Remove 3D transforms
      card.style.transform = 'none';
      card.style.webkitTransform = 'none';
      // Explicitly disable transitions
      card.style.transition = 'none';
      card.style.webkitTransition = 'none';
    });

    // Do not initialize Lenis for nested scrollers — it captures wheel events and
    // prevents normal scroll chaining to the parent page. We still run the transform
    // calculation.
    // setupLenis();

    updateCardTransforms();

    // Native scroll listener with improved throttling
    let rafId: number | null = null;
    let lastScrollTime = 0;
    const scrollThreshold = 32; // ~30fps max update rate

    const onScroll = () => {
      const now = Date.now();
      if (now - lastScrollTime < scrollThreshold) {
        // Skip this update if we updated too recently
        if (!rafId) {
          rafId = requestAnimationFrame(() => {
            updateCardTransforms();
            rafId = null;
            lastScrollTime = Date.now();
          });
        }
        return;
      }

      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        updateCardTransforms();
        rafId = null;
        lastScrollTime = Date.now();
      });
    };
    scroller.addEventListener('scroll', onScroll, { passive: true });

    // Recalculate on resize/orientation changes
    const onResize = () => updateCardTransforms();
    window.addEventListener('resize', onResize);

    // capture-phase wheel handler: if inner scroller is at an edge, forward the scroll to the page
    const wheelCapture = (e: WheelEvent) => {
      const atTop = scroller.scrollTop <= 0;
      const atBottom = scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 1;

      // If at an edge, do not prevent or stop the event here so the browser
      // can naturally bubble the wheel delta to parent scroll containers.
      // (Earlier versions prevented default here which blocked parent scrolling.)
      if ((atTop && e.deltaY < 0) || (atBottom && e.deltaY > 0)) {
        return; // allow event to continue
      }
    };

    scroller.addEventListener('wheel', wheelCapture, { passive: true, capture: true });

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      // lenisRef is intentionally left alone for nested usage to avoid re-capturing
      // scroll events. If you need Lenis on this component, re-enable setupLenis
      // and ensure it doesn't call preventDefault on wheel/touch events.
      scroller.removeEventListener('wheel', wheelCapture, { capture: true } as EventListenerOptions);
      scroller.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      stackCompletedRef.current = false;
      cardsRef.current = [];
      transformsCache.clear();
      isUpdatingRef.current = false;
    };
  }, [
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    scaleDuration,
    rotationAmount,
    blurAmount,
    onStackComplete,
    setupLenis,
    updateCardTransforms,
  ]);

  return (
    <div
      className={`relative w-full h-full overflow-y-auto overflow-x-visible ${className}`.trim()}
      ref={scrollerRef}
      style={{
        // allow scroll chaining so parent can scroll when this scroller reaches an edge
        overscrollBehavior: "auto",
        // Remove GPU acceleration hints
        msOverflowStyle: 'none',  /* IE and Edge */
        scrollbarWidth: 'none',   /* Firefox */
      }}
    >
      <div className="scroll-stack-inner pt-[10vh] px-4 sm:px-6 md:px-10 lg:px-20 pb-[10rem] min-h-screen">
        {children}
        {/* Spacer so the last pin can release cleanly */}
        <div className="scroll-stack-end w-full h-px" />
      </div>
    </div>
  );
};

export default ScrollStack;