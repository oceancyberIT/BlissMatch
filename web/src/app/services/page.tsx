"use client";
import React, { useEffect, useState } from "react";
import ServicesHero from "../../components/ServiceHero";
import ServiceGrid from "../../components/ServiceGrid";
import ConfidentialityCharter from "../../components/ConfiDentialityCharter";
import SocialImpact from "../../components/SocialImpact";
import { ServicesContent } from "@/components/admin/services-editor/types";
import { INITIAL_SERVICES_CONTENT } from "@/components/admin/services-editor/constants";
import SuccessStories from "@/components/SuccessStories";

function mergeServicesContent(raw: unknown): ServicesContent {
  if (!raw || typeof raw !== "object") return INITIAL_SERVICES_CONTENT;
  const d = raw as Partial<ServicesContent>;
  return {
    ...INITIAL_SERVICES_CONTENT,
    ...d,
    grid: {
      ...INITIAL_SERVICES_CONTENT.grid,
      ...d.grid,
      cards:
        Array.isArray(d.grid?.cards) && d.grid!.cards!.length > 0
          ? d.grid!.cards!
          : INITIAL_SERVICES_CONTENT.grid.cards,
      banner: {
        ...INITIAL_SERVICES_CONTENT.grid.banner,
        ...d.grid?.banner,
      },
    },
    socialImpact: {
      ...INITIAL_SERVICES_CONTENT.socialImpact,
      ...d.socialImpact,
    },
    confidentiality: {
      ...INITIAL_SERVICES_CONTENT.confidentiality,
      ...d.confidentiality,
      bullets:
        Array.isArray(d.confidentiality?.bullets) &&
        d.confidentiality!.bullets!.length > 0
          ? d.confidentiality!.bullets!
          : INITIAL_SERVICES_CONTENT.confidentiality.bullets,
    },
  };
}

const ServicesPage = () => {
  const [content, setContent] = useState<ServicesContent>(INITIAL_SERVICES_CONTENT);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const res = await fetch("/api/admin/services");
        const data = await res.json().catch(() => null);
        if (!active) return;
        if (res.ok && data) {
          setContent(mergeServicesContent(data));
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
      <ServicesHero />
      <ServiceGrid data={content.grid} />
      <SocialImpact data={content.socialImpact} />
      <ConfidentialityCharter data={content.confidentiality} />
      <SuccessStories />
    </div>
  );
};

export default ServicesPage;
