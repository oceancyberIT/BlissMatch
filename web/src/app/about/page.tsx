"use client";
import React from "react";
import AboutHero from "../../components/about-hero";
import Philosophy from "../../components/Philosophy";
import DiscretionSection from "../../components/DirectionSection";
import CallToAppointment from "../../components/CallToAppointment";
import ProcessTimeline from "../../components/ProcessTimeline";

const About = () => {
  return (
    <div className="">
      <AboutHero />
      <Philosophy />
      <DiscretionSection />
      <ProcessTimeline />
      <CallToAppointment />
    </div>
  );
};

export default About;
