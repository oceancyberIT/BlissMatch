import Image from "next/image";
import { ShieldCheck, MapPin, Users } from "lucide-react";
import { HomeContent } from "@/components/admin/home-editor/types";
import { INITIAL_CONTENT } from "@/components/admin/home-editor/constants";
import { withCmsImageVersion } from "@/lib/cms-image";

type BlissCircleProps = {
  data?: HomeContent["blissCircle"];
};

const compactCopy = (text: string, maxWords = 16) => {
  const words = text.trim().split(/\s+/);
  if (words.length <= maxWords) return text.trim();
  return `${words.slice(0, maxWords).join(" ")}...`;
};

const BlissCircle = ({ data }: BlissCircleProps) => {
  const content = {
    ...INITIAL_CONTENT.blissCircle,
    ...(data ?? {}),
  };

  const badgeIcons = [ShieldCheck, MapPin, Users];

  return (
    <section className="relative overflow-hidden bg-soft-ivory-white py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-[1fr_1.25fr]">
          <div className="flex flex-col gap-6">
            <div className="rounded-sm bg-white p-7 md:p-8">
              <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.45em] text-muted-burgundy-rose">
                {content.eyebrow}
              </span>

              <h2 className="mb-4 text-3xl font-serif leading-tight text-deep-midnight-navy md:text-4xl">
                {content.headingMain}{" "}
                <span className="italic">{content.headingAccent}</span>
              </h2>

              <div className="space-y-4 text-sm leading-relaxed text-stone-600 md:text-base">
                <p>{compactCopy(content.paragraphOne, 15)}</p>
                {content.paragraphTwo?.trim() ? (
                  <p>{compactCopy(content.paragraphTwo, 13)}</p>
                ) : null}
              </div>

              <div className="mt-6 grid grid-cols-3 gap-4 border-t border-stone-100 pt-5">
                {content.badges.slice(0, 3).map((badge, index) => {
                  const Icon = badgeIcons[index] ?? ShieldCheck;
                  return (
                    <div
                      key={`${badge.label}-${index}`}
                      className="text-center md:text-left"
                    >
                      <Icon
                        size={16}
                        className="mx-auto mb-2 text-muted-burgundy-rose md:mx-0"
                      />
                      <span className="text-[9px] font-bold uppercase tracking-widest text-deep-midnight-navy">
                        {badge.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative min-h-[150px] overflow-hidden rounded-br-[70px] border border-stone-200 bg-white">
              <Image
                src={withCmsImageVersion(content.secondaryImageUrl)}
                alt={content.secondaryImageAlt || "Bliss Circle"}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="relative min-h-[250px] overflow-hidden rounded-tl-[2px] rounded-tr-[95px] rounded-br-[95px] rounded-bl-[95px] border border-stone-200 bg-white group lg:min-h-[300px]">
            <Image
              src={withCmsImageVersion(content.imageUrl)}
              alt={content.imageAlt || "Bliss circle image"}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-all duration-700"
            />

            <div className="absolute inset-0 flex items-end justify-start bg-gradient-to-t from-deep-midnight-navy/45 to-transparent p-8">
              <div>
                <h4 className="mb-3 font-serif text-2xl italic text-white">
                  {content.overlayTitle}
                </h4>
                <button
                  type="button"
                  className="rounded-sm rounded-bl-full bg-white px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-deep-midnight-navy transition-all duration-500 hover:bg-muted-burgundy-rose hover:text-white"
                >
                  {content.overlayCtaLabel}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlissCircle;
