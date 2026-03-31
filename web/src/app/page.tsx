 'use client';

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
import {
  INITIAL_CONTENT,
  mergeHomeContent,
} from "@/components/admin/home-editor/constants";

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

const Home = () => {
  const [homeContent, setHomeContent] = useState<HomeContent>(INITIAL_CONTENT);

  useEffect(() => {
    let active = true;

    async function loadHomeContent() {
      try {
        const res = await fetch('/api/admin/home');
        const data = await res.json().catch(() => null);
        if (!active) return;
        if (res.ok && data) {
          setHomeContent(mergeHomeContent(data));
        }
      } catch {
        // Keep fallback content
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
        <Hero />
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
        <SuccessStories />
      </Reveal>
    </main>
  );
};

export default Home;
