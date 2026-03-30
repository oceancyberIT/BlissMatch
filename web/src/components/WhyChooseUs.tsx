import Image from "next/image";
import { ShieldCheck, Heart, UserCheck, Sparkles } from "lucide-react";
import ValueItem from "./ValueItems";
import { HomeContent } from "@/components/admin/home-editor/types";
import { INITIAL_CONTENT } from "@/components/admin/home-editor/constants";

type WhyChooseUsProps = {
  data?: HomeContent["whyChooseUs"];
};

const WhyChooseUs = ({ data }: WhyChooseUsProps) => {
  const content = data ?? INITIAL_CONTENT.whyChooseUs;
  const displayEyebrow = "Why Choose Us";
  const displayParagraph =
    "We listen first, then match with intention to create meaningful connections."

  return (
    <section className="relative overflow-hidden bg-soft-ivory-white py-10 lg:py-16">
      <div className="pointer-events-none absolute inset-0 z-0 hidden lg:block" aria-hidden="true">
        <div className="absolute -left-10 top-6 h-36 w-28 overflow-hidden border border-stone-200/70 shadow-sm xl:-left-12">
          <Image src="/image copy 2.png" alt="" fill className="object-cover" />
        </div>
        <div className="absolute -right-10 top-6 h-36 w-28 overflow-hidden border border-stone-200/70 shadow-sm xl:-right-12">
          <Image src="/image copy 6.png" alt="" fill className="object-cover" />
        </div>
        <div className="absolute -left-10 bottom-6 h-36 w-28 overflow-hidden  border border-stone-200/70 shadow-sm xl:-left-12">
          <Image src="/image copy 7.png" alt="" fill className="object-cover" />
        </div>
        <div className="absolute -right-10 bottom-6 h-36 w-28 overflow-hidden border border-stone-200/70 shadow-sm xl:-right-12">
          <Image src="/image copy.png" alt="" fill className="object-cover" />
        </div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-6">
            <span className="mb-4 block text-xs font-bold uppercase tracking-[0.2em] text-muted-burgundy-rose">
              {displayEyebrow}
            </span>

            <h2 className="mb-4 text-xl font-serif leading-tight text-deep-midnight-navy md:text-3xl">
              {content.headingMain} <br />
              <span className="italic">{content.headingAccent}</span>
            </h2>

            <div className="max-w-2xl space-y-5 leading-relaxed text-stone-600 text-sm md:text-base">
              <p>{displayParagraph}</p>

              <div className="border-y border-stone-100 py-4">
                <p className="text-sm font-serif italic text-muted-burgundy-rose md:text-base">
                  "{content.quote}"
                </p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 grid grid-cols-2 gap-x-3 gap-y-10 md:gap-y-5 self-center">
            <ValueItem
              icon={<ShieldCheck size={20} />}
              title={content.valueCards[0]?.title ?? "Confidentiality"}
              desc={content.valueCards[0]?.description ?? "Absolute discretion in every interaction."}
            />
            <ValueItem
              icon={<UserCheck size={20} />}
              title={content.valueCards[1]?.title ?? "Psychology"}
              desc={content.valueCards[1]?.description ?? "Rooted in human behavior studies."}
            />
            <ValueItem
              icon={<Heart size={20} />}
              title={content.valueCards[2]?.title ?? "Substance"}
              desc={content.valueCards[2]?.description ?? "Depth over digital algorithms."}
            />
            <ValueItem
              icon={<Sparkles size={24} />}
              title={content.valueCards[3]?.title ?? "Craft"}
              desc={content.valueCards[3]?.description ?? "Bespoke matchmaking at its finest."}
            />
          </div>
        </div>
      </div>

    </section>
  );
};

export default WhyChooseUs;
