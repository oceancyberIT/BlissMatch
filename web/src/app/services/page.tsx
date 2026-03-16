"use client";
import React from "react";
import ServicesHero from "../components/service_components/ServiceHero";
import ServiceGrid from "../components/service_components/ServiceGrid";
import SuccessStories from "../components/home_components/SuccessStories";
import ConfidentialityCharter from "../components/service_components/ConfiDentialityCharter";
import SocialImpact from "../components/service_components/SocialImpact";

const page = () => {
  return (
    <div>
      <ServicesHero />
      <ServiceGrid />
      <SocialImpact />
      <ConfidentialityCharter />
      <SuccessStories />
    </div>
  );
};

export default page;
