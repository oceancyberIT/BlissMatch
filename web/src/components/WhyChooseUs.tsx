import { ShieldCheck, Heart, UserCheck, Sparkles } from "lucide-react";
import ValueItem from "./ValueItems";
import { HomeContent } from "@/components/admin/home-editor/types";
import { INITIAL_CONTENT } from "@/components/admin/home-editor/constants";

type WhyChooseUsProps = {
  data?: HomeContent["whyChooseUs"];
};

const normalizeCardCopy = (text: string) =>
  text
    .replace(/interaction\.ss\b/gi, "interaction.")
    .replace(/\s+/g, " ")
    .trim();

const WhyChooseUs = ({ data }: WhyChooseUsProps) => {
  const content = data ?? INITIAL_CONTENT.whyChooseUs;
  const displayEyebrow = "Why Choose Us";
  const displayParagraph =
    "We listen first, then match with intention to create meaningful connections.";

  return (
    <section className="bg-soft-ivory-white py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-5">
            <span className="mb-4 block text-xs font-bold uppercase tracking-[0.2em] text-muted-burgundy-rose">
              {displayEyebrow}
            </span>

            <h2 className="mb-4 text-2xl font-serif leading-tight text-deep-midnight-navy md:text-3xl">
              {content.headingMain} <br />
              <span className="italic">{content.headingAccent}</span>
            </h2>

            <div className="max-w-2xl space-y-5 leading-relaxed text-stone-600 text-sm md:text-base">
              <p>{displayParagraph}</p>
              <div className="rounded-sm border border-stone-200/80 bg-white p-6 md:p-8">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-stone-500">
                  Our Promise
                </p>
                <p className="mt-3 text-sm font-serif italic text-muted-burgundy-rose md:text-base">
                  &ldquo;{content.quote}&rdquo;
                </p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="mb-6 border-b border-stone-200 pb-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-stone-500">
                The Four Pillars
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
              <ValueItem
                icon={<ShieldCheck size={20} />}
                title={content.valueCards[0]?.title ?? "Confidentiality"}
                desc={normalizeCardCopy(content.valueCards[0]?.description ?? "Absolute discretion in every interaction.")}
              />
              <ValueItem
                icon={<UserCheck size={20} />}
                title={content.valueCards[1]?.title ?? "Psychology"}
                desc={normalizeCardCopy(content.valueCards[1]?.description ?? "Rooted in human behavior studies.")}
              />
              <ValueItem
                icon={<Heart size={20} />}
                title={content.valueCards[2]?.title ?? "Substance"}
                desc={normalizeCardCopy(content.valueCards[2]?.description ?? "Depth over digital algorithms.")}
              />
              <ValueItem
                icon={<Sparkles size={24} />}
                title={content.valueCards[3]?.title ?? "Craft"}
                desc={normalizeCardCopy(content.valueCards[3]?.description ?? "Bespoke matchmaking at its finest.")}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
