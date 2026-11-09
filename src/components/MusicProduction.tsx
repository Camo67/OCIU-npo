import { Music, Users, GraduationCap } from "lucide-react";

export const MusicProduction = () => {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Section Header */}
          <div className="text-center space-y-4 animate-fade-in">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-energy flex items-center justify-center">
                <Music className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Music Production, Taught by the Community
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Learn to make music from people who make it.
            </p>
          </div>

          {/* Body */}
          <div className="space-y-8 text-center animate-slide-up">
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Our Community in Unity teaches young people music production, from first beat
              to finished track, led by Ghisaam with sound engineer Cameron De Vries.
            </p>
            <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto text-left">
              <div className="flex items-start gap-3">
                <GraduationCap className="w-6 h-6 text-accent shrink-0 mt-1" />
                <p className="text-muted-foreground">
                  Each one teach one: when you finish, you help teach the next group.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Users className="w-6 h-6 text-accent shrink-0 mt-1" />
                <p className="text-muted-foreground">
                  Joining details are coming soon.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
