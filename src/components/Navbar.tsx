import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ShoppingBag, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import logo from "@/assets/logo.png";

const navLinks = [
  { label: "解决方案", href: "#solutions" },
  { label: "技术", href: "#technology" },
  { label: "适用人群", href: "#audience" },
  { label: "联系我们", href: "#contact" },
];

interface NavbarProps {
  cartItemCount?: number;
  onCartClick?: () => void;
}

export function Navbar({ cartItemCount = 0, onCartClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

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

  const handleAuthClick = () => {
    if (user) {
      navigate("/user");
    } else {
      navigate("/auth");
    }
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
          {/* Logo */}
          <a href="/" className="flex items-center">
            <img src={logo} alt="Vitality" className="h-9 w-auto" />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.href)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA & Cart */}
          <div className="hidden md:flex items-center gap-4">
            {onCartClick && (
              <button
                onClick={onCartClick}
                className="relative p-2 hover:bg-muted/50 rounded-full transition-colors"
              >
                <ShoppingBag className="w-5 h-5 text-foreground" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-medium">
                    {cartItemCount}
                  </span>
                )}
              </button>
            )}
            <Button 
              variant="hero" 
              size="sm"
              onClick={handleAuthClick}
              className="flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              {user ? "个人中心" : "登录"}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            {onCartClick && (
              <button
                onClick={onCartClick}
                className="relative p-2 hover:bg-muted/50 rounded-full transition-colors"
              >
                <ShoppingBag className="w-5 h-5 text-foreground" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-medium">
                    {cartItemCount}
                  </span>
                )}
              </button>
            )}
            <button
              className="p-2 text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50">
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
                  className="w-full flex items-center justify-center gap-2"
                  onClick={handleAuthClick}
                >
                  <User className="w-4 h-4" />
                  {user ? "个人中心" : "登录"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
