"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ServicesHero from "../../components/ServiceHero";
import ServiceGrid from "../../components/ServiceGrid";
import ConfidentialityCharter from "../../components/ConfiDentialityCharter";
import SocialImpact from "../../components/SocialImpact";
import { ServicesContent } from "@/components/admin/services-editor/types";
import {
  INITIAL_SERVICES_CONTENT,
  mergeServicesContent,
} from "@/components/admin/services-editor/constants";
import SuccessStories, {
  SUCCESS_STORIES_FALLBACK,
  mapSuccessStoriesFromApi,
  type SuccessStory,
} from "@/components/SuccessStories";
import BlissCircle from "@/components/BlissCircle";
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

const ServicesPage = () => {
  const [content, setContent] = useState<ServicesContent>(INITIAL_SERVICES_CONTENT);
  const [homeContent, setHomeContent] = useState<HomeContent>(INITIAL_CONTENT);
  const [successStories, setSuccessStories] = useState<SuccessStory[]>(
    SUCCESS_STORIES_FALLBACK,
  );

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const [servicesRes, homeRes, ssRes] = await Promise.all([
          fetch("/api/admin/services"),
          fetch("/api/admin/home"),
          fetch("/api/admin/success-stories", { cache: "no-store" }),
        ]);
        const [servicesData, homeData, ssData] = await Promise.all([
          servicesRes.json().catch(() => null),
          homeRes.json().catch(() => null),
          ssRes.json().catch(() => []),
        ]);
        if (!active) return;
        if (servicesRes.ok && servicesData) {
          setContent(mergeServicesContent(servicesData));
        }
        if (homeRes.ok && homeData) {
          setHomeContent(mergeHomeContent(homeData));
        }
        if (ssRes.ok && Array.isArray(ssData)) {
          setSuccessStories(
            ssData.length ? mapSuccessStoriesFromApi(ssData) : SUCCESS_STORIES_FALLBACK,
          );
        }
      } catch {
        // fallback
      }
    }
    load();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div>
      <ServicesHero hero={content.hero} />
      <Reveal delay={0.06}>
        <ServiceGrid data={content.grid} />
      </Reveal>
      <Reveal delay={0.1}>
        <SocialImpact data={content.socialImpact} />
      </Reveal>
      <Reveal delay={0.14}>
        <ConfidentialityCharter data={content.confidentiality} />
      </Reveal>
      <Reveal delay={0.18}>
        <BlissCircle data={homeContent.blissCircle} />
      </Reveal>
      <Reveal delay={0.22}>
        <SuccessStories stories={successStories} />
      </Reveal>
    </div>
  );
};

export default ServicesPage;
