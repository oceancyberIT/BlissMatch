"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { mergeFooter } from "@/lib/site-settings-merge";
import { INITIAL_FOOTER } from "@/lib/site-settings-defaults";
import type { FooterContent } from "@/lib/site-settings-types";

const socialIcon = (icon: FooterContent["social"][0]["icon"]) => {
  switch (icon) {
    case "instagram":
      return Instagram;
    case "linkedin":
      return Linkedin;
    case "mail":
      return Mail;
    default:
      return Mail;
  }
};

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [f, setF] = useState<FooterContent>(() => INITIAL_FOOTER);

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

          <Link
            href={f.ctaButtonHref}
            className="group relative flex items-center justify-center px-20  w-20 h-10 bg-muted-burgundy-rose transition-transform hover:scale-105 duration-500 shrink-0"
          >
            <div className="text-center flex flex-col items-center">
              <span className="text-[9px] font-black uppercase tracking-widest">
                {f.ctaButtonLabel}
              </span>
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </div>
          </Link>
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
            <p className="text-white text-[11px] leading-relaxed max-w-xs font-bold tracking-wider">
              {f.brandTagline}
            </p>
          </div>

          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-[9px] font-black uppercase tracking-[0.2em]  text-stone-300">
              {f.navColumnTitle}
            </h4>
            <ul className="flex flex-col space-y-1 text-xs text-stone-300 font-bold">
              {f.links.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors tracking-widest"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-[9px] font-black uppercase tracking-widest  text-stone-300">
              {f.contactTitle}
            </h4>
            <div className="text-xs text-stone-300 space-y-1 font-bold tracking-widest">
              <p className="italic font-serif normal-case tracking-normal">
                {f.locationsLine}
              </p>
              <a
                href={f.emailHref}
                className="block hover:text-white transition-colors"
              >
                {f.email}
              </a>
            </div>
          </div>

          <div className="lg:col-span-3 flex lg:justify-end items-start pt-2">
            <div className="flex gap-4 opacity-70">
              {f.social.map((s, idx) => {
                const Icon = socialIcon(s.icon);
                return (
                  <Link
                    key={`${s.icon}-${idx}`}
                    href={s.href}
                    className="hover:text-muted-burgundy-rose transition-colors"
                  >
                    <Icon size={18} />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-white/5 text-[9px] font-black uppercase tracking-[0.2em] text-stone-300">
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
