"use client";
import React from "react";
import { FloatingNav } from "@/components/ui/floating-navbar";
export function ScrollNav() {
  const navItems = [
    {
      name: "Home",
      link: "/"
    },
    {
      name: "About",
      link: "/about",
    },
    {
      name: "Contact",
      link: "/contact",
    },
  ];
  return (
    <div className="  w-full">
      <FloatingNav navItems={navItems} /></div>
  );
}