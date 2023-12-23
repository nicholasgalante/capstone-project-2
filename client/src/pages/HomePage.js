import React from "react";
import { Hero } from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import TestimonialSection from "../components/TestimonialSection";
import CallToAction from "../components/CallToAction";
import FAQSection from "../components/FAQSection";
import Footer from "../components/Footer";
import StatsSection from "../components/StatsSection";

function HomePage() {
  return (
    <div>
      <Hero />
      <AboutSection />
      <StatsSection />
      <TestimonialSection />
      {/* <FAQSection /> */}
      <CallToAction />
      <Footer/>
    </div>
  );
}

export { HomePage };