"use client";
import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AboutContent } from "@/components/admin/about-editor/types";

gsap.registerPlugin(ScrollTrigger);

const processStepsDefault = [
  {
    id: "01",
    title: "Private Consultation",
    description:
      "Every journey begins with listening. We meet you - in person or virtually - to understand your story, values, and relationship goals.",
  },
  {
    id: "02",
    title: "Compatibility Design",
    description:
      "We craft a detailed personal profile based on insight, capturing your history, emotional needs, and long-term goals.",
  },
  {
    id: "03",
    title: "Curated Introductions",
    description:
      "We introduce you only to those who reflect your values and lifestyle. Every introduction is strictly confidential.",
  },
  {
    id: "04",
    title: "Relationship Coaching",
    description:
      "Personalised coaching helping you approach love with self-awareness, confidence, and emotional clarity.",
  },
  {
    id: "05",
    title: "Ongoing Support",
    description:
      "Our role continues as you connect - offering insight and quiet guidance as your relationship evolves.",
  },
];

type ProcessTimelineProps = {
  data?: AboutContent["process"];
};

const ProcessTimeline = ({ data }: ProcessTimelineProps) => {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    const pin = gsap.fromTo(
      sectionRef.current,
      { translateX: 0 },
      {
        translateX: "-150vw", // Reduced travel distance for tighter scroll
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "+=2000px", // Shorter scroll end for better density
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      },
    );
    return () => {
      pin.kill();
    };
  }, []);

  return (
    <section ref={triggerRef} className="overflow-hidden relative h-[70vh]">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src={data?.backgroundImageUrl ?? "/image.png"}
          alt="Couple holding hands"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-stone-950/60 backdrop-blur-[1px]" />
      </div>

      {/* Header - Reduced top padding and text size */}
      <div className="absolute top-10 md:top-12 left-1/2 -translate-x-1/2 z-20 text-center w-full px-6">
        <span className="text-muted-burgundy-rose text-[10px] font-black uppercase tracking-[0.4em] mb-2 block">
          {data?.eyebrow ?? "The Journey"}
        </span>
        <h2 className="text-3xl md:text-4xl font-serif text-white tracking-tight">
          {data?.heading ?? "Our Five-Step Process"}
        </h2>
      </div>

      {/* Timeline - Reduced width for tighter spacing */}
      <div
        ref={sectionRef}
        className="flex relative z-10 w-[350vw] h-[98%] items-start md:items-center pt-28 md:pt-0"
      >
        {(data?.steps ?? processStepsDefault).map((step) => (
          <div
            key={step.id}
            className="w-[65vw] h-full flex flex-col justify-center items-center px-4 md:px-10"
          >
            {/* Card - Reduced padding and max-width */}
            <div className="relative p-6 md:p-10 bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl w-full max-w-2xl group transition-all duration-500 hover:bg-white/[0.08]">
              <div className="absolute top-3 bottom-0 left-0 w-1 bg-muted-burgundy-rose opacity-40 group-hover:opacity-100 transition-opacity" />

              <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-8">
                {/* ID - Scaled down */}
                <span className="text-5xl md:text-6xl font-serif text-white opacity-20 font-black tracking-tighter shrink-0 leading-none">
                  {step.id}
                </span>

                <div className="pt-1">
                  <h3 className="text-sm md:text-base font-black text-white uppercase tracking-[0.2em] mb-3 group-hover:text-muted-burgundy-rose transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-stone-300 leading-relaxed text-[13px] md:text-sm font-medium">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProcessTimeline;
