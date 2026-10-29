
export const CallToAction = () => {
  return (
    <section className="py-24 bg-gradient-hero relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 right-10 w-64 h-64 bg-white rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-white rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-12 animate-fade-in">
          {/* Main CTA */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-6xl font-bold text-white">
              Join the Movement
            </h2>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Learn. Teach. Build. Together.
            </p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Be part of a global community that believes in the power of shared knowledge 
              and collective action to create lasting change.
            </p>
          </div>

          {/* Contact: no sign-up form or bank details until real ones are supplied */}
          <p className="text-white/80 text-lg">
            Contact details for volunteering and partnerships are coming soon.
          </p>

          {/* Footer */}
          <div className="pt-16 space-y-6 border-t border-white/20">
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-white/80">
              <a 
                href="https://ourcommunityinunity.org" 
                className="hover:text-white transition-colors font-semibold"
                target="_blank"
                rel="noopener noreferrer"
              >
                ourcommunityinunity.org
              </a>
              
</div>
            <p className="text-white/60 text-sm">
              Community & Unity | NPC Reg No: 2024/812217/08
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
