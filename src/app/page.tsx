import { Hero } from "@/components/sections/Hero";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { Services } from "@/components/sections/Services";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { Process } from "@/components/sections/Process";
import { TechStack } from "@/components/sections/TechStack";
import { WhyOrbitX } from "@/components/sections/WhyOrbitX";
import { Testimonials } from "@/components/sections/Testimonials";
import { ContactCTA } from "@/components/sections/ContactCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <LogoMarquee />
      <Services />
      <FeaturedWork />
      <Process />
      <TechStack />
      <WhyOrbitX />
      <Testimonials />
      <ContactCTA />
    </>
  );
}
