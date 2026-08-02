import { Cpu, Palette, Heart, Download } from "lucide-react";

function AboutSection() {
  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          About <span className="text-primary"> Me </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">Where Engineering Meets Art & Impact</h3>
            <p className="text-muted-foreground">
              I'm a Creative technologist with a passion for creating things that matter. I believe the best solutions come from blending technical precision with creative expression.
            </p>
            <p className="text-muted-foreground">
              My projects often start as jokes, but they evolve into meaningful work that pushes boundaries and challenges conventions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <a href="#projects" className="cosmic-button">View My Work</a>
              <a
                href="/Alpha_Sinworn_CV.pdf"
                download="Alpha_Sinworn_CV.pdf"
                className="inline-flex items-center justify-center gap-2 px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300"
              >
                <Download className="h-4 w-4" />
                Download CV
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">

            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Cpu className="h-6 w-6 text-primary"/>
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">Engineering</h4>
                  <p className="text-muted-foreground">Circuit design, PCB development, Arduino, Fusion360, Altium, and hands-on prototyping.</p>
                </div>
              </div>
            </div>

            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Palette className="h-6 w-6 text-primary"/>
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">Art & Design</h4>
                  <p className="text-muted-foreground">Adobe Illustrator, Photoshop, product design, 3D printing, and laser cutting.</p>
                </div>
              </div>
            </div>

            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Heart className="h-6 w-6 text-primary"/>
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">Changemaking</h4>
                  <p className="text-muted-foreground">Building solutions that improve lives — from Engineering Projects in Community Services to Intergen Harmony, a policy initiative bridging generations to promote mental health.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
export default AboutSection;