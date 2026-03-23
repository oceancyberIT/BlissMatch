 'use client';

import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import ServiceQuestions from "../components/ServiceQuestions";
import OurStory from "../components/OurStory";
import SuccessStories from "../components/SuccessStories";
import WhyChooseUs from "../components/WhyChooseUs";
import LoveConnectionSection from "../components/Love";
import BlissCircle from "../components/BlissCircle";
import { HomeContent } from "@/components/admin/home-editor/types";
import { INITIAL_CONTENT } from "@/components/admin/home-editor/constants";

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
          setHomeContent(data);
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
      <Hero />
      <OurStory data={homeContent.ourStory} />
      <ServiceQuestions data={homeContent.servicesOverview} />
      <LoveConnectionSection data={homeContent.loveConnection} />
      <BlissCircle data={homeContent.blissCircle} />
      <WhyChooseUs data={homeContent.whyChooseUs} />
      <SuccessStories />
    </main>
  );
};

export default Home;
