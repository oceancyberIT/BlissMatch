"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Hero from "../components/Hero";
import ServiceQuestions from "../components/ServiceQuestions";
import OurStory from "../components/OurStory";
import OurServices from "../components/OurServices";
import SuccessStories from "../components/SuccessStories";
import WhyChooseUs from "../components/WhyChooseUs";
import LoveConnectionSection from "../components/Love";
import BlissCircle from "../components/BlissCircle";
import { HomeContent } from "@/components/admin/home-editor/types";
import { mergeHomeContent } from "@/components/admin/home-editor/constants";
import { mapSuccessStoriesFromApi, SUCCESS_STORIES_FALLBACK } from "@/lib/success-stories-data";
import type { HeroConfig } from "@/lib/hero-config";
import type { SuccessStory } from "@/lib/success-stories-data";

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
};

const Reveal = ({ children, delay = 0 }: RevealProps) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.65, ease: "easeOut", delay }}
  >
    {children}
  </motion.div>
);

type HomePageClientProps = {
  initialHomeContent: HomeContent;
  initialHeroConfig?: HeroConfig | null;
  initialSuccessStories: SuccessStory[];
};

const HomePageClient = ({
  initialHomeContent,
  initialHeroConfig,
  initialSuccessStories,
}: HomePageClientProps) => {
  const [homeContent, setHomeContent] = useState<HomeContent>(initialHomeContent);
  const [successStories, setSuccessStories] =
    useState<SuccessStory[]>(initialSuccessStories);

  useEffect(() => {
    let active = true;

    async function loadHomeContent() {
      try {
        const [homeRes, ssRes] = await Promise.all([
          fetch("/api/admin/home", { cache: "no-store" }),
          fetch("/api/admin/success-stories", { cache: "no-store" }),
        ]);
        const [homeData, ssData] = await Promise.all([
          homeRes.json().catch(() => null),
          ssRes.json().catch(() => []),
        ]);
        if (!active) return;
        if (homeRes.ok && homeData) {
          setHomeContent(mergeHomeContent(homeData));
        }
        if (ssRes.ok && Array.isArray(ssData)) {
          setSuccessStories(
            ssData.length ? mapSuccessStoriesFromApi(ssData) : SUCCESS_STORIES_FALLBACK,
          );
        }
      } catch {
        // Keep server-hydrated content
      }
    }

    loadHomeContent();
    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="flex flex-col w-full">
      <Reveal>
        <Hero initialHeroConfig={initialHeroConfig} />
      </Reveal>
      <Reveal delay={0.05}>
        <OurStory data={homeContent.ourStory} />
      </Reveal>
      <Reveal delay={0.08}>
        <OurServices data={homeContent.servicesOverview} />
      </Reveal>
      <Reveal delay={0.11}>
        <ServiceQuestions data={homeContent.servicesOverview} />
      </Reveal>
      <Reveal delay={0.14}>
        <WhyChooseUs data={homeContent.whyChooseUs} />
      </Reveal>
      <Reveal delay={0.17}>
        <LoveConnectionSection data={homeContent.loveConnection} />
      </Reveal>
      <Reveal delay={0.2}>
        <BlissCircle data={homeContent.blissCircle} />
      </Reveal>
      <Reveal delay={0.23}>
        <SuccessStories stories={successStories} />
      </Reveal>
    </main>
  );
};

export default HomePageClient;
