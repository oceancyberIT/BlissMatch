import { ShieldCheck, Heart, UserCheck, Sparkles } from "lucide-react";
import ValueItem from "./ValueItems";
import { HomeContent } from "@/components/admin/home-editor/types";
import { INITIAL_CONTENT } from "@/components/admin/home-editor/constants";

type WhyChooseUsProps = {
  data?: HomeContent["whyChooseUs"];
};

const WhyChooseUs = ({ data }: WhyChooseUsProps) => {
  const content = data ?? INITIAL_CONTENT.whyChooseUs;

  return (
    <section className="bg-white py-20 lg:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7">
            <span className="text-muted-burgundy-rose text-xs font-bold uppercase tracking-[0.2em] mb-6 block">
              {content.eyebrow}
            </span>

            <h2 className="text-4xl md:text-5xl font-serif text-deep-midnight-navy leading-tight mb-5">
              {content.headingMain} <br />
              <span className="italic">{content.headingAccent}</span>
            </h2>

            <div className="space-y-8 text-stone-600 text-lg md:text-[18px] leading-relaxed max-w-2xl">
              <p>{content.paragraphOne}</p>

              <div className="py-4 border-y border-stone-100">
                <p className="text-muted-burgundy-rose font-serif italic text-xl">
                  "{content.quote}"
                </p>
              </div>

              <p className="text-base text-stone-500">
                {content.paragraphTwo}{" "}
              </p>
            </div>
          </div>
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12 self-center">
            <ValueItem
              icon={<ShieldCheck size={24} />}
              title={content.valueCards[0]?.title ?? "Confidentiality"}
              desc={content.valueCards[0]?.description ?? "Absolute discretion in every interaction."}
            />
            <ValueItem
              icon={<UserCheck size={24} />}
              title={content.valueCards[1]?.title ?? "Psychology"}
              desc={content.valueCards[1]?.description ?? "Rooted in human behavior studies."}
            />
            <ValueItem
              icon={<Heart size={24} />}
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
