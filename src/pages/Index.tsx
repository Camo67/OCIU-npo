import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { MissionVision } from "@/components/MissionVision";
import { Leadership } from "@/components/Leadership";
import { Podcast } from "@/components/Podcast";
import { DigitalAgency } from "@/components/DigitalAgency";
import { CallToAction } from "@/components/CallToAction";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <div id="home">
          <Hero />
        </div>
        <div id="mission">
          <MissionVision />
        </div>
        <div id="leadership">
          <Leadership />
        </div>
        <div id="podcast">
          <Podcast />
        </div>
        <div id="services">
          <DigitalAgency />
        </div>
        <div id="join">
          <CallToAction />
        </div>
      </main>
    </div>
  );
};

export default Index;
