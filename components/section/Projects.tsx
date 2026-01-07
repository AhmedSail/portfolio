import Image from "next/image";
import { ExternalLink, Github, Folder, Eye, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

interface Project {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  liveUrl: string | null;
  githubUrl: string | null;
  tags: string | null;
  gallery: string | null;
  featured: boolean;
}

export const Projects = ({ projects }: { projects: Project[] }) => {
  return (
    <section id="projects" className="py-24 relative">
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 mt-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4 backdrop-blur-md">
            <Folder className="w-4 h-4 text-blue-500" />
            <span className="font-mono text-xs font-bold text-blue-500 uppercase tracking-widest">
              Featured Work
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
            Things I've{" "}
            <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-blue-600 dark:to-white">
              Built
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            A selection of projects that showcase my skills in building modern,
            scalable web applications.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => {
            const tech = project.tags
              ? project.tags.split(",").map((t) => t.trim())
              : [];

            return (
              <Card
                key={project.id}
                className="group relative bg-card/60 dark:bg-card/40 border-black/5 dark:border-white/5 hover:border-blue-500/30 transition-all duration-700 overflow-hidden backdrop-blur-xl rounded-[2.5rem] shadow-xl hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Project Image */}
                <div className="relative overflow-hidden aspect-video">
                  <Image
                    src={
                      project.imageUrl ||
                      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop"
                    }
                    alt={project.title}
                    width={600}
                    height={400}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  {/* Overlay Links */}
                  <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                    <Link
                      href={`/view/projects/${project.id}`}
                      className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white text-black hover:bg-blue-600 hover:text-white transition-all shadow-xl"
                      title="View Details"
                    >
                      <Eye className="w-5 h-5" />
                    </Link>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white text-black hover:bg-blue-500 hover:text-white transition-all shadow-xl"
                        title="GitHub"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 flex items-center justify-center rounded-2xl bg-blue-600 text-white hover:bg-white hover:text-black transition-all shadow-xl"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>

                  {project.featured && (
                    <div className="absolute top-6 left-6">
                      <Badge className="bg-blue-600 text-white border-0 px-4 py-1.5 rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-lg shadow-blue-500/30">
                        Featured
                      </Badge>
                    </div>
                  )}
                </div>

                <CardContent className="p-8 flex-1 flex flex-col">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 shadow-sm"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-black mb-3 tracking-tight group-hover:text-blue-500 transition-colors">
                    <Link href={`/view/projects/${project.id}`}>
                      {project.title}
                    </Link>
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 font-medium opacity-80 mb-6">
                    {project.description}
                  </p>

                  <div className="mt-auto pt-4">
                    <Link
                      href={`/view/projects/${project.id}`}
                      className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 hover:text-blue-500 transition-colors group/link"
                    >
                      View Details
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
