import Navbar from "@/layout/navbar";
import Footer from "@/layout/footer";
import Hero from "@/sections/landing/Hero";
import Partnership from "@/sections/landing/Partnership";
import Features from "@/sections/landing/Features";
import Manual from "@/sections/landing/Manual";
import CTA from "@/sections/landing/CTA";

export default function Page() {
  return (
    <main className="min-h-screen bg-[#080b10] overflow-x-hidden">
      <Navbar />
      <Hero />
      <Partnership />
      <Features />
      <Manual />
      <CTA />
      <Footer />
    </main>
  );
}
