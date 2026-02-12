import { Link } from "react-router-dom";

export function ProjectCard({ project }) {
  return (
    <Link to={`/projects/${project.slug}`} className="group">
      <div className="gradient-border p-1 card-hover rounded-xl overflow-hidden">
        {/* Thumbnail */}
        <div className="aspect-video overflow-hidden rounded-t-lg">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Content */}
        <div className="p-4 bg-card">
          <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
