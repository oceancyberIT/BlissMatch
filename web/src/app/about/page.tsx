"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AboutHero from "../../components/about-hero";
import Philosophy from "../../components/Philosophy";
import DiscretionSection from "../../components/DirectionSection";
import CallToAppointment from "../../components/CallToAppointment";
import ProcessTimeline from "../../components/ProcessTimeline";
import { AboutContent } from "@/components/admin/about-editor/types";
import { INITIAL_ABOUT_CONTENT } from "@/components/admin/about-editor/constants";
import FoundersSection from "@/components/founders";

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

const About = () => {
  const [aboutContent, setAboutContent] = useState<AboutContent>(INITIAL_ABOUT_CONTENT);

  useEffect(() => {
    let active = true;
    async function loadAbout() {
      try {
        const res = await fetch('/api/admin/about');
        const data = await res.json().catch(() => null);
        if (!active) return;
        if (res.ok && data) {
          setAboutContent(data);
        }
      } catch {
        // Keep fallback content
      }
    }
    loadAbout();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="">
      <Reveal>
        <AboutHero data={aboutContent.hero} />
      </Reveal>
      <Reveal delay={0.06}>
        <Philosophy data={aboutContent.philosophy} />
      </Reveal>
      <Reveal delay={0.1}>
        <FoundersSection data={aboutContent.hero} />
      </Reveal>
      {/* <Reveal delay={0.14}> */}
        <ProcessTimeline data={aboutContent.process} />
      {/* </Reveal> */}
      <Reveal delay={0.18}>
        <DiscretionSection data={aboutContent.discretion} />
      </Reveal>
      <Reveal delay={0.22}>
        <CallToAppointment data={aboutContent.cta} />
      </Reveal>
    </div>
  );
};

export default About;
