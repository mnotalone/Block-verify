import { useState, useEffect, useMemo, useRef } from "react";
import { Menu, X, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useScrollDirection } from "@/hooks/use-scroll-direction";

const NAV_LINKS = [
  { name: "Home", href: "/", isRoute: true },
  { name: "How It Works", href: "#how-it-works", isRoute: false },
  { name: "Features", href: "#features", isRoute: false },
  { name: "Security", href: "#security", isRoute: false },
  { name: "Pricing", href: "#pricing", isRoute: false },
  { name: "Testimonials", href: "#testimonials", isRoute: false },
  { name: "Issue Certificate", href: "/issue", isRoute: true },
];

const OVERLAY_HIDDEN_LINKS = new Set(["Home", "Security"]);

const Navbar = () => {
  const [overlayActive, setOverlayActive] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const sectionOffsetRef = useRef<number | null>(null);
  const navContainerRef = useRef<HTMLDivElement | null>(null);
  const scrollDirection = useScrollDirection({ threshold: 12 });
  const isScrollingDown = scrollDirection === "down";
  const fadeActions = isScrollingDown && overlayActive && !isMobileMenuOpen;

  useEffect(() => {
    const resolveSectionOffset = () => {
      const section = document.getElementById("how-it-works");
      if (section) {
        const { top } = section.getBoundingClientRect();
        sectionOffsetRef.current = top + window.scrollY;
      } else {
        sectionOffsetRef.current = null;
      }
    };

    resolveSectionOffset();
    window.addEventListener("resize", resolveSectionOffset);

    return () => window.removeEventListener("resize", resolveSectionOffset);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sectionOffset = sectionOffsetRef.current;
      if (sectionOffset === null) {
        setOverlayActive(window.scrollY > 20);
        return;
      }

      const navHeight = navContainerRef.current?.offsetHeight ?? 0;
      const activationPoint = sectionOffset - navHeight;
      setOverlayActive(window.scrollY >= activationPoint);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const visibleLinks = useMemo(() => {
    if (!overlayActive) return NAV_LINKS;
    return NAV_LINKS.filter((link) => !OVERLAY_HIDDEN_LINKS.has(link.name));
  }, [overlayActive]);

  return (
    <nav
      className={`fixed inset-x-0 z-50 flex justify-center transition-transform transition-colors duration-[220ms] ease-[cubic-bezier(0.33,1,0.68,1)] ${
        overlayActive ? "top-3" : "top-0"
      }`}
    >
      <div
        ref={navContainerRef}
        className={`w-full mx-auto transition-all duration-[220ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          overlayActive
            ? "max-w-5xl rounded-3xl border border-border/60 bg-background/80 backdrop-blur-xl shadow-lg px-6 py-3"
            : "max-w-7xl px-4 sm:px-6 lg:px-8"
        }`}
      >
        <div
          className={`flex items-center justify-between transition-all duration-[220ms] ${
            overlayActive ? "h-14" : "h-16 md:h-20"
          }`}
        >

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Shield className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
              <div className="absolute inset-0 bg-primary/20 blur-xl group-hover:bg-primary/40 transition-all" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {visibleLinks.map((link) => {
              const hash = link.href.startsWith("#") ? link.href : `#${link.href}`;
              const to = link.isRoute ? link.href : { pathname: "/", hash };

              return (
                <Link
                  key={link.name}
                  to={to}
                  className={`text-sm font-medium transition-colors relative group ${
                    overlayActive
                      ? "text-foreground hover:text-foreground/80"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                </Link>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div
            className={`hidden md:flex items-center gap-4 transition-opacity duration-[120ms] ${
              fadeActions ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            <Button
              asChild
              variant="ghost"
              className="text-foreground hover:text-primary border border-transparent rounded-xl transition-all duration-300 hover:border-primary hover:bg-transparent hover:rounded-tr-none"
            >
              <Link to="/login">Login</Link>
            </Button>

            <Button
              asChild
              className="bg-primary text-primary-foreground border border-transparent rounded-xl transition-all duration-300 hover:bg-primary/90 hover:border-primary hover:rounded-tl-none"
            >
              <Link to="/get-started">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border bg-card/95 backdrop-blur-md animate-fade-in">
            <div className="flex flex-col gap-4">
              {visibleLinks.map((link) => {
                const hash = link.href.startsWith("#") ? link.href : `#${link.href}`;
                const to = link.isRoute ? link.href : { pathname: "/", hash };

                return (
                  <Link
                    key={link.name}
                    to={to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors px-4 py-2"
                  >
                    {link.name}
                  </Link>
                );
              })}

              <div
                className={`flex flex-col gap-2 px-4 pt-4 border-t border-border transition-opacity duration-[120ms] ${
                  fadeActions ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
              >
                <Button asChild variant="ghost" className="w-full">
                  <Link to="/login">Login</Link>
                </Button>

                <Button asChild className="w-full bg-primary text-primary-foreground">
                  <Link to="/get-started">Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
