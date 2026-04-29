"use client";

import Navbar from "@/layout/navbar";
import Hero from "@/sections/landing/Hero";
import Partners from "@/sections/landing/Partners";
import Features from "@/sections/landing/Features";
import Ecosystem from "@/sections/landing/Ecosystem";
import CTA from "@/sections/landing/CTA";
import Footer from "@/layout/footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <Hero />
      <Partners />
      <Features />
      {/* <Ecosystem /> */}
      <CTA />
      <Footer />
    </main>
  );
};

export default Index;
