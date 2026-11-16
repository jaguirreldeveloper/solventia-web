import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import PlansSection from '../components/PlansSection';
import HowItWorks from '../components/HowItWorks';
import FAQSection from '../components/FAQSection';
import ContactSection from '../components/ContactSection';

export default function HomePage({ setView, selectedPlan, setSelectedPlan }) {
  return (
    <main>
      <Hero setView={setView} setSelectedPlan={setSelectedPlan} />
      <Features />
      <PlansSection setView={setView} setSelectedPlan={setSelectedPlan} />
      <HowItWorks setView={setView} />
      <FAQSection />
      <ContactSection />
    </main>
  );
}
