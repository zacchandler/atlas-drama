import ScrollProvider from "@/components/ScrollProvider";
import HeroSection from "@/components/HeroSection";
import PartnersSection from "@/components/sections/PartnersSection";
import ManifestoSection from "@/components/sections/ManifestoSection";
import AboutSection from "@/components/sections/AboutSection";
import StrengthsSection from "@/components/sections/StrengthsSection";
import SoulsMarquee from "@/components/sections/SoulsMarquee";
import VideoBanner from "@/components/sections/VideoBanner";
import SaigonSoulSection from "@/components/sections/SaigonSoulSection";
import TilesSection from "@/components/sections/TilesSection";
import TeamSection from "@/components/sections/TeamSection";
import FooterContact from "@/components/sections/FooterContact";

export default function Home() {
  return (
    <ScrollProvider>
      <div id="home">
          <HeroSection />
          <PartnersSection />
          <ManifestoSection />
          <AboutSection />
          <StrengthsSection />
          <SoulsMarquee />
          <VideoBanner />
          <SaigonSoulSection />
          <div style={{ margin: "145px 0 0" }}>
            <TilesSection />
          </div>
          <TeamSection />
          <FooterContact />
      </div>
    </ScrollProvider>
  );
}
