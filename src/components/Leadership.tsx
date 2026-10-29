import { Card, CardContent } from "@/components/ui/card";
import cameronPortrait from "@/assets/cameron-devries.jpg";
import { Users, UserCheck, Settings } from "lucide-react";
const leaders = [{
  name: "Cameron De Vries",
  role: "Director",
  icon: Users,
  image: cameronPortrait,
  description: "Leading the vision and strategic direction of Community & Unity, and host of Unspoken Truths podcast."
}];
export const Leadership = () => {
  return <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Section Header */}
          <div className="text-center space-y-4 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Leadership Team
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Meet the dedicated individuals driving our mission forward
            </p>
          </div>

          {/* Leadership Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {leaders.map((leader, index) => {
            const Icon = leader.icon;
            return <Card key={leader.name} className="border-2 hover:border-primary/40 transition-all hover:shadow-xl animate-slide-up overflow-hidden" style={{
              animationDelay: `${index * 0.1}s`
            }}>
                  <CardContent className="p-0">
                    {/* Image or Icon */}
                    {leader.image ? <div className="w-full h-64 overflow-hidden bg-gradient-hero">
                        <img src={leader.image} alt={leader.name} className="w-full h-full object-contain" />
                      </div> : <div className="w-full h-64 bg-gradient-hero flex items-center justify-center">
                        <Icon className="w-24 h-24 text-white/80" />
                      </div>}
                    
                    {/* Content */}
                    <div className="p-6 space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-bold text-foreground">
                            {leader.name}
                          </h3>
                        </div>
                        <p className="text-lg font-semibold text-primary">
                          {leader.role}
                        </p>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {leader.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>;
          })}
          </div>
        </div>
      </div>
    </section>;
};
