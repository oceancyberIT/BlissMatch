import React from "react";
import Hero from "./components/home_components/Hero";
import ServiceQuestions from "./components/home_components/ServiceQuestions";
import OurStory from "./components/home_components/OurStory";
import SuccessStories from "./components/home_components/SuccessStories";
import WhyChooseUs from "./components/home_components/WhyChooseUs";
import LoveConnectionSection from "./components/home_components/Love";
import BlissCircle from "./components/home_components/BlissCircle";

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
