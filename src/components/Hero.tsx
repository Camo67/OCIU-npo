import { Button } from "@/components/ui/button";
import logoSquare from "@/assets/logo-square.png";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-screen pt-24 pb-12 flex items-center justify-center bg-gradient-hero overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="max-w-5xl mx-auto text-center space-y-8 animate-fade-in">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center justify-center rounded-[2rem] bg-[hsl(var(--logo-background))] p-4 md:p-6 shadow-2xl shadow-black/25">
              <img 
                src={logoSquare} 
                alt="Community & Unity Logo" 
                className="w-64 h-64 md:w-80 md:h-80"
              />
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            Our Community in Unity (OCIU)
          </h1>

          {/* Motto */}
          <p className="text-2xl md:text-3xl text-white/90 font-semibold">
            Learn, Build, Earn
          </p>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto">
            Empowering communities to learn, build, and support community growth.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button size="lg" variant="growth" className="min-w-[200px]">
              Get Involved
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="energy" className="min-w-[200px]">
              Explore Our Work
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
};
