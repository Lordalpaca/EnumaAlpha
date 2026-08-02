import { Github, Linkedin, Instagram, Briefcase, Download } from "lucide-react";

export function Footer() {
  return (
    <footer id="contact" className="py-16 px-4 border-t border-border">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Have a project in mind or just want to connect? Feel free to reach out!
          </p>
          <a
            href="/Alpha_Sinworn_CV.pdf"
            download="Alpha_Sinworn_CV.pdf"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300"
          >
            <Download className="h-4 w-4" />
            Download CV (PDF)
          </a>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6 mb-12">
          <a
            href="https://github.com/Lordalpaca"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-card hover:bg-primary/10 hover:text-primary transition-colors"
            aria-label="GitHub"
          >
            <Github className="h-6 w-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/alpha-sinworn"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-card hover:bg-primary/10 hover:text-primary transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-6 w-6" />
          </a>
          <a
            href="https://www.instagram.com/enuma_alpha/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-card hover:bg-primary/10 hover:text-primary transition-colors"
            aria-label="Instagram — personal (@enuma_alpha)"
            title="@enuma_alpha"
          >
            <Instagram className="h-6 w-6" />
          </a>
          <a
            href="https://www.instagram.com/a.fun.company/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-card hover:bg-primary/10 hover:text-primary transition-colors"
            aria-label="Instagram — a fun company (@a.fun.company)"
            title="@a.fun.company"
          >
            <Briefcase className="h-6 w-6" />
          </a>
        </div>

        {/* Handles */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground mb-12">
          <a
            href="https://www.instagram.com/a.fun.company/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            @a.fun.company <span className="opacity-60">— studio</span>
          </a>
          <a
            href="https://www.instagram.com/enuma_alpha/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            @enuma_alpha <span className="opacity-60">— personal</span>
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} Alpha Sinworn. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
