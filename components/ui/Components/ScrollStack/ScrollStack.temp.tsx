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
    className={`scroll-stack-card relative h-96 sm:mx-4 md:mx-8 lg:mx-32 my-8 rounded-[40px] shadow-[0_0_30px_rgba(0,0,0,0.1)] dark:shadow-[0_0_30px_rgba(160,160,160,0.1)] box-border origin-top ${itemClassName}`.trim()}
    style={{
      backfaceVisibility: "hidden",
      transform: 'translateZ(0)', // Force hardware acceleration
      transition: 'none', // Explicitly disable transitions
      willChange: 'transform', // Hint to browser for optimization
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

  const updateCardTransforms = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller || !cardsRef.current.length || isUpdatingRef.current) return;

    // Use requestAnimationFrame for performance
    requestAnimationFrame(() => {
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

        // Direct scale calculation for improved smoothness
        let scaleProgress = 0;
        if (scrollTop >= triggerStart) {
          if (scrollTop >= triggerEnd) {
            scaleProgress = 1;
          } else {
            scaleProgress = (scrollTop - triggerStart) / (triggerEnd - triggerStart);
          }
        }

        const targetScale = baseScale + (i * itemScale);
        const scale = 1 - scaleProgress * (1 - targetScale);

        // Calculate translateY directly
        let translateY = 0;
        const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

        if (isPinned) {
          translateY = scrollTop - cardTop + stackPositionPx + (itemStackDistance * i);
        } else if (scrollTop > pinEnd) {
          translateY = pinEnd - cardTop + stackPositionPx + (itemStackDistance * i);
        }

        // Apply direct transform without transitions
        const transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;

        card.style.transform = transform;
        card.style.filter = '';
        card.style.transition = 'none';

        // Check if this is the last card for completion callback
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
    });
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    onStackComplete,
    parsePercentage
  ]);

  // Throttled scroll handler
  const handleScroll = useCallback(() => {
    if (!isUpdatingRef.current) {
      updateCardTransforms();
    }
  }, [updateCardTransforms]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(scroller.querySelectorAll(".scroll-stack-card")) as HTMLElement[];
    cardsRef.current = cards;

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      // Disable all transitions and optimize rendering
      card.style.willChange = 'transform';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      card.style.transition = 'none';
      card.style.webkitTransition = 'none';
    });

    updateCardTransforms();

    // Use a more efficient scroll handler with throttling
    let rafId: number | null = null;
    let lastScrollTime = 0;
    const scrollThreshold = 16; // ~60fps

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

    // Recalculate on resize
    const onResize = () => updateCardTransforms();
    window.addEventListener('resize', onResize);

    // Handle wheel events for proper scroll chaining
    const wheelCapture = (e: WheelEvent) => {
      const atTop = scroller.scrollTop <= 0;
      const atBottom = scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 1;

      if ((atTop && e.deltaY < 0) || (atBottom && e.deltaY > 0)) {
        return; // allow event to continue to parent
      }
    };

    scroller.addEventListener('wheel', wheelCapture, { passive: true, capture: true });

    return () => {
      // Clean up all event listeners and references
      scroller.removeEventListener('wheel', wheelCapture, { capture: true } as EventListenerOptions);
      scroller.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      cardsRef.current = [];
      lastTransformsRef.current.clear();
      isUpdatingRef.current = false;
      stackCompletedRef.current = false;
    };
  }, [
    itemDistance,
    itemStackDistance,
    updateCardTransforms,
  ]);

  return (
    <div
      className={`relative w-full h-full overflow-y-auto overflow-x-visible ${className}`.trim()}
      ref={scrollerRef}
      style={{
        overscrollBehavior: "auto", // allow scroll chaining
        msOverflowStyle: 'none',  /* IE and Edge */
        scrollbarWidth: 'none',   /* Firefox */
        scrollBehavior: 'auto',   /* Direct scrolling */
        WebkitOverflowScrolling: 'touch', /* iOS smooth scroll */
      }}
    >
      <div className="scroll-stack-inner pt-[10vh] px-4 sm:px-6 md:px-10 lg:px-20 pb-[10rem] min-h-screen">
        {children}
        {/* Spacer for the last pin release */}
        <div className="scroll-stack-end w-full h-px" />
      </div>
    </div>
  );
};

export default ScrollStack;