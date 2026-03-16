"use client";
import React from "react";
import AboutHero from "../components/about_components/AboutHero";
import Philosophy from "../components/about_components/Philosophy";
import DiscretionSection from "../components/about_components/DirectionSection";
import CallToAppointment from "../components/about_components/CallToAppointment";
import ProcessTimeline from "../components/about_components/ProcessTimeline";

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
