"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./toggle";
const navLinks = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Certifications", href: "#certifications" },
  { name: "Contributions", href: "#contributions" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScroll = useRef<number>(0);
  const ticking = useRef<boolean>(false);

  useEffect(() => {
    // Find the app scroll container (some layouts use a div with overflow-y-auto)
    const maybeEl = document.querySelector('.overflow-y-auto') as HTMLElement | null;
    const scrollEl: Window | HTMLElement = maybeEl || window;

    // Initialize lastScroll based on the chosen container
    lastScroll.current = scrollEl === window ? (window.scrollY || window.pageYOffset) : (scrollEl as HTMLElement).scrollTop;

    const getScrollTop = () => (scrollEl === window ? (window.scrollY || window.pageYOffset) : (scrollEl as HTMLElement).scrollTop);

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const current = getScrollTop();
        const delta = current - lastScroll.current;

        // Small deadzone to avoid twitching
        const THRESHOLD = 10;

        if (open) {
          // keep visible while mobile menu is open
          setHidden(false);
        } else if (current <= 50) {
          // near top: always show
          setHidden(false);
        } else if (delta > THRESHOLD) {
          // scrolling down
          setHidden(true);
        } else if (delta < -THRESHOLD) {
          // scrolling up
          setHidden(false);
        }

        lastScroll.current = current;
        ticking.current = false;
      });
    };

    if (scrollEl === window) {
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    } else {
      (scrollEl as HTMLElement).addEventListener('scroll', onScroll, { passive: true });
      return () => (scrollEl as HTMLElement).removeEventListener('scroll', onScroll);
    }
  }, [open]);

  const navStyle: React.CSSProperties = {
    transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
    transition: 'transform 300ms ease-in-out, opacity 300ms ease-in-out',
    opacity: hidden ? 0 : 1,
    pointerEvents: hidden ? 'none' : 'auto',
  };

  return (
    <nav style={navStyle} className={`fixed top-0 left-0 w-full z-50 px-4 py-6`}>
      <div className="max-w-6xl mx-auto">
        <div className={`bg-white/5 backdrop-blur-sm max-h-full rounded-full border border-muted flex items-center justify-between px-6 py-3 transition-all duration-300 ${open ? 'shadow-lg' : ''}`}>
          {/* Logo / Name */}
          <Link href="/" className="flex items-center gap-2">
            <div className="text-foreground font-bold text-xl flex items-center gap-2">

              Dharun R
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center space-x-8 text-lg text-foreground text-bold">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className=" text-foreground transition-colors text-sm font-medium"
              >
                {link.name}
              </Link>
            ))}

            <ModeToggle />
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white text-lg"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="text-primary" /> : <Menu className="text-primary" />}
          </Button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden mt-2 mx-auto max-w-6xl bg-background backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="block px-6 py-3 text-foreground hover:bg-white/10 text-sm font-medium"
              onClick={() => setOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
