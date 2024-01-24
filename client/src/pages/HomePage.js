import React from "react";
import { Hero } from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import TestimonialSection from "../components/TestimonialSection";
import CallToAction from "../components/CallToAction";
import Footer from "../components/Footer";

function HomePage() {
  return (
    <div>
      <Hero />
      <AboutSection />
      <TestimonialSection />
      <CallToAction />
      <Footer/>
    </div>
  );
}

export { HomePage };