import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import podcastCover from "@/assets/podcast-cover.jpg";
import { Mic2, ExternalLink } from "lucide-react";

export const Podcast = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Section Header */}
          <div className="text-center space-y-4 animate-fade-in">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-energy flex items-center justify-center">
                <Mic2 className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Unspoken Truths by Camo
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A bold podcast that explores real stories, hard conversations, and lived experiences shaping communities
            </p>
          </div>

          {/* Podcast Content */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Podcast Cover */}
            <div className="animate-slide-up">
              <Card className="overflow-hidden border-2 hover:border-accent/40 transition-all hover:shadow-2xl">
                <CardContent className="p-0">
                  <img 
                    src={podcastCover} 
                    alt="Unspoken Truths Podcast Cover"
                    className="w-full h-auto"
                  />
                </CardContent>
              </Card>
            </div>

            {/* Podcast Info & Link */}
            <div className="space-y-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-foreground">
                  Real Stories. Hard Conversations.
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Join Cameron De Vries as he dives deep into the unspoken truths that shape our communities. 
                  Each episode brings authentic voices, powerful stories, and the conversations we need to have.
                </p>
                <p className="text-muted-foreground">
                  Listen to Unspoken Truths by Camo on Spotify for real stories and hard conversations that matter.
                </p>
              </div>

              <Button variant="energy" size="lg" className="w-full" asChild>
                <a href="https://open.spotify.com/show/7cwfPZpCqL3L1T0gLsjkx0" target="_blank" rel="noopener noreferrer">
                  Listen on Spotify
                  <ExternalLink className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
