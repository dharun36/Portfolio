"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./toggle";
import styles from "./Navbar.module.css";
const navLinks = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Certifications", href: "#certifications" },
  { name: "Contributions", href: "#contributions" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true); // Controls visibility (true = shown, false = hidden)
  const [atTop, setAtTop] = useState(true);    // Track if we're at the top of the page
  const lastScrollY = useRef<number>(0);
  const ticking = useRef<boolean>(false);

  useEffect(() => {
    // Get current scroll position
    const getScrollY = () => window.scrollY || document.documentElement.scrollTop;

    // Initialize state based on current scroll position
    const initialScroll = getScrollY();
    lastScrollY.current = initialScroll;
    setAtTop(initialScroll <= 50);

    // Define scroll handler with simpler, more reliable logic
    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const currentScrollY = getScrollY();
        const isScrollingDown = currentScrollY > lastScrollY.current;

        // Update navbar visibility
        if (open) {
          // Always show when mobile menu is open
          setVisible(true);
        } else if (currentScrollY <= 50) {
          // Always show at the top of the page
          setVisible(true);
          setAtTop(true);
        } else {
          setAtTop(false);
          // Show when scrolling up, hide when scrolling down
          if (isScrollingDown) {
            setVisible(false);
          } else {
            setVisible(true);
          }
        }

        // Update last scroll position
        lastScrollY.current = currentScrollY;
        ticking.current = false;
      });
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Run once to set initial state
    handleScroll();

    // Clean up
    return () => window.removeEventListener('scroll', handleScroll);
  }, [open]); // Re-setup when mobile menu opens/closes

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 px-4 py-6 ${styles.navbar} ${visible ? styles['navbar-visible'] : styles['navbar-hidden']}`}
      data-visible={visible ? 'true' : 'false'}
      data-at-top={atTop ? 'true' : 'false'}
    >
      <div className="max-w-6xl mx-auto">
        <div className={`${styles['navbar-content']} bg-white/5 backdrop-blur-sm max-h-full rounded-full border border-muted flex items-center justify-between px-6 py-3 transition-all duration-300 ${open ? 'shadow-lg' : ''}`}>
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
