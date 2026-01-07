import { useState } from "react";
import {
  Mail,
  Send,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  FileText,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

import { z } from "zod";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email")
    .max(255, "Email must be less than 255 characters"),
  message: z
    .string()
    .trim()
    .min(1, "Message is required")
    .max(1000, "Message must be less than 1000 characters"),
});

const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    href: "https://github.com",
    color: "hover:text-primary",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://linkedin.com",
    color: "hover:text-primary",
  },
  {
    name: "Twitter",
    icon: Twitter,
    href: "https://twitter.com",
    color: "hover:text-primary",
  },
  {
    name: "Resume",
    icon: FileText,
    href: "/resume.pdf",
    color: "hover:text-accent",
  },
];

export const Contact = ({ profile }: { profile: any | null }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const socialLinks = [
    { name: "GitHub", icon: Github, href: profile?.githubUrl },
    { name: "LinkedIn", icon: Linkedin, href: profile?.linkedinUrl },
    { name: "Twitter", icon: Twitter, href: profile?.twitterUrl },
    { name: "Instagram", icon: Instagram, href: profile?.instagramUrl },
    { name: "Facebook", icon: Facebook, href: profile?.facebookUrl },
    { name: "Resume", icon: FileText, href: profile?.resumeUrl },
  ].filter((link) => link.href);

  return (
    <section
      id="contact"
      className="py-32 relative overflow-hidden bg-background"
    >
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6 backdrop-blur-md">
            <Mail className="w-4 h-4 text-blue-500" />
            <span className="font-mono text-xs font-bold text-blue-500 uppercase tracking-widest">
              Contact Me
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            Let's Start a{" "}
            <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-blue-600 dark:to-white">
              Project
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Ready to bring your ideas to life? Fill out the form below or reach
            out via socials. I'm always open to new opportunities.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="bg-card/60 dark:bg-card/40 border-black/5 dark:border-white/5 backdrop-blur-xl rounded-[2.5rem] overflow-hidden shadow-xl">
            <CardContent className="p-8 md:p-12">
              <form className="space-y-8">
                <div className="space-y-3">
                  <Label
                    htmlFor="name"
                    className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest ml-1"
                  >
                    Your Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="h-14 bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 rounded-2xl focus:border-blue-500/50 focus:ring-blue-500/20 text-base"
                  />
                </div>

                <div className="space-y-3">
                  <Label
                    htmlFor="email"
                    className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest ml-1"
                  >
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className="h-14 bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 rounded-2xl focus:border-blue-500/50 focus:ring-blue-500/20 text-base"
                  />
                </div>

                <div className="space-y-3">
                  <Label
                    htmlFor="message"
                    className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest ml-1"
                  >
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="What's on your mind?"
                    rows={6}
                    className="bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 rounded-2xl focus:border-blue-500/50 focus:ring-blue-500/20 text-base resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-16 bg-blue-600 hover:bg-blue-500 text-white text-lg font-bold rounded-2xl shadow-xl shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-95 group"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <div className="flex items-center gap-2">
                      Send Message{" "}
                      <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform font-black" />
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="flex flex-col gap-8">
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Email Card */}
              <Card className="bg-card/60 dark:bg-card/40 border-black/5 dark:border-white/5 backdrop-blur-xl rounded-4xl hover:bg-blue-500/5 transition-all group shadow-xl">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 border border-blue-500/20 group-hover:scale-110 transition-transform">
                    <Mail className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-sm font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-2">
                    Email Me
                  </h3>
                  <a
                    href={`mailto:${profile?.email || "hello@example.com"}`}
                    className="text-lg font-bold break-all hover:text-blue-500 transition-colors"
                  >
                    {profile?.email || "hello@example.com"}
                  </a>
                </CardContent>
              </Card>

              {/* Location Card */}
              <Card className="bg-card/60 dark:bg-card/40 border-black/5 dark:border-white/5 backdrop-blur-xl rounded-4xl hover:bg-blue-500/5 transition-all group shadow-xl">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-2xl bg-black/5 dark:bg-white/10 flex items-center justify-center mb-6 border border-black/10 dark:border-white/20 group-hover:scale-110 transition-transform">
                    <MapPin className="w-7 h-7 text-foreground" />
                  </div>
                  <h3 className="text-sm font-black text-muted-foreground uppercase tracking-widest mb-2">
                    Location
                  </h3>
                  <p className="text-xl font-black">
                    {profile?.address || "Available Worldwide"}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Socials Grid */}
            <Card className="bg-card/60 dark:bg-card/40 border-black/5 dark:border-white/5 backdrop-blur-xl rounded-4xl flex-1 overflow-hidden shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-xl font-black mb-8 flex items-center gap-3">
                  <span className="w-10 h-1.5 bg-blue-600 rounded-full" />
                  Find me online
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-5 rounded-3xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white dark:bg-white/10 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                        <link.icon className="w-5 h-5 text-black dark:text-white group-hover:text-blue-500 transition-colors" />
                      </div>
                      <span className="font-bold text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {link.name}
                      </span>
                    </a>
                  ))}
                </div>

                {profile?.whatsappUrl && (
                  <a
                    href={profile.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 flex items-center justify-center gap-3 p-6 rounded-3xl bg-green-500/10 border border-green-500/20 hover:bg-green-500/20 hover:border-green-500/50 transition-all text-green-600 dark:text-green-400 font-black uppercase tracking-widest text-sm shadow-lg shadow-green-500/10"
                  >
                    Chat on WhatsApp
                  </a>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
