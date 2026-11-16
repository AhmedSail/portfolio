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
  TrendingUp,
  AlertCircle,
  Lightbulb,
  ShieldAlert,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useLanguage } from "@/lib/language-context";

export default function ProjectDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { language, dir } = useLanguage();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const projectId = String(params.id || "");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`/api/projects/${projectId}`);
        if (response.ok) {
          const data = await response.json();
          if (data && !data.error) {
            setProject(data);
          }
        }
      } catch (error) {
        console.error("Error fetching project from DB:", error);
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      fetchProject();
    }
  }, [projectId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
        <h1 className="text-3xl font-black mb-4">
          {language === "ar" ? "المشروع غير موجود" : "Project Not Found"}
        </h1>
        <Button onClick={() => router.push("/")} className="gap-2 rounded-2xl">
          <ArrowLeft className="w-4 h-4" />
          {language === "ar" ? "العودة للرئيسية" : "Back to Portfolio"}
        </Button>
      </div>
    );
  }

  const isVideo = (url: string) => {
    return url?.match(/\.(mp4|webm|ogg)$/i) || url?.includes("/video/");
  };

  let gallery: string[] = [];
  try {
    gallery = project.gallery ? JSON.parse(project.gallery) : [];
  } catch {
    gallery = [];
  }

  const galleryImages = gallery.filter((url: string) => !isVideo(url));
  const galleryVideos = gallery.filter((url: string) => isVideo(url));
  const allImages = [project.imageUrl, ...galleryImages].filter(Boolean);

  const tags = (project.tags || "")
    .replace(/PostegreSQL/gi, "PostgreSQL")
    .replace(/next jsc/gi, "Next.js")
    .replace(/MogoDB/gi, "MongoDB")
    .split(",")
    .map((t: string) => t.trim())
    .filter(Boolean);

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
    const newIndex = (currentImageIndex - 1 + allImages.length) % allImages.length;
    setCurrentImageIndex(newIndex);
    setSelectedImage(allImages[newIndex]);
  };

  // Parse structured information from description
  let mainDescription = project.description || "";
  let impactMetric: string | null = null;

  if (project.description && project.description.includes("|")) {
    const parts = project.description.split("|");
    mainDescription = parts[0].trim();
    impactMetric = parts[1].trim();
  }

  return (
    <div dir={dir} className="min-h-screen bg-background">
      {/* Hero Banner */}
      <div className="relative h-[48vh] min-h-[340px] overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-background z-10" />
        <Image
          src={project.imageUrl || "/placeholder.jpg"}
          alt={project.title || "Project Image"}
          width={1200}
          height={600}
          className="object-cover w-full h-full"
          priority
          unoptimized
        />

        {/* Back Button */}
        <div className="absolute top-6 start-6 z-20">
          <Button
            onClick={() => router.push("/")}
            variant="outline"
            className="gap-2 bg-background/80 backdrop-blur-md border-black/10 dark:border-white/10 hover:bg-background rounded-2xl shadow-lg"
          >
            <ArrowLeft className={`w-4 h-4 ${language === "ar" ? "rotate-180" : ""}`} />
            <span>{language === "ar" ? "العودة للرئيسية" : "Back to Home"}</span>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 -mt-24 relative z-20 pb-20">
        <div className="max-w-5xl mx-auto">
          {/* Project Header Card */}
          <Card className="bg-card/95 backdrop-blur-2xl border-black/5 dark:border-white/10 rounded-3xl shadow-2xl mb-10 overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className="bg-blue-600/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 text-xs font-bold uppercase tracking-wider">
                      {language === "ar" ? "دراسة حالة إنتاجية" : "Production Case Study"}
                    </Badge>
                    {project.featured && (
                      <Badge className="bg-amber-500/10 text-amber-500 border border-amber-500/20 text-xs font-bold">
                        ★ Featured
                      </Badge>
                    )}
                  </div>

                  <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tight text-foreground">
                    {project.title}
                  </h1>

                  {/* Tags */}
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {tags.map((tag: string, index: number) => (
                        <span
                          key={index}
                          className="px-3.5 py-1.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl text-xs font-mono font-bold border border-blue-500/20"
                        >
                          <Tag className="w-3 h-3 inline me-1.5" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Date */}
                  {project.createdAt && (
                    <div className="flex items-center gap-2 text-muted-foreground text-xs font-semibold">
                      <Calendar className="w-3.5 h-3.5 text-blue-500" />
                      <span>
                        {new Date(project.createdAt).toLocaleDateString(
                          language === "ar" ? "ar-EG" : "en-US",
                          { year: "numeric", month: "long" }
                        )}
                      </span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  {project.liveUrl && (
                    <Button
                      asChild
                      size="lg"
                      className="gap-2 bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/20 rounded-2xl text-sm font-bold"
                    >
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                        <span>{language === "ar" ? "زيارة المنصة" : "Live Platform"}</span>
                      </a>
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="gap-2 border-black/10 dark:border-white/10 rounded-2xl text-sm font-bold"
                    >
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4" />
                        <span>{language === "ar" ? "الكود المصدري" : "GitHub Repo"}</span>
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              {/* High-Level Overview */}
              {mainDescription && (
                <div className="p-6 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 mb-6">
                  <p className="text-base sm:text-lg leading-relaxed text-muted-foreground font-medium">
                    {mainDescription}
                  </p>
                </div>
              )}

              {/* Prominent Impact Metric */}
              {impactMetric && (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span className="text-sm sm:text-base font-bold text-emerald-600 dark:text-emerald-400">
                    {impactMetric}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Architecture & Engineering Sections */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Architectural Overview */}
            <Card className="bg-card/70 backdrop-blur-xl border-black/5 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                    <Lightbulb className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-black text-foreground">
                    {language === "ar" ? "هندسة النظام والتقنيات" : "System Architecture"}
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {language === "ar"
                    ? "تم تصميم وبناء هذا المشروع كمنظومة قابلة للتوسع بمعايير هندسية متقدمة تضمن الأمان العالي، التوافر، وسرعة الاستجابة اللحظية."
                    : "Architected as a resilient, production-ready system utilizing modern type-safe standards to ensure high concurrency, low latency, and security."}
                </p>
              </CardContent>
            </Card>

            {/* Production Quality */}
            <Card className="bg-card/70 backdrop-blur-xl border-black/5 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-black text-foreground">
                    {language === "ar" ? "معايير الأمان والاعتمادية" : "Security & Reliability"}
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {language === "ar"
                    ? "تطبيق أفضل ممارسات التحقق من المدخلات، حماية الواجهات البرمجية، وعزل قواعد البيانات لضمان تجربة مستقرة وموثوقة للمستخدمين."
                    : "Strict input validation, API rate limiting, robust transaction isolation, and secure authentication to guarantee an uninterrupted experience."}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Gallery Section */}
          {allImages.length > 1 && (
            <div className="mb-12">
              <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
                <span className="w-8 h-1 bg-blue-600 rounded-full" />
                <span>{language === "ar" ? "معرض الصور والشاشات" : "Platform Gallery"}</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allImages.map((imageUrl: string, index: number) => (
                  <Card
                    key={index}
                    className="group cursor-pointer overflow-hidden bg-card/40 border-black/5 dark:border-white/5 hover:border-blue-500/30 transition-all rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-blue-500/10"
                    onClick={() => openLightbox(index)}
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={imageUrl}
                        alt={`${project.title} - Preview ${index + 1}`}
                        width={600}
                        height={400}
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                        <ExternalLink className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Videos Section */}
          {galleryVideos.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
                <span className="w-8 h-1 bg-blue-600 rounded-full" />
                <span>{language === "ar" ? "عروض الفيديو التوضيحية" : "Demo Videos"}</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {galleryVideos.map((videoUrl: string, index: number) => (
                  <Card
                    key={index}
                    className="overflow-hidden bg-card/40 border-black/5 dark:border-white/5 rounded-3xl shadow-xl"
                  >
                    <div className="relative aspect-video">
                      <video src={videoUrl} controls className="w-full h-full object-cover" />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-md"
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
            className="relative max-w-6xl max-h-[85vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt="Full size view"
              width={1200}
              height={800}
              className="object-contain max-h-[85vh]"
              unoptimized
            />
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-xs font-mono font-bold bg-black/70 px-4 py-2 rounded-full border border-white/10">
            {currentImageIndex + 1} / {allImages.length}
          </div>
        </div>
      )}
    </div>
  );
}
