"use client";

import * as React from "react";
import { useEdgeStore } from "@/lib/edgestore";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Plus,
  Trash2,
  ExternalLink,
  Github,
  Loader2,
  Image as ImageIcon,
  Video,
  X,
  Star,
  Globe,
  Tag,
  AlignLeft,
  Type,
  Layout,
  Pencil,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Swal from "sweetalert2";
import { Switch } from "@/components/ui/switch";

export default function ProjectsPage() {
  const [thumbnail, setThumbnail] = React.useState<File>();
  const [gallery, setGallery] = React.useState<File[]>([]);
  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState<{
    [key: string]: number;
  }>({});
  const [projectsList, setProjectsList] = React.useState<any[]>([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [editingProject, setEditingProject] = React.useState<any | null>(null);
  const { edgestore } = useEdgeStore();

  const [formData, setFormData] = React.useState({
    title: "",
    description: "",
    liveUrl: "",
    githubUrl: "",
    tags: "",
    featured: false,
  });

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects");
      const data = await response.json();
      setProjectsList(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  React.useEffect(() => {
    fetchProjects();
  }, []);

  const resetForm = () => {
    setThumbnail(undefined);
    setGallery([]);
    setFormData({
      title: "",
      description: "",
      liveUrl: "",
      githubUrl: "",
      tags: "",
      featured: false,
    });
    setEditingProject(null);
  };

  const handleEdit = (project: any) => {
    setEditingProject(project);
    setFormData({
      title: project.title || "",
      description: project.description || "",
      liveUrl: project.liveUrl || "",
      githubUrl: project.githubUrl || "",
      tags: project.tags || "",
      featured: project.featured === true || project.featured === 1,
    });
    setIsOpen(true);
  };

  const handleUpload = async () => {
    if (!thumbnail && !editingProject) {
      Swal.fire({
        icon: "error",
        title: "Missing Media",
        text: "Please select a main thumbnail image first!",
        background: "#1a1a1a",
        color: "#fff",
        confirmButtonColor: "#3b82f6",
      });
      return;
    }

    if (!formData.title) {
      Swal.fire({
        icon: "warning",
        title: "Missing Title",
        text: "Please enter a title for your project",
        background: "#1a1a1a",
        color: "#fff",
        confirmButtonColor: "#3b82f6",
      });
      return;
    }

    try {
      setIsUploading(true);
      setUploadProgress({});

      let finalImageUrl = editingProject?.imageUrl;
      let finalGalleryUrls = editingProject?.gallery
        ? JSON.parse(editingProject.gallery)
        : [];

      // 1. Upload Thumbnail (only if new one selected)
      if (thumbnail) {
        const thumbRes = await edgestore.publicFiles.upload({
          file: thumbnail,
          onProgressChange: (progress) => {
            setUploadProgress((prev) => ({ ...prev, thumbnail: progress }));
          },
        });
        finalImageUrl = thumbRes.url;
      }

      // 2. Upload Gallery Files (only new ones)
      if (gallery.length > 0) {
        const newGalleryUrls: string[] = [];
        for (let i = 0; i < gallery.length; i++) {
          const file = gallery[i];
          const res = await edgestore.publicFiles.upload({
            file,
            onProgressChange: (progress) => {
              setUploadProgress((prev) => ({
                ...prev,
                [`gallery_${i}`]: progress,
              }));
            },
          });
          newGalleryUrls.push(res.url);
        }
        finalGalleryUrls = [...finalGalleryUrls, ...newGalleryUrls];
      }

      // 3. Save to DB (POST if new, PATCH if editing)
      const method = editingProject ? "PATCH" : "POST";
      const body = {
        ...formData,
        id: editingProject?.id,
        imageUrl: finalImageUrl,
        gallery: finalGalleryUrls,
      };

      const response = await fetch("/api/projects", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const result = await response.json();

      if (result.success) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: editingProject
            ? "Project updated successfully!"
            : "Project published successfully!",
          timer: 2000,
          showConfirmButton: false,
          background: "#1a1a1a",
          color: "#fff",
        });
        setIsOpen(false);
        resetForm();
        fetchProjects();
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: result.error || "Operation failed",
          background: "#1a1a1a",
          color: "#fff",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error processing request",
        background: "#1a1a1a",
        color: "#fff",
      });
    } finally {
      setIsUploading(false);
      setUploadProgress({});
    }
  };

  const handleDelete = async (project: any) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete the project and all associated media!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3b82f6",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!",
      background: "#1a1a1a",
      color: "#fff",
    });

    if (result.isConfirmed) {
      try {
        if (project.imageUrl) {
          await edgestore.publicFiles.delete({ url: project.imageUrl });
        }
        if (project.gallery) {
          const galleryUrls = JSON.parse(project.gallery);
          for (const url of galleryUrls) {
            await edgestore.publicFiles.delete({ url });
          }
        }
        const response = await fetch(`/api/projects?id=${project.id}`, {
          method: "DELETE",
        });
        const res = await response.json();

        if (res.success) {
          Swal.fire({
            title: "Deleted!",
            text: "Project and media have been removed.",
            icon: "success",
            background: "#1a1a1a",
            color: "#fff",
          });
          fetchProjects();
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to delete project fully",
          background: "#1a1a1a",
          color: "#fff",
        });
      }
    }
  };

  const isVideo = (url: string) => {
    return url?.match(/\.(mp4|webm|ogg)$/i) || url?.includes("/video/");
  };

  const calculateTotalProgress = () => {
    const values = Object.values(uploadProgress);
    if (values.length === 0) return 0;
    const sum = values.reduce((a, b) => a + b, 0);
    const divisor = (thumbnail ? 1 : 0) + gallery.length;
    return divisor > 0 ? Math.round(sum / divisor) : 0;
  };

  return (
    <div className="p-4 md:p-8 space-y-8 bg-background/50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-white">
            Project Management
          </h1>
          <p className="text-muted-foreground text-lg">
            Showcase your best work with detailed galleries and live links.
          </p>
        </div>

        <Dialog
          open={isOpen}
          onOpenChange={(open) => {
            setIsOpen(open);
            if (!open) resetForm();
          }}
        >
          <DialogTrigger asChild>
            <Button
              size="lg"
              className="gap-2 bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/20 px-8 py-6 text-lg rounded-2xl transition-all hover:scale-105 active:scale-95"
              onClick={() => resetForm()}
            >
              <Plus className="w-5 h-5" /> Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto bg-card/95 backdrop-blur-xl border-white/10 rounded-4xl">
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-white">
                {editingProject ? "Edit Project" : "Create New Entry"}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground text-base">
                {editingProject
                  ? "Update your project details and media assets."
                  : "Fill in the details below to publish a new project to your portfolio."}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-8 py-6">
              {/* Title Input */}
              <div className="grid gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 transition-all focus-within:border-blue-500/50 focus-within:shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                <div className="flex items-center gap-2 text-blue-400">
                  <Type className="w-4 h-4" />
                  <Label htmlFor="title" className="font-semibold text-base">
                    Project Title
                  </Label>
                </div>
                <Input
                  id="title"
                  placeholder="e.g., Next.js SaaS Platform"
                  className="bg-transparent border-none text-lg h-12 focus-visible:ring-0 px-0 placeholder:text-muted-foreground/50"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>

              {/* Description Textarea */}
              <div className="grid gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 transition-all focus-within:border-blue-500/50">
                <div className="flex items-center gap-2 text-blue-400">
                  <AlignLeft className="w-4 h-4" />
                  <Label
                    htmlFor="description"
                    className="font-semibold text-base"
                  >
                    Project Summary
                  </Label>
                </div>
                <Textarea
                  id="description"
                  placeholder="Describe your role, the technology used, and the problem it solves..."
                  className="bg-transparent border-none text-base min-h-[120px] focus-visible:ring-0 px-0 resize-none placeholder:text-muted-foreground/50"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>

              {/* URL Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 transition-all focus-within:border-blue-500/50">
                  <div className="flex items-center gap-2 text-blue-400">
                    <Globe className="w-4 h-4" />
                    <Label
                      htmlFor="liveUrl"
                      className="font-semibold text-base"
                    >
                      Live Preview URL
                    </Label>
                  </div>
                  <Input
                    id="liveUrl"
                    placeholder="https://example.com"
                    className="bg-transparent border-none text-base h-10 focus-visible:ring-0 px-0"
                    value={formData.liveUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, liveUrl: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 transition-all focus-within:border-blue-500/50">
                  <div className="flex items-center gap-2 text-blue-400">
                    <Github className="w-4 h-4" />
                    <Label
                      htmlFor="githubUrl"
                      className="font-semibold text-base"
                    >
                      GitHub Repository
                    </Label>
                  </div>
                  <Input
                    id="githubUrl"
                    placeholder="https://github.com/username/repo"
                    className="bg-transparent border-none text-base h-10 focus-visible:ring-0 px-0"
                    value={formData.githubUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, githubUrl: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Tags & Featured */}
              <div className="grid grid-cols-1 md:grid-cols-[1fr,200px] gap-4 items-center">
                <div className="grid gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 transition-all focus-within:border-blue-500/50">
                  <div className="flex items-center gap-2 text-blue-400">
                    <Tag className="w-4 h-4" />
                    <Label htmlFor="tags" className="font-semibold text-base">
                      Tags (comma separated)
                    </Label>
                  </div>
                  <Input
                    id="tags"
                    placeholder="React, TypeScript, Tailwind..."
                    className="bg-transparent border-none text-base h-10 focus-visible:ring-0 px-0"
                    value={formData.tags}
                    onChange={(e) =>
                      setFormData({ ...formData, tags: e.target.value })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-blue-500/5 border border-blue-500/20 h-full">
                  <div className="flex items-center gap-2 text-blue-400">
                    <Star className="w-4 h-4 fill-blue-400" />
                    <Label
                      htmlFor="featured"
                      className="font-semibold text-base cursor-pointer"
                    >
                      Featured
                    </Label>
                  </div>
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, featured: checked })
                    }
                  />
                </div>
              </div>

              {/* Uploads */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-3 p-6 rounded-2xl bg-white/5 border-2 border-dashed border-white/10 hover:border-blue-500/50 transition-all group relative overflow-hidden">
                  <div className="flex flex-col items-center gap-2 text-center">
                    <ImageIcon className="w-8 h-8 text-blue-400 group-hover:scale-110 transition-transform" />
                    <span className="font-semibold text-sm">
                      {editingProject ? "Change Thumbnail" : "Thumbnail Image"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      JPG, PNG, WebP
                    </span>
                  </div>
                  <Input
                    type="file"
                    accept="image/*,video/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => setThumbnail(e.target.files?.[0])}
                  />
                  {(thumbnail || (editingProject && !thumbnail)) && (
                    <div className="absolute inset-0 bg-blue-600/90 flex flex-col items-center justify-center text-white p-2 text-center pointer-events-none">
                      <Layout className="w-8 h-8 mb-1" />
                      <span className="text-xs font-bold truncate w-full px-4">
                        {thumbnail ? thumbnail.name : "Keep existing thumbnail"}
                      </span>
                      <span className="text-[10px] opacity-70">
                        Click to change
                      </span>
                    </div>
                  )}
                </div>

                <div className="grid gap-3 p-6 rounded-2xl bg-white/5 border-2 border-dashed border-white/10 hover:border-blue-500/50 transition-all group relative overflow-hidden">
                  <div className="flex flex-col items-center gap-2 text-center">
                    <div className="flex -space-x-2">
                      <ImageIcon className="w-8 h-8 text-blue-400/80 transform -rotate-12 translate-y-1" />
                      <ImageIcon className="w-8 h-8 text-blue-400" />
                      <ImageIcon className="w-8 h-8 text-blue-400/80 transform rotate-12 translate-y-1" />
                    </div>
                    <span className="font-semibold text-sm">
                      {editingProject ? "Add to Gallery" : "Project Gallery"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {gallery.length > 0
                        ? `${gallery.length} new files`
                        : "Upload multiple files"}
                    </span>
                  </div>
                  <Input
                    type="file"
                    accept="image/*,video/*"
                    multiple
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      setGallery((prev) => [...prev, ...files]);
                    }}
                  />
                </div>
              </div>

              {/* Selected Gallery Files */}
              {gallery.length > 0 && (
                <div className="flex flex-wrap gap-2 p-2 rounded-2xl bg-white/5 border border-white/10">
                  {gallery.map((file, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 bg-blue-500/10 text-blue-400 px-3 py-1.5 rounded-xl text-xs border border-blue-500/20 group animate-in fade-in zoom-in duration-300"
                    >
                      <span className="truncate max-w-[120px] font-medium">
                        {file.name}
                      </span>
                      <button
                        onClick={() =>
                          setGallery((prev) => prev.filter((_, i) => i !== idx))
                        }
                        className="hover:text-red-400 transition-colors"
                      >
                        <X className="w-3.5 h-3.5 fill-current" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Progress */}
              {isUploading && (
                <div className="space-y-3 p-4 rounded-2xl bg-blue-500/5 border border-blue-500/20">
                  <div className="flex justify-between text-sm font-bold text-blue-400">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>
                        {editingProject
                          ? "Updating Project..."
                          : "Uploading Media Assets..."}
                      </span>
                    </div>
                    <span>{calculateTotalProgress()}%</span>
                  </div>
                  <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">
                    <div
                      className="bg-linear-to-r from-blue-600 to-blue-400 h-full transition-all duration-500 ease-out"
                      style={{ width: `${calculateTotalProgress()}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-white/10">
              <Button
                onClick={handleUpload}
                disabled={isUploading}
                className="w-full h-16 text-xl font-bold rounded-2xl bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-500/10 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
              >
                {isUploading ? (
                  <div className="flex items-center gap-3">
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span>Processing...</span>
                  </div>
                ) : editingProject ? (
                  "Update Project"
                ) : (
                  "Publish Project"
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-none shadow-2xl shadow-blue-500/5 overflow-hidden bg-card/40 backdrop-blur-md rounded-2xl md:rounded-3xl border border-white/5">
        <CardHeader className="bg-white/5 border-b border-white/5 p-6">
          <CardTitle className="text-2xl font-bold flex items-center gap-3">
            <Layout className="w-6 h-6 text-blue-400" />
            Active Inventory
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-white/5 border-b">
                  <TableHead className="w-[120px] pl-8 font-bold text-muted-foreground uppercase text-xs tracking-widest">
                    Preview
                  </TableHead>
                  <TableHead className="font-bold text-muted-foreground uppercase text-xs tracking-widest">
                    Information
                  </TableHead>
                  <TableHead className="font-bold text-muted-foreground uppercase text-xs tracking-widest">
                    Gallery
                  </TableHead>
                  <TableHead className="font-bold text-muted-foreground uppercase text-xs tracking-widest">
                    Assets
                  </TableHead>
                  <TableHead className="text-right pr-8 font-bold text-muted-foreground uppercase text-xs tracking-widest">
                    Control
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projectsList.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center py-32 text-muted-foreground"
                    >
                      <div className="flex flex-col items-center gap-4 animate-pulse">
                        <ImageIcon className="w-20 h-20 opacity-10" />
                        <p className="text-xl font-medium">
                          No projects in your inventory
                        </p>
                        <Button
                          variant="outline"
                          onClick={() => {
                            resetForm();
                            setIsOpen(true);
                          }}
                          className="rounded-full border-white/10 hover:bg-white/5"
                        >
                          Launch First One
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  projectsList.map((project) => (
                    <TableRow
                      key={project.id}
                      className="group transition-all hover:bg-white/5 border-white/5 h-32"
                    >
                      <TableCell className="pl-8">
                        <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-white/5 flex items-center justify-center group-hover:ring-4 ring-blue-500/30 transition-all duration-500">
                          {isVideo(project.imageUrl) ? (
                            <div className="flex flex-col items-center opacity-70">
                              <Video className="w-10 h-10 text-blue-400" />
                              <span className="text-[10px] uppercase font-bold tracking-wider mt-1">
                                Video
                              </span>
                            </div>
                          ) : (
                            <img
                              src={project.imageUrl}
                              alt={project.title}
                              className="w-full h-full object-cover transition-transform group-hover:scale-110"
                            />
                          )}
                          <a
                            href={project.imageUrl}
                            target="_blank"
                            className="absolute inset-0 bg-blue-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                          >
                            <ExternalLink className="w-6 h-6 text-white" />
                          </a>
                        </div>
                      </TableCell>
                      <TableCell className="py-6">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <h3 className="font-bold text-xl text-white tracking-tight">
                              {project.title}
                            </h3>
                            {project.featured && (
                              <div className="px-2 py-0.5 bg-blue-500/10 border border-blue-500/30 rounded-md text-[10px] text-blue-400 font-bold uppercase tracking-tighter">
                                Featured
                              </div>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2 max-w-[400px] leading-relaxed italic">
                            {project.description || "No description provided."}
                          </p>
                          <div className="flex flex-wrap gap-1.5 mt-3">
                            {project.tags
                              ?.split(",")
                              .map((tag: string, i: number) => (
                                <span
                                  key={i}
                                  className="px-2.5 py-1 bg-white/5 text-blue-400 text-[10px] rounded-lg font-bold border border-white/5 uppercase tracking-wider"
                                >
                                  {tag.trim()}
                                </span>
                              ))}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex -space-x-3 overflow-hidden">
                          {project.gallery &&
                            JSON.parse(project.gallery)
                              .slice(0, 4)
                              .map((url: string, i: number) => (
                                <div
                                  key={i}
                                  className="inline-block h-10 w-10 rounded-full ring-4 ring-card bg-white/10 overflow-hidden transform hover:-translate-y-1 transition-transform"
                                >
                                  {isVideo(url) ? (
                                    <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-blue-400">
                                      <Video className="w-4 h-4" />
                                    </div>
                                  ) : (
                                    <img
                                      src={url}
                                      className="h-full w-full object-cover"
                                    />
                                  )}
                                </div>
                              ))}
                          {project.gallery &&
                            JSON.parse(project.gallery).length > 4 && (
                              <div className="flex items-center justify-center h-10 w-10 rounded-full ring-4 ring-card bg-blue-600 text-white text-[12px] font-black">
                                +{JSON.parse(project.gallery).length - 4}
                              </div>
                            )}
                          {!project.gallery && (
                            <span className="text-xs text-muted-foreground/30 font-mono tracking-widest">
                              EMPTY_GALLERY
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {project.liveUrl && (
                            <Button
                              variant="ghost"
                              size="icon"
                              asChild
                              className="rounded-full w-10 h-10 hover:bg-blue-500/10 hover:text-blue-400"
                            >
                              <a href={project.liveUrl} target="_blank">
                                <ExternalLink className="w-5 h-5" />
                              </a>
                            </Button>
                          )}
                          {project.githubUrl && (
                            <Button
                              variant="ghost"
                              size="icon"
                              asChild
                              className="rounded-full w-10 h-10 hover:bg-white/10"
                            >
                              <a href={project.githubUrl} target="_blank">
                                <Github className="w-5 h-5" />
                              </a>
                            </Button>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right pr-8">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground hover:text-blue-400 hover:bg-blue-500/10 rounded-2xl w-12 h-12 transition-all"
                            onClick={() => handleEdit(project)}
                          >
                            <Pencil className="w-5 h-5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-2xl w-12 h-12 transition-all hover:rotate-6 shadow-none"
                            onClick={() => handleDelete(project)}
                          >
                            <Trash2 className="w-5 h-5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Cards View */}
          <div className="lg:hidden p-4 space-y-4">
            {projectsList.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                No projects found.
              </div>
            ) : (
              projectsList.map((project) => (
                <Card
                  key={project.id}
                  className="bg-white/5 border-white/5 rounded-2xl overflow-hidden p-4 space-y-4"
                >
                  <div className="flex gap-4">
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-black/20 flex-shrink-0">
                      {isVideo(project.imageUrl) ? (
                        <div className="w-full h-full flex items-center justify-center">
                          <Video className="w-8 h-8 text-blue-400" />
                        </div>
                      ) : (
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-lg">{project.title}</h3>
                        {project.featured && (
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {project.tags
                          ?.split(",")
                          .slice(0, 3)
                          .map((tag: string, i: number) => (
                            <span
                              key={i}
                              className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-md border border-blue-500/10"
                            >
                              {tag.trim()}
                            </span>
                          ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <div className="flex gap-2">
                      {project.liveUrl && (
                        <Button
                          size="icon"
                          variant="ghost"
                          className="w-8 h-8 hover:bg-blue-500/10"
                          asChild
                        >
                          <a href={project.liveUrl} target="_blank">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button
                          size="icon"
                          variant="ghost"
                          className="w-8 h-8 hover:bg-white/10"
                          asChild
                        >
                          <a href={project.githubUrl} target="_blank">
                            <Github className="w-4 h-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="w-9 h-9 text-blue-400 hover:bg-blue-500/10"
                        onClick={() => handleEdit(project)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="w-9 h-9 text-red-500 hover:bg-red-500/10"
                        onClick={() => handleDelete(project)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
