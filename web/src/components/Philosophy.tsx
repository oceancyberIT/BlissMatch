import Image from "next/image";
import { Heart } from "lucide-react";
import { AboutContent } from "@/components/admin/about-editor/types";

type PhilosophyProps = {
  data?: AboutContent["philosophy"];
};

const Philosophy = ({ data }: PhilosophyProps) => {
  const content = data ?? {};

  const blocks = [
    {
      id: "01",
      title: content.promiseTitle ?? "Our Promise",
      body:
        content.body ??
        "We combine psychological insight with refined matchmaking practice to help clients connect on every level — intellectual, emotional, and spiritual.",
      image: content.imageLeft ?? "/image.png",
      imageAlt: "Philosophy image one",
      imageLeft: true,
    },
    {
      id: "02",
      title: content.trustTitle ?? "Discretion & Trust",
      body:
        content.trustText ??
        "Every client engagement is strictly confidential. We operate quietly, respectfully, and by appointment only.",
      image: content.imageCenter ?? "/image copy 4.png",
      imageAlt: "Philosophy image two",
      imageLeft: false,
    },
    {
      id: "03",
      title: "Our Perspective",
      body:
        content.quote ??
        "It starts with self-awareness, deepens through shared values, and endures through emotional intelligence.",
      image: content.imageRight ?? "/image copy 3.png",
      imageAlt: "Philosophy image three",
      imageLeft: true,
    },
  ];

  return (
    <section className="overflow-hidden bg-white py-12 lg:py-16">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="mb-10 text-center">
          <h2 className="font-serif text-3xl text-deep-midnight-navy md:text-4xl">
            <span className="font-semibold">{content.eyebrow ?? "Our"}</span>{" "}
            <span className="font-light">{content.headingAccent ?? "Philosophy"}</span>
          </h2>
          <div className="mx-auto mt-4 flex max-w-sm items-center justify-center gap-3 text-muted-burgundy-rose">
            <div className="h-px flex-1 bg-stone-200" />
            <Heart size={14} />
            <div className="h-px flex-1 bg-stone-200" />
          </div>
        </div>

        <div className="space-y-12 md:space-y-14">
          {blocks.map((item, idx) => (
            <div key={item.id} className="space-y-6">
              <div
                className={`grid grid-cols-1 items-center gap-6 md:grid-cols-[220px_1fr] ${
                  item.imageLeft ? "" : "md:grid-cols-[1fr_220px]"
                }`}
              >
                {item.imageLeft ? (
                  <>
                    <div className="relative mx-auto h-[170px] w-[170px] overflow-hidden rounded-full border border-stone-200 bg-stone-50">
                      <Image src={item.image} alt={item.imageAlt} fill className="object-cover" />
                    </div>
                    <div className="space-y-3 text-center md:text-left">
                      <h3 className="text-3xl font-serif text-stone-300">{item.id}</h3>
                      <h4 className="text-2xl font-semibold text-deep-midnight-navy">{item.title}</h4>
                      <p className="max-w-2xl text-sm leading-relaxed text-stone-600 md:text-base">
                        {item.body}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-3 text-center md:text-right">
                      <h3 className="text-3xl font-serif text-stone-300">{item.id}</h3>
                      <h4 className="text-2xl font-semibold text-deep-midnight-navy">{item.title}</h4>
                      <p className="ml-auto max-w-2xl text-sm leading-relaxed text-stone-600 md:text-base">
                        {item.body}
                      </p>
                    </div>
                    <div className="relative mx-auto h-[170px] w-[170px] overflow-hidden rounded-full border border-stone-200 bg-stone-50">
                      <Image src={item.image} alt={item.imageAlt} fill className="object-cover" />
                    </div>
                  </>
                )}
              </div>

              {idx < blocks.length - 1 ? (
                <div className="mx-auto flex max-w-xs items-center justify-center gap-3 text-muted-burgundy-rose">
                  <div className="h-px flex-1 bg-stone-200" />
                  <Heart size={12} />
                  <div className="h-px flex-1 bg-stone-200" />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
