import { useParams, Link, Navigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { ArrowLeft } from "lucide-react";
import { projects, getProjectBySlug } from "../content/projects";
import { Navbar } from "../components/Navbar";
import { ThemeToggle } from "../components/ThemeToggle";
import { StarBackground } from "../components/StarBackground";

function ProjectPage() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  // Redirect to 404 if project not found
  if (!project) {
    return <Navigate to="/404" replace />;
  }

  // Other projects for sidebar (exclude current)
  const otherProjects = projects.filter((p) => p.slug !== slug);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ThemeToggle />
      <StarBackground />
      <Navbar />

      <main className="pt-24 pb-16 px-4 relative z-10">
        <div className="container mx-auto max-w-7xl">
          {/* Back button */}
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <article className="flex-1 min-w-0">
              {/* Header */}
              <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  {project.title}
                </h1>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-sm px-3 py-1 rounded-full bg-primary/10 text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-muted-foreground">{project.description}</p>
              </header>

              {/* Featured Image */}
              <div className="aspect-video rounded-xl overflow-hidden mb-8">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Markdown Content */}
              <div className="prose prose-invert prose-primary max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    img: ({ node, ...props }) => (
                      <img
                        {...props}
                        className="rounded-xl my-8 w-full"
                        loading="lazy"
                      />
                    ),
                    video: ({ node, ...props }) => (
                      <video
                        {...props}
                        className="rounded-xl my-8 w-full max-h-[70vh] object-contain"
                        controls
                        playsInline
                      />
                    ),
                    iframe: ({ node, ...props }) => (
                      <iframe
                        {...props}
                        className="rounded-xl my-8 mx-auto block w-full max-w-[400px] h-[600px] border-0"
                        loading="lazy"
                        allowFullScreen
                      />
                    ),
                    a: ({ node, ...props }) => (
                      <a
                        {...props}
                        className="text-primary hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      />
                    ),
                    h2: ({ node, ...props }) => (
                      <h2
                        {...props}
                        className="text-2xl font-bold mt-12 mb-4 text-foreground"
                      />
                    ),
                    h3: ({ node, ...props }) => (
                      <h3
                        {...props}
                        className="text-xl font-semibold mt-8 mb-3 text-foreground"
                      />
                    ),
                    p: ({ node, ...props }) => (
                      <p {...props} className="text-muted-foreground mb-4 leading-relaxed" />
                    ),
                    ul: ({ node, ...props }) => (
                      <ul {...props} className="list-disc list-inside space-y-2 text-muted-foreground mb-4" />
                    ),
                    li: ({ node, ...props }) => (
                      <li {...props} className="text-muted-foreground" />
                    ),
                  }}
                >
                  {project.content}
                </ReactMarkdown>
              </div>
            </article>

            {/* Sidebar */}
            {otherProjects.length > 0 && (
              <aside className="lg:w-72 shrink-0">
                <div className="sticky top-24">
                  <h3 className="font-semibold text-lg mb-4">Other Projects</h3>
                  <div className="space-y-4">
                    {otherProjects.map((p) => (
                      <Link
                        key={p.slug}
                        to={`/projects/${p.slug}`}
                        className="block group"
                      >
                        <div className="gradient-border p-1 rounded-lg overflow-hidden card-hover">
                          <div className="aspect-video overflow-hidden rounded-t-md">
                            <img
                              src={p.thumbnail}
                              alt={p.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="p-3 bg-card">
                            <h4 className="font-medium text-sm group-hover:text-primary transition-colors">
                              {p.title}
                            </h4>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </aside>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProjectPage;
