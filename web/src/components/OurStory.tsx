import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HomeContent } from "@/components/admin/home-editor/types";

type OurStoryProps = {
  data?: HomeContent["ourStory"];
};

const OurStory = ({ data }: OurStoryProps) => {
  const shorten = (text: string, maxWords: number) => {
    const words = text.trim().split(/\s+/);
    if (words.length <= maxWords) return text;
    return `${words.slice(0, maxWords).join(" ")}...`;
  };

  const content = data ?? {
    eyebrow: "Our Story",
    headingMain: "Grounded in",
    headingAccent: "meaningful connection.",
    paragraphOne:
      "Founded by two lifelong friends, BlissMatch is grounded in Behavioural Science and Law.",
    quote: "We don’t introduce many. We introduce meaningfully.",
    paragraphTwo:
      "We blend psychology and refined matchmaking to help people build intentional, lasting relationships.",
    ctaLabel: "Discover Our Full Philosophy",
    ctaHref: "/about",
    imageUrl: "/founders-working.png",
    imageAlt: "BlissMatch Founders",
  };
  const combinedHeading = `${content.headingMain ?? ""} ${content.headingAccent ?? ""}`
    .replace(/\btooo\b/gi, "to")
    .replace(/\s+/g, " ")
    .trim();
  const displayHeading = /restoring authenticity/i.test(combinedHeading)
    ? "Authentic connection."
    : shorten(combinedHeading, 4);

  return (
    <section className="overflow-hidden bg-soft-ivory-white py-12 lg:py-16">
      <div className="mx-auto max-w-6xl px-6 lg:px-0">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
          <div className="grid grid-cols-[1fr_150px] gap-3 md:grid-cols-[1fr_170px]">
            <div className="relative min-h-[260px] overflow-hidden rounded bg-stone-100">
              <Image
                src={content.imageUrl}
                alt={content.imageAlt || "BlissMatch story image"}
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-3">
              <div className="relative h-[124px] overflow-hidden rounded border border-stone-200">
                <Image
                  src="/image copy 2.png"
                  alt="Couple sharing a joyful moment"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-[124px] overflow-hidden rounded border border-stone-200">
                <Image
                  src="/image copy 6.png"
                  alt="Couple walking together"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="mb-4 text-[12px] md:text-[13px] font-black uppercase tracking-[0.35em] text-muted-burgundy-rose">
              {content.eyebrow}
            </span>

            <h2 className="mb-4 font-serif text-2xl leading-tight text-deep-midnight-navy md:text-3xl">
              {displayHeading}
            </h2>

            <div className="max-w-lg space-y-4 leading-relaxed text-stone-700">
              <p className="text-sm md:text-base">{shorten(content.paragraphOne, 14)}</p>

              <blockquote className="border-l-2 border-muted-burgundy-rose/40 py-1 pl-4 font-serif text-base italic text-deep-midnight-navy md:text-lg">
                "{shorten(content.quote, 8)}"
              </blockquote>
            </div>

            <div className="mt-7">
              <Link
                href={content.ctaHref || "/about"}
                className="group inline-flex items-center border-b border-stone-300 pb-2 text-xs font-bold uppercase tracking-widest text-deep-midnight-navy transition-all hover:border-muted-burgundy-rose"
              >
                {content.ctaLabel}
                <ArrowRight className="ml-3 h-4 w-4 text-muted-burgundy-rose transition-transform group-hover:translate-x-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
