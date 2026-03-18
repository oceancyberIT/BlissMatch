import React from "react";
import Hero from "../components/Hero";
import ServiceQuestions from "../components/ServiceQuestions";
import OurStory from "../components/OurStory";
import SuccessStories from "../components/SuccessStories";
import WhyChooseUs from "../components/WhyChooseUs";
import LoveConnectionSection from "../components/Love";
import BlissCircle from "../components/BlissCircle";

const Home = () => {
  return (
    <main className="flex flex-col w-full">
      <Hero />
      <OurStory />
      <ServiceQuestions />
      <LoveConnectionSection />
      <BlissCircle />
      <WhyChooseUs />
      <SuccessStories />
    </main>
  );
};

export default Home;
