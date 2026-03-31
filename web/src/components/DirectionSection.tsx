"use client";
import React from "react";
import { ShieldCheck, EyeOff, UserCheck, CalendarDays } from "lucide-react";
import PrivacyCard from "./PrivacyCard";
import { AboutContent } from "@/components/admin/about-editor/types";

type DiscretionSectionProps = {
  data?: AboutContent["discretion"];
};

const compactCopy = (text: string, maxWords = 18) => {
  const words = text.trim().split(/\s+/);
  if (words.length <= maxWords) return text.trim();
  return `${words.slice(0, maxWords).join(" ")}.`;
};

const DiscretionSection = ({ data }: DiscretionSectionProps) => {
  const cards = data?.cards ?? [];
  const paragraphSource =
    data?.paragraph ??
    "Every engagement is private and by appointment only. We handle each relationship with discretion, professionalism, and care.";
  const paragraph = compactCopy(paragraphSource, 18);
  return (
    <section className="relative bg-deep-midnight-navy py-10 lg:py-20 overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path d="M0,0 L100,0 L100,100 Z" fill="white" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
              <ShieldCheck size={16} className="text-muted-burgundy-rose" />
              <span className="text-white/80 text-[10px] font-bold uppercase tracking-[0.2em]">
                {data?.badge ?? "Strictly Confidential"}
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight">
              {data?.headingMain ?? "Discretion is our"} <br />
              <span className="italic text-muted-burgundy-rose">
                {data?.headingAccent ?? "Foundation."}
              </span>
            </h2>

            <p className="text-stone-300 md:text-lg text-base leading-relaxed font-light">
              {paragraph}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <PrivacyCard
              icon={<EyeOff size={20} />}
              title={cards[0]?.title ?? "Invisible Digital Footprint"}
              desc={cards[0]?.desc ?? "We do not maintain public profiles of our clients. Your journey remains private."}
            />
            <PrivacyCard
              icon={<CalendarDays size={20} />}
              title={cards[1]?.title ?? "By Appointment Only"}
              desc={cards[1]?.desc ?? "We ensure dedicated time and total focus for every single consultation."}
            />
            <PrivacyCard
              icon={<UserCheck size={20} />}
              title={cards[2]?.title ?? "Personal Handling"}
              desc={cards[2]?.desc ?? "No automated systems. Only high-level human consultancy."}
            />
            <PrivacyCard
              icon={<ShieldCheck size={20} />}
              title={cards[3]?.title ?? "Legal Protection"}
              desc={cards[3]?.desc ?? "Strict non-disclosure agreements protect all parties involved."}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscretionSection;
