import { useState } from "react";
import { Button } from "@/components/ui/button";
import logoBanner from "@/assets/logo-banner.png";
import { Menu, X } from "lucide-react";
const navItems = [{
  label: "Mission",
  href: "#mission"
}, {
  label: "Leadership",
  href: "#leadership"
}, {
  label: "Podcast",
  href: "#podcast"
}, {
  label: "Services",
  href: "#services"
}, {
  label: "Get Involved",
  href: "#join"
}];
export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  return <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border shadow-sm bg-primary">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <img src={logoBanner} alt="Community & Unity" className="h-12 w-auto" />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map(item => <a key={item.label} href={item.href} className="text-primary-foreground hover:text-accent transition-colors font-medium">
                {item.label}
              </a>)}
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && <div className="md:hidden py-4 space-y-3 border-t border-border">
            {navItems.map(item => <a key={item.label} href={item.href} className="block py-2 text-primary-foreground hover:text-accent transition-colors font-medium" onClick={() => setIsOpen(false)}>
                {item.label}
              </a>)}
          </div>}
      </div>
    </nav>;
};
