"use client";
import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AboutContent } from "@/components/admin/about-editor/types";
import { withCmsImageVersion } from "@/lib/cms-image";

gsap.registerPlugin(ScrollTrigger);

// ... (processStepsDefault stays the same)

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
  const containerRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<Array<HTMLDivElement | null>>([]);
  const steps = data?.steps?.length ? data.steps : processStepsDefault;

  useEffect(() => {
    const cards = cardsRef.current.filter(
      (card): card is HTMLDivElement => card !== null,
    );
    if (cards.length === 0 || !containerRef.current) return;

    // Without this, every card paints at full opacity in the same spot until GSAP runs.
    gsap.set(cards[0], { opacity: 1, y: 0, scale: 1, pointerEvents: "auto" });
    for (let i = 1; i < cards.length; i++) {
      gsap.set(cards[i], {
        opacity: 0,
        y: "75vh",
        scale: 0.92,
        pointerEvents: "none",
      });
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: `+=${cards.length * 100}%`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    cards.forEach((card, index) => {
      if (index === 0) return;

      tl.fromTo(
        card,
        { y: "75vh", opacity: 0, scale: 0.92, pointerEvents: "none" },
        {
          y: "0vh",
          opacity: 1,
          scale: 1,
          pointerEvents: "auto",
          duration: 1,
          ease: "power2.out",
        },
        index === 1 ? 0 : ">",
      );

      tl.to(
        cards[index - 1],
        {
          opacity: 0,
          y: "-35vh",
          scale: 0.9,
          pointerEvents: "none",
          duration: 0.75,
          ease: "power2.in",
        },
        "<",
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [steps.length]);

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden bg-stone-950">
      {/* Fixed Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src={withCmsImageVersion(data?.backgroundImageUrl ?? "/image.png")}
          alt="Background"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-transparent to-stone-950" />
      </div>

      {/* Header - Stays static while cards swap */}
      <div className="absolute top-12 left-0 w-full z-30 text-center px-6">
        <span className="text-muted-burgundy-rose text-[10px] font-black uppercase tracking-[0.4em] mb-2 block">
          {data?.eyebrow ?? "The Journey"}
        </span>
        <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight">
          {data?.heading ?? "Our Five-Step Process"}
        </h2>
      </div>

      {/* Cards Container */}
      <div className="relative h-full w-full flex items-center justify-center z-20">
        {steps.map((step, index) => (
          <div
            key={step.id}
            ref={(el) => {
              cardsRef.current[index] = el;
            }}
            className="absolute w-[90%] max-w-2xl"
            style={{
              zIndex: index + 10,
              opacity: index === 0 ? 1 : 0,
            }}
          >
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 md:p-16 shadow-2xl rounded-sm">
              <div className="flex flex-col items-center text-center">
                <span className="text-6xl md:text-8xl font-serif text-muted-burgundy-rose/30 font-black mb-6">
                  {step.id}
                </span>
                <h3 className="text-lg md:text-xl font-black text-white uppercase tracking-[0.2em] mb-6">
                  {step.title}
                </h3>
                <div className="w-12 h-[1px] bg-muted-burgundy-rose mb-6" />
                <p className="text-stone-200 leading-relaxed text-sm md:text-base max-w-md font-light">
                  {step.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Subtle Progress Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {steps.map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/20" />
        ))}
      </div>
    </section>
  );
};

export default ProcessTimeline;