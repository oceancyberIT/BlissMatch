"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { mergeFooter, mergeNavigation } from "@/lib/site-settings-merge";
import { INITIAL_FOOTER, INITIAL_NAVIGATION } from "@/lib/site-settings-defaults";
import type { FooterContent } from "@/lib/site-settings-types";

const COUPLES_GALLERY = ["/image.png", "/image copy 6.png", "/image copy 7.png"];

type FooterProps = {
  initialFooter?: FooterContent;
};

const Footer = ({ initialFooter }: FooterProps) => {
  const currentYear = new Date().getFullYear();
  const [f, setF] = useState<FooterContent>(() => initialFooter ?? INITIAL_FOOTER);
  const [nav, setNav] = useState(() => INITIAL_NAVIGATION);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/site-settings/footer", {
          cache: "no-store",
        });
        const data = await res.json().catch(() => null);
        if (!cancelled) setF(mergeFooter(data));
      } catch {
        if (!cancelled) setF(INITIAL_FOOTER);
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

  return (
    <footer className="bg-deep-midnight-navy text-white pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-white/10 pb-6 mb-6 gap-6">
          <div className="text-center md:text-left">
            <span className="text-white text-[10px] font-black uppercase tracking-[0.2em] mb-2 block">
              {f.ctaEyebrow}
            </span>
            <h2 className="text-2xl md:text-3xl font-serif leading-tight">
              {f.ctaTitle}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-10">
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative w-8 h-8">
                <Image
                  src="/logo1.png"
                  alt="BlissMatch"
                  fill
                  className="object-contain opacity-80"
                />
              </div>
              <span className="text-lg font-serif tracking-widest uppercase">
                {f.brandName}
              </span>
            </div>
            <p className="text-white text-[11px] leading-relaxed max-w-xs font-bold tracking-none">
              {f.brandTagline}
            </p>
          </div>

          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-[9px] font-black uppercase tracking-none  text-stone-300">
              {f.navColumnTitle}
            </h4>
            <ul className="flex flex-col space-y-1 text-xs text-stone-300 font-bold">
              {f.links.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors tracking-none"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-[9px] font-black uppercase tracking-none  text-stone-300">
              {f.contactTitle}
            </h4>
            <div className="text-xs text-stone-300 space-y-1 font-bold tracking-none">
              <p className="italic font-serif normal-case tracking-none">
                {f.locationsLine.replace(/\s*•\s*Paris\b/i, "")}
              </p>
              <a
                href={f.emailHref}
                className="block hover:text-white transition-colors"
              >
                {f.email}
              </a>
              <a
                href={nav.phoneHref}
                className="block hover:text-white transition-colors"
              >
                {nav.phoneNumber}
              </a>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-[9px] font-black uppercase tracking-none text-stone-300 lg:text-right">
              Couples Gallery
            </h4>
            <div className="grid grid-cols-3 gap-2 lg:justify-items-end">
              {COUPLES_GALLERY.map((src, idx) => (
                <div key={src} className="relative w-20 h-20 overflow-hidden rounded-md border border-white/10">
                  <Image
                    src={src}
                    alt={`Couple ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-white/5 text-[9px] font-black uppercase text-stone-300">
          <p>
            © {currentYear} {f.copyright}
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            {f.legal.map((l) => (
              <Link
                key={l.id}
                href={l.href}
                className="hover:text-white transition-colors"
              >
                {l.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
