import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Palette, Video, Zap, ExternalLink } from "lucide-react";

const projects = [
  {
    name: "Beloveful.com",
    description: "Web design & creative studio bringing visions to life",
    icon: Palette,
    status: "Live",
    link: "https://beloveful.com",
  },
  {
    name: "MediaHause.com",
    description: "Media production and storytelling services",
    icon: Video,
    status: "Coming Soon",
    link: null,
  },
];

const services = [
  "Website Design & Development",
  "Brand Identity & Strategy",
  "Automation & Workflow Solutions",
  "Digital Storytelling & Content",
  "Community Platform Development",
  "Creative Consulting",
];

export const DigitalAgency = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Section Header */}
          <div className="text-center space-y-4 animate-fade-in">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-growth flex items-center justify-center">
                <Zap className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Digital Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The creative and digital powerhouse of Community & Unity
            </p>
          </div>

          {/* Featured Projects */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-center text-foreground">
              Featured Projects
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, index) => {
                const Icon = project.icon;
                return (
                  <Card 
                    key={project.name}
                    className="border-2 hover:border-secondary/40 transition-all hover:shadow-xl animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-gradient-growth flex items-center justify-center">
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-xl">{project.name}</CardTitle>
                          </div>
                        </div>
                        <Badge variant={project.status === "Live" ? "secondary" : "outline"}>
                          {project.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground">
                        {project.description}
                      </p>
                      {project.link && (
                        <Button variant="outline" className="w-full" asChild>
                          <a href={project.link} target="_blank" rel="noopener noreferrer">
                            Visit Website
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Services Grid */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-center text-foreground">
              Our Services
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((service, index) => (
                <Card 
                  key={service}
                  className="border-2 hover:border-primary/20 transition-all hover:shadow-lg animate-slide-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <CardContent className="p-6">
                    <p className="font-semibold text-foreground text-center">
                      {service}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
