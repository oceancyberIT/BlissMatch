import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HomeContent } from "@/components/admin/home-editor/types";

type OurStoryProps = {
  data?: HomeContent["ourStory"];
};

const OurStory = ({ data }: OurStoryProps) => {
  const content = data ?? {
    eyebrow: "Our Story",
    headingMain: "Restoring authenticity to",
    headingAccent: "modern connection.",
    paragraphOne:
      "BlissMatch was founded by two lifelong friends, uniting backgrounds in Human Behaviour and Business Law to create a sanctuary for meaningful love in a digital world.",
    quote: "We don’t introduce many. We introduce meaningfully.",
    paragraphTwo:
      "Our philosophy is simple: Love is deliberate. We combine psychological insight with refined matchmaking to help you connect on every level—intellectual, emotional, and spiritual.",
    ctaLabel: "Discover Our Full Philosophy",
    ctaHref: "/about",
    imageUrl: "/founders-working.png",
    imageAlt: "BlissMatch Founders",
  };

  return (
    <section className="bg-white py-10 lg:py-12 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative aspect-[4/3] md:aspect-4/5 w-full max-w-md mx-auto lg:mx-0 overflow-hidden rounded-sm shadow-2xl">
              <Image
                src={content.imageUrl}
                alt={content.imageAlt || "BlissMatch image"}
                fill
                className="object-cover"
              />
            </div>

            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-warm-linen -z-10 rounded-sm" />
          </div>

          <div className="flex flex-col">
            <span className="text-muted-burgundy-rose text-xs font-bold uppercase tracking-[0.3em] mb-4">
              {content.eyebrow}
            </span>

            <h2 className="text-3xl md:text-4xl font-serif text-deep-midnight-navy leading-tight mb-6">
              {content.headingMain} <br />
              <span className="italic">{content.headingAccent}</span>
            </h2>

            <div className="space-y-6 text-stone-600 leading-relaxed max-w-lg">
              <p className="text-sm md:text-base">{content.paragraphOne}</p>

              <blockquote className="border-l-2 border-muted-burgundy-rose pl-6 py-2 italic text-deep-midnight-navy font-serif md:text-lg text-base">
                "{content.quote}"
              </blockquote>

              <p className="text-sm">{content.paragraphTwo}</p>
            </div>

            <div className="mt-8">
              <Link
                href={content.ctaHref || "/about"}
                className="inline-flex items-center group text-deep-midnight-navy font-bold uppercase text-xs tracking-widest border-b border-stone-200 pb-2 hover:border-muted-burgundy-rose transition-all"
              >
                {content.ctaLabel}
                <ArrowRight className="ml-3 w-4 h-4 transition-transform group-hover:translate-x-2 text-muted-burgundy-rose" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
