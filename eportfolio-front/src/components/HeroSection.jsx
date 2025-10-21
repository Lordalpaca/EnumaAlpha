import { ArrowDown } from "lucide-react";

export const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4"
    >
      <div className="container max-w-4xl mx-auto text-center z-10">
        
        {/* logo */}
        <div className="overflow-hidden ">
          <img src="/logo-fuschia.png" alt="Logo" />
        </div>

        <div className="space-y-7 -mt-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            <span className="opacity-0 animate-fade-in">Hi, I'm </span>
            <span className="text-primary opacity-0 animate-fade-in-delay-1">
              Alpha
            </span>
            <span className="text-gradient ml-2 opacity-0 animate-fade-in-delay-2">
              Sinworn
            </span>
          </h1>
          <p className="text-lg md:text text-muted-foreground max-2-2xl mx-auto opacity-0 animate-fade-in-delay-3">
            EnumaAlpha, comes from two words: “Enum” and “Alpha”. “Enum” refers
            to the enumeration class in JavaScript that compiles constants —
            much like how I compile my creations, myths, and history here. It
            also draws inspiration from Enuma Elish, the ancient Babylonian myth
            of the cosmos birth. And “Alpha” is my name. This is where my story
            begins — the merging of engineering, art and changemaking. *mic
            drop*
          </p>

          <div className="opacity-0 animate-fade-in-delay-4">
            <a href="#project" className="cosmic-button">
              View My Work
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center nimate-bounce">
      <span className="text-sm text-muted-foreground mb-2"> Scroll </span>
      <ArrowDown className="h-5 w-5 text-primary"/>
      </div>
    </section>
  );
};