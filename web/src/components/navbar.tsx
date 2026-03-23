"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { mergeNavigation } from "@/lib/site-settings-merge";
import { INITIAL_NAVIGATION } from "@/lib/site-settings-defaults";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [nav, setNav] = useState(() => INITIAL_NAVIGATION);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/site-settings/navigation", {
          cache: "no-store",
        });
        const data = await res.json().catch(() => null);
        if (!cancelled) setNav(mergeNavigation(data));
      } catch {
        if (!cancelled) setNav(INITIAL_NAVIGATION);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const navLinks = nav.items.map((item) => ({
    name: item.name,
    href: item.href,
  }));

  // Close menu when clicking a link
  const handleLinkClick = () => setIsOpen(false);

  // Optional: Prevent background scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    // Changed to fixed and ensured solid bg-white
    <nav className="w-full bg-white border-b border-stone-200/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex justify-between items-center py-4">
          <Link
            href="/"
            className="flex flex-col items-center group transition-transform hover:scale-105"
          >
            <div className="relative w-12 h-10">
              <Image
                src="/logo1.png"
                alt="BlissMatch Heart"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-[12px] font-bold tracking-[0.2em] uppercase text-deep-midnight-navy mt-1">
              BlissMatch
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative py-2 text-[12px] uppercase font-bold tracking-[0.15em] transition-colors duration-300 group
                    ${isActive ? "text-muted-burgundy-rose" : "text-stone-600 hover:text-muted-burgundy-rose"}
                  `}
                >
                  {link.name}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-muted-burgundy-rose transition-all duration-300 ease-in-out
                      ${isActive ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-50"}
                    `}
                  />
                </Link>
              );
            })}
          </div>

          {/* Desktop Contact Info */}
          <div className="hidden lg:flex items-center gap-4 border-l border-stone-200 pl-8">
            <div className="bg-muted-burgundy-rose p-2.5 rounded-full text-white shadow-md shadow-rose-100">
              <Phone size={16} fill="currentColor" />
            </div>
            <div className="flex flex-col">
              <span className="uppercase text-[10px] font-bold tracking-widest text-stone-400">
                {nav.phoneLabel}
              </span>
              <a
                href={nav.phoneHref}
                className="text-[15px] font-bold text-deep-midnight-navy hover:text-muted-burgundy-rose transition-colors"
              >
                {nav.phoneNumber}
              </a>
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-deep-midnight-navy p-2 focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`
          lg:hidden absolute left-0 w-full bg-white border-b border-stone-100 shadow-2xl z-[999]
          transition-all duration-500 ease-in-out transform
          ${isOpen ? "top-full opacity-100 visible translate-y-0" : "top-full opacity-0 invisible -translate-y-4"}
        `}
      >
        {/* Changed bg-background to bg-white for guaranteed opacity */}
        <div className="flex flex-col gap-8 p-10 bg-white min-h-[60vh]">
          {navLinks.map((link, index) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                style={{ transitionDelay: `${isOpen ? index * 50 : 0}ms` }}
                className={`
                  text-sm uppercase font-bold tracking-[0.2em] transition-all duration-300
                  ${isActive ? "text-muted-burgundy-rose border-l-4 border-muted-burgundy-rose pl-6" : "text-stone-800 border-l-0 pl-0"}
                  ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}
                `}
                onClick={handleLinkClick}
              >
                {link.name}
              </Link>
            );
          })}

          {/* Added mobile phone contact to the menu */}
          <div className="mt-4 pt-5 border-t border-stone-100 flex items-center gap-4">
            <div className="bg-muted-burgundy-rose/10 p-3 rounded-full text-muted-burgundy-rose">
              <Phone size={20} />
            </div>
            <a
              href={nav.phoneHref}
              className="text-deep-midnight-navy font-bold tracking-widest"
            >
              {nav.phoneNumber}
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;