"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Calendar,
  Tag,
  Loader2,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function ProjectDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`/api/projects/${params.id}`);
        const data = await response.json();
        if (data) {
          setProject(data);
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProject();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
        <h1 className="text-4xl font-black mb-4">Project Not Found</h1>
        <Button onClick={() => router.push("/view")} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Button>
      </div>
    );
  }

  const isVideo = (url: string) => {
    return url?.match(/\.(mp4|webm|ogg)$/i) || url?.includes("/video/");
  };

  const gallery = project.gallery ? JSON.parse(project.gallery) : [];

  // Gallery in DB is just an array of strings (URLs)
  const galleryImages = gallery.filter((url: string) => !isVideo(url));
  const galleryVideos = gallery.filter((url: string) => isVideo(url));

  const allImages = [project.imageUrl, ...galleryImages].filter(Boolean);

  const tags = project.tags
    ? project.tags.split(",").map((t: string) => t.trim())
    : [];

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setSelectedImage(allImages[index]);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const newIndex = (currentImageIndex + 1) % allImages.length;
    setCurrentImageIndex(newIndex);
    setSelectedImage(allImages[newIndex]);
  };

  const prevImage = () => {
    const newIndex =
      (currentImageIndex - 1 + allImages.length) % allImages.length;
    setCurrentImageIndex(newIndex);
    setSelectedImage(allImages[newIndex]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-transparent to-background z-10" />
        <Image
          src={project.imageUrl || "/placeholder.jpg"}
          alt={project.title || "Project Image"}
          fill
          className="object-cover"
          priority
        />

        {/* Back Button */}
        <div className="absolute top-8 left-8 z-20">
          <Button
            onClick={() => router.push("/view")}
            variant="outline"
            className="gap-2 bg-background/80 backdrop-blur-md border-white/10 hover:bg-background/90"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 -mt-32 relative z-20 pb-20">
        <div className="max-w-6xl mx-auto">
          {/* Project Header */}
          <Card className="bg-card/95 backdrop-blur-xl border-white/10 rounded-[2.5rem] shadow-2xl mb-12">
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
                <div className="flex-1">
                  <h1 className="text-4xl md:text-6xl font-black mb-4 bg-clip-text text-transparent bg-linear-to-r from-blue-400 via-blue-500 to-purple-400">
                    {project.title}
                  </h1>

                  {/* Tags */}
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {tags.map((tag: string, index: number) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-full text-sm font-bold border border-blue-500/20 uppercase tracking-wider"
                        >
                          <Tag className="w-3 h-3 inline mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Date */}
                  <div className="flex items-center gap-2 text-muted-foreground mb-6">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {new Date(project.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  {project.liveUrl && (
                    <Button
                      asChild
                      size="lg"
                      className="gap-2 bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/20 rounded-2xl"
                    >
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-5 h-5" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="gap-2 border-white/10 rounded-2xl"
                    >
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="w-5 h-5" />
                        GitHub
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              {/* Description */}
              {project.description && (
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Gallery Section */}
          {allImages.length > 0 && (
            <div className="mb-12">
              <h2 className="text-3xl font-black mb-8 flex items-center gap-3">
                <span className="w-12 h-1.5 bg-blue-600 rounded-full" />
                Project Gallery
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allImages.map((imageUrl: string, index: number) => (
                  <Card
                    key={index}
                    className="group cursor-pointer overflow-hidden bg-card/40 border-white/5 hover:border-blue-500/30 transition-all duration-300 rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-blue-500/10"
                    onClick={() => openLightbox(index)}
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={imageUrl}
                        alt={`${project.title || "Project"} - Image ${
                          index + 1
                        }`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                        <ExternalLink className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Videos Section */}
          {galleryVideos.length > 0 && (
            <div>
              <h2 className="text-3xl font-black mb-8 flex items-center gap-3">
                <span className="w-12 h-1.5 bg-blue-600 rounded-full" />
                Project Videos
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {galleryVideos.map((videoUrl: string, index: number) => (
                  <Card
                    key={index}
                    className="overflow-hidden bg-card/40 border-white/5 rounded-3xl shadow-xl"
                  >
                    <div className="relative aspect-video">
                      <video
                        src={videoUrl}
                        controls
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/10 rounded-full w-12 h-12"
            onClick={closeLightbox}
          >
            <X className="w-6 h-6" />
          </Button>

          {allImages.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 text-white hover:bg-white/10 rounded-full w-12 h-12"
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
              >
                <ChevronLeft className="w-8 h-8" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 text-white hover:bg-white/10 rounded-full w-12 h-12"
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
              >
                <ChevronRight className="w-8 h-8" />
              </Button>
            </>
          )}

          <div
            className="relative max-w-7xl max-h-[90vh] w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt="Full size"
              fill
              className="object-contain"
            />
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm font-medium bg-black/50 px-4 py-2 rounded-full backdrop-blur-md">
            {currentImageIndex + 1} / {allImages.length}
          </div>
        </div>
      )}
    </div>
  );
}
