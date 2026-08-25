import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import AIEmployees from "@/components/landing/AIEmployees";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import Testimonials from "@/components/landing/Testimonials";
import WhyUs from "@/components/landing/WhyUs";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";
import PulseDivider from "@/components/landing/PulseDivider";

const Index = () => {
  return (
    <div className="min-h-screen bg-paper">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:btn-ink"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        {/* The thesis, the seven leaks it names, then the proof.
            The brand pulse rules the sections apart. */}
        <Hero />
        <PulseDivider />
        <AIEmployees />
        <PulseDivider />
        <Features />
        <PulseDivider />
        <HowItWorks />
        <PulseDivider />
        <Testimonials />
        <PulseDivider />
        <WhyUs />
        <PulseDivider />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
