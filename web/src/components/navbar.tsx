"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BriefcaseBusiness,
  Home,
  Info,
  Instagram,
  Linkedin,
  Mail,
  Menu,
  MessageSquareText,
  X,
} from "lucide-react";
import { mergeFooter, mergeNavigation } from "@/lib/site-settings-merge";
import { INITIAL_FOOTER, INITIAL_NAVIGATION } from "@/lib/site-settings-defaults";

const MOBILE_TABS = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/about", icon: Info },
  { name: "Services", href: "/services", icon: BriefcaseBusiness },
  { name: "Contact", href: "/contact", icon: MessageSquareText },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [nav, setNav] = useState(() => INITIAL_NAVIGATION);
  const [socialLinks, setSocialLinks] = useState(() => INITIAL_FOOTER.social);

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

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/site-settings/footer", {
          cache: "no-store",
        });
        const data = await res.json().catch(() => null);
        const merged = mergeFooter(data);
        if (!cancelled) setSocialLinks(merged.social);
      } catch {
        if (!cancelled) setSocialLinks(INITIAL_FOOTER.social);
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

          <div className="hidden lg:flex items-center gap-3 border-l border-stone-200 pl-8">
            {socialLinks.map((social, index) => {
              const key = `desktop-${social.icon}-${index}`;
              const lower = String(social.icon || "").toLowerCase();
              const Icon =
                lower === "instagram"
                  ? Instagram
                  : lower === "linkedin"
                    ? Linkedin
                    : Mail;
              return (
                <a
                  key={key}
                  href={social.href}
                  target={social.href?.startsWith("http") ? "_blank" : undefined}
                  rel={social.href?.startsWith("http") ? "noreferrer" : undefined}
                  className="bg-muted-burgundy-rose/10 p-2.5 rounded-full text-muted-burgundy-rose hover:bg-muted-burgundy-rose hover:text-white transition-colors"
                  aria-label={social.icon}
                >
                  <Icon size={16} />
                </a>
              );
            })}
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
        <div className="flex flex-col gap-8 px-10 py-8 bg-white min-h-[60vh]">
          {navLinks.map((link, index) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                style={{ transitionDelay: `${isOpen ? index * 50 : 0}ms` }}
                className={`
                  text-xs uppercase font-bold tracking-[0.2em] transition-all duration-300
                  ${isActive ? "text-muted-burgundy-rose border-l-4 border-muted-burgundy-rose pl-6" : "text-stone-800 border-l-0 pl-0"}
                  ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}
                `}
                onClick={handleLinkClick}
              >
                {link.name}
              </Link>
            );
          })}

          <div className="mt-3 pt-5 border-t border-stone-100">
            <div className="text-[10px] uppercase font-bold tracking-[0.18em] text-stone-400 mb-3">
              Follow us
            </div>
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => {
                const key = `${social.icon}-${index}`;
                const lower = String(social.icon || "").toLowerCase();
                const Icon =
                  lower === "instagram"
                    ? Instagram
                    : lower === "linkedin"
                      ? Linkedin
                      : Mail;
                return (
                  <a
                    key={key}
                    href={social.href}
                    target={social.href?.startsWith("http") ? "_blank" : undefined}
                    rel={social.href?.startsWith("http") ? "noreferrer" : undefined}
                    className="bg-muted-burgundy-rose/10 p-3 rounded-full text-muted-burgundy-rose hover:bg-muted-burgundy-rose hover:text-white transition-colors"
                    aria-label={social.icon}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile bottom tabs */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[900] border-t border-stone-200 bg-white/95 backdrop-blur-sm pb-[env(safe-area-inset-bottom)]">
        <div className="grid grid-cols-4">
          {MOBILE_TABS.map((tab) => {
            const isActive =
              pathname === tab.href ||
              (tab.href !== "/" && pathname.startsWith(tab.href));
            const Icon = tab.icon;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`flex flex-col items-center justify-center gap-1 py-2 transition-colors ${
                  isActive
                    ? "text-muted-burgundy-rose"
                    : "text-slate-500 hover:text-deep-midnight-navy"
                }`}
                onClick={handleLinkClick}
              >
                <Icon size={21} />
                <span className="text-[10px] font-bold">{tab.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;