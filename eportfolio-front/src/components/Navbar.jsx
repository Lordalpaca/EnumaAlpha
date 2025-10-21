import { useEffect, useState } from "react";

import { cn } from "../lib/utils";
import { Menu, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";


const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  // Projects will be handled as dropdown
  { name: "Contact", href: "#contact" },
];

const projectCategories = [
  { name: "Arts", href: "#projects-arts" },
  { name: "Engineering", href: "#projects-engineering" },
  { name: "Activism", href: "#projects-activism" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <nav
      className={cn(
        "fixed w-full z-40 transition-all duration-300",
        isScrolled ? "py-3 bg-background/80 backdrop-blur-md shadow-xs" : "py-5"
      )}
    >
      <div className="container flex items-center justify-between mx-auto px-4 sm:px-6 lg:px-8">
        <a
          className="text-xl font-bold text-primary flex items-center"
          href="#hero"
        >
          <span className="relative z-10">
            <span className="text-glow text-foreground">Enuma</span>{" "}
            Alpha
          </span>
        </a>

        {/* desktop navbar */}
        <div className="hidden md:flex space-x-8">
          {navItems.map((item, key) => {
            if (item.name === "Contact") {
              // Insert dropdown before Contact
              return (
                <>
                  <DropdownMenu key="projects">
                    <DropdownMenuTrigger asChild>
                      <button className="text-foreground/80 hover:text-primary transition-colors duration-300">
                        Projects
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      {projectCategories.map((cat) => (
                        <DropdownMenuItem asChild key={cat.name}>
                          <a href={cat.href}>{cat.name}</a>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <a
                    key={key}
                    href={item.href}
                    className="text-foreground/80 hover:text-primary transition-colors duration-300"
                  >
                    {item.name}
                  </a>
                </>
              );
            }
            return (
              <a
                key={key}
                href={item.href}
                className="text-foreground/80 hover:text-primary transition-colors duration-300"
              >
                {item.name}
              </a>
            );
          })}
        </div>

        {/* mobile navbar */}

        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="md:hidden p-2 text-foreground z-50"
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div
          className={cn(
            "fixed inset-0 bg-background/95 backdrop-blur-md z-40 flex flex-col items-center justify-center",
            "transition-all duration-300 md:hidden",
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
        >
          <div className="flex flex-col space-y-8">
            {navItems.map((item, key) => {
              if (item.name === "Contact") {
                return (
                  <>
                    <DropdownMenu key="projects-mobile">
                      <DropdownMenuTrigger asChild>
                        <button className="text-foreground/80 hover:text-primary transition-colors duration-300 px-2 py-1 rounded-md">
                          Projects
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        {projectCategories.map((cat) => (
                          <DropdownMenuItem asChild key={cat.name} onSelect={() => setIsMenuOpen(false)}>
                            <a href={cat.href}>{cat.name}</a>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <a
                      key={key}
                      href={item.href}
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                  </>
                );
              }
              return (
                <a
                  key={key}
                  href={item.href}
                  className="text-foreground/80 hover:text-primary transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}