"use client";
import React from "react";
import ServicesHero from "../../components/ServiceHero";
import ServiceGrid from "../../components/ServiceGrid";
import SuccessStories from "../../components/SuccessStories";
import ConfidentialityCharter from "../../components/ConfiDentialityCharter";
import SocialImpact from "../../components/SocialImpact";

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
