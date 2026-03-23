"use client";
import React, { useEffect, useState } from "react";
import AboutHero from "../../components/about-hero";
import Philosophy from "../../components/Philosophy";
import DiscretionSection from "../../components/DirectionSection";
import CallToAppointment from "../../components/CallToAppointment";
import ProcessTimeline from "../../components/ProcessTimeline";
import { AboutContent } from "@/components/admin/about-editor/types";
import { INITIAL_ABOUT_CONTENT } from "@/components/admin/about-editor/constants";

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
      <AboutHero data={aboutContent.hero} />
      <Philosophy data={aboutContent.philosophy} />
      <DiscretionSection data={aboutContent.discretion} />
      <ProcessTimeline data={aboutContent.process} />
      <CallToAppointment data={aboutContent.cta} />
    </div>
  );
};

export default About;
