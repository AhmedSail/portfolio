"use client";

import * as React from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Loader2,
  Image as ImageIcon,
  User,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  FileText,
  Save,
  Globe,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Swal from "sweetalert2";

export default function ProfilePage() {
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [profileImage, setProfileImage] = React.useState<File>();
  const [resumeFile, setResumeFile] = React.useState<File>();
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const { edgestore } = useEdgeStore();

  const [formData, setFormData] = React.useState({
    name: "",
    title: "",
    bio: "",
    email: "",
    phone: "",
    address: "",
    imageUrl: "",
    resumeUrl: "",
    githubUrl: "",
    linkedinUrl: "",
    twitterUrl: "",
    facebookUrl: "",
    instagramUrl: "",
    whatsappUrl: "",
  });

  React.useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.id) {
          setFormData(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      let updatedData = { ...formData };

      // Upload profile image if selected
      if (profileImage) {
        const res = await edgestore.publicFiles.upload({
          file: profileImage,
          onProgressChange: (progress) => setUploadProgress(progress),
        });
        updatedData.imageUrl = res.url;
      }

      // Upload resume if selected
      if (resumeFile) {
        const res = await edgestore.publicFiles.upload({
          file: resumeFile,
          onProgressChange: (progress) => setUploadProgress(progress),
        });
        updatedData.resumeUrl = res.url;
      }

      const response = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      const result = await response.json();
      if (result.success) {
        Swal.fire({
          icon: "success",
          title: "Profile Updated!",
          timer: 2000,
          showConfirmButton: false,
          background: "#1a1a1a",
          color: "#fff",
        });
        setFormData(result.profile);
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update profile",
        background: "#1a1a1a",
        color: "#fff",
      });
    } finally {
      setSaving(false);
      setUploadProgress(0);
      setProfileImage(undefined);
      setResumeFile(undefined);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8 bg-background/50 min-h-screen">
      <div className="space-y-1">
        <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-white">
          Personal Information
        </h1>
        <p className="text-muted-foreground text-lg">
          Manage your contact details, social links, and bio.
        </p>
      </div>

      <form
        onSubmit={handleSave}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* Basic Info */}
        <Card className="lg:col-span-2 border-white/5 bg-card/40 backdrop-blur-md rounded-3xl overflow-hidden">
          <CardHeader className="bg-white/5 border-b border-white/5">
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-blue-400" />
              General Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-blue-400 font-bold">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    className="pl-10 h-12 bg-white/5 border-white/10 rounded-xl"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-blue-400 font-bold">
                  Professional Title
                </Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    className="pl-10 h-12 bg-white/5 border-white/10 rounded-xl"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-blue-400 font-bold">About Me / Bio</Label>
              <Textarea
                className="min-h-[150px] bg-white/5 border-white/10 rounded-xl resize-none"
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-blue-400 font-bold">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    className="pl-10 h-12 bg-white/5 border-white/10 rounded-xl"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-blue-400 font-bold">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    className="pl-10 h-12 bg-white/5 border-white/10 rounded-xl"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Media & Resume */}
        <div className="space-y-8">
          <Card className="border-white/5 bg-card/40 backdrop-blur-md rounded-3xl overflow-hidden">
            <CardHeader className="bg-white/5 border-b border-white/5">
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-blue-400" />
                Assets
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="space-y-4">
                <Label className="text-blue-400 font-bold">
                  Profile Picture
                </Label>
                <div className="relative group">
                  <div className="w-32 h-32 rounded-3xl bg-white/5 border-2 border-dashed border-white/20 flex items-center justify-center overflow-hidden mx-auto">
                    {formData.imageUrl || profileImage ? (
                      <img
                        src={
                          profileImage
                            ? URL.createObjectURL(profileImage)
                            : formData.imageUrl
                        }
                        className="w-full h-full object-cover"
                        alt=""
                      />
                    ) : (
                      <ImageIcon className="w-10 h-10 text-muted-foreground" />
                    )}
                    <Input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={(e) => setProfileImage(e.target.files?.[0])}
                    />
                  </div>
                  <p className="text-center text-xs text-muted-foreground mt-2">
                    Click to change avatar
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-blue-400 font-bold">
                  Resume / CV (PDF)
                </Label>
                <div className="relative p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                  <FileText className="w-6 h-6 text-blue-400" />
                  <div className="flex-1 overflow-hidden">
                    <p className="text-sm font-medium truncate">
                      {resumeFile
                        ? resumeFile.name
                        : formData.resumeUrl
                        ? "cv_uploaded.pdf"
                        : "No file uploaded"}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    type="button"
                    className="relative h-8 rounded-lg"
                  >
                    Choose
                    <Input
                      type="file"
                      accept=".pdf"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={(e) => setResumeFile(e.target.files?.[0])}
                    />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button
            className="w-full h-16 text-xl font-bold rounded-3xl bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-500/20 transition-all active:scale-95"
            disabled={saving}
          >
            {saving ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <div className="flex items-center gap-2">
                <Save className="w-6 h-6" /> Save Profile
              </div>
            )}
          </Button>
        </div>

        {/* Social Links */}
        <Card className="lg:col-span-3 border-white/5 bg-card/40 backdrop-blur-md rounded-3xl overflow-hidden">
          <CardHeader className="bg-white/5 border-b border-white/5">
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-400" />
              Social Presence
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { label: "GitHub", icon: Github, key: "githubUrl" },
              { label: "LinkedIn", icon: Linkedin, key: "linkedinUrl" },
              { label: "Twitter / X", icon: Twitter, key: "twitterUrl" },
              { label: "Facebook", icon: Facebook, key: "facebookUrl" },
              { label: "Instagram", icon: Instagram, key: "instagramUrl" },
              { label: "WhatsApp", icon: Phone, key: "whatsappUrl" },
            ].map((social) => (
              <div key={social.key} className="space-y-2">
                <Label className="text-muted-foreground font-medium">
                  {social.label}
                </Label>
                <div className="relative">
                  <social.icon className="absolute left-3 top-3 w-4 h-4 text-blue-400/50" />
                  <Input
                    className="pl-10 bg-white/5 border-white/10 rounded-xl"
                    placeholder={`https://${social.label.toLowerCase()}.com/...`}
                    value={(formData as any)[social.key] || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, [social.key]: e.target.value })
                    }
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
