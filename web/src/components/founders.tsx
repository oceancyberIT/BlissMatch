"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { AboutContent } from "@/components/admin/about-editor/types";

type FoundersSectionProps = {
  data?: AboutContent["hero"];
};

const firstSentence = (text: string) => {
  const [sentence] = text.split(/(?<=[.!?])\s+/);
  return sentence?.trim() || text.trim();
};

const compactCopy = (text: string, maxWords = 18) => {
  const sentence = firstSentence(text);
  const words = sentence.split(/\s+/);
  if (words.length <= maxWords) return sentence;
  return `${words.slice(0, maxWords).join(" ")}...`;
};

const FoundersSection = ({ data }: FoundersSectionProps) => {
  const title = data?.title?.trim() || "Two Friends. Two Worlds.";
  const subtitle = data?.subtitle?.trim() || "One Mission.";
  const firstParagraph =
    data?.body?.trim() ||
    "Bliss Match began with two best friends blending psychology, human behavior, business, and law.";
  const secondParagraph =
    data?.sideNote?.trim() ||
    "Their approach is professional yet personal, discreet yet warm, and timeless yet modern.";
  const founderImage = data?.sideImageUrl?.trim() || "/image copy.png";
  const shortFirstParagraph = compactCopy(firstParagraph, 18);
  const shortSecondParagraph = compactCopy(secondParagraph, 18);

  return (
    <section className="md:py-16 py-10 bg-warm-linen overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Content */}
        <div className="space-y-6">
          <span className="text-muted-burgundy-rose font-bold uppercase tracking-widest text-sm">
            Our Founders
          </span>
          
          <h2 className="text-3xl md:text-4xl font-serif text-stone-900 leading-tight">
            {title}
            <br />
            <span className="italic">{subtitle}</span>
          </h2>
          
          <div className="max-w-md space-y-3 leading-relaxed text-stone-600 md:max-w-lg">
            <p>{shortFirstParagraph}</p>
            <div className="h-px w-14 bg-muted-burgundy-rose/35" />
            <p>{shortSecondParagraph}</p>
          </div>

          <button className="mt-4 px-8 py-3 bg-muted-burgundy-rose text-white rounded-none font-medium hover:bg-deep-midnight-navy transition-colors shadow-lg shadow-burgundy-rose/20">
            Meet Our Team
          </button>
        </div>

        {/* Right Visual (The Orbit Effect) */}
        <div className="relative flex justify-center items-center h-[400px] md:h-[500px]">
          {/* Inner Circle */}
          <div className="absolute w-48 h-48 border border-stone-100 rounded-full" />
          
          {/* Middle Orbit Path */}
          <div className="absolute w-72 h-72 border border-stone-200 rounded-full border-dashed" />
          
          {/* Outer Orbit Path */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute w-[350px] h-[350px] border border-stone-100 rounded-full"
          />

          {/* Central Heart/Infinity Icon */}
          <div className="relative z-10 w-20 h-20 bg-white shadow-2xl rounded-full flex items-center justify-center">
             <div className="text-muted-burgundy-rose text-2xl">∞</div>
          </div>

          {/* Floating Founders/Avatars */}
          {/* Founder 1 */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 right-10 z-20"
          >
            <div className="w-16 h-16 rounded-full border-4 border-white shadow-xl overflow-hidden">
              <Image src={founderImage} alt="Founder" width={64} height={64} className="object-cover" />
            </div>
          </motion.div>

          {/* Founder 2 */}
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-20 left-10 z-20"
          >
            <div className="w-16 h-16 rounded-full border-4 border-white shadow-xl overflow-hidden">
              <Image src={founderImage} alt="Founder" width={64} height={64} className="object-cover" />
            </div>
          </motion.div>

          {/* Decorative Hearts */}
          <div className="absolute top-1/2 -right-4 w-8 h-8 bg-rose-50 rounded-full flex items-center justify-center shadow-sm">
            <span className="text-rose-400 text-xs">♥</span>
          </div>
          <div className="absolute top-10 left-1/4 w-6 h-6 bg-rose-100 rounded-full flex items-center justify-center animate-pulse">
            <span className="text-rose-500 text-[10px]">♥</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FoundersSection;