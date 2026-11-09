import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

const navLinks = [
  { label: "Aether", href: "#gallery" },
  { label: "体验", href: "#sensory" },
  { label: "小元", href: "#system" },
  { label: "关于", href: "#about" },
  { label: "材质", href: "#configure" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-14">
          <a href="/" className="flex items-center">
            <img
              src={logo}
              alt="SORGEN"
              width={1382}
              height={414}
              className={`h-5 w-auto max-w-[120px] object-contain transition-[filter] duration-300 ${
                isScrolled ? "" : "brightness-0 invert"
              }`}
            />
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.href)}
                className={`text-sm transition-colors ${
                  isScrolled
                    ? "text-muted-foreground hover:text-foreground"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Button variant="hero" size="sm" onClick={() => scrollToSection("#contact")}>
              预约体验
            </Button>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <button
              className={`p-2 ${isScrolled ? "text-foreground" : "text-white"}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="菜单"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50 bg-background/95 backdrop-blur-xl">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="px-4 py-3 text-left text-foreground hover:bg-card rounded-lg transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-2 px-4">
                <Button
                  variant="hero"
                  size="sm"
                  className="w-full"
                  onClick={() => scrollToSection("#contact")}
                >
                  预约体验
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
