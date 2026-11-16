"use client";

import { useState } from "react";
import {
  Mail,
  Send,
  Github,
  Linkedin,
  Twitter,
  FileText,
  MapPin,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import { z } from "zod";
import { useLanguage } from "@/lib/language-context";

export const Contact = ({ profile }: { profile: any | null }) => {
  const { language, dir, t } = useLanguage();

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

  const professionalEmail =
    profile?.email && !profile.email.includes("sdew2sdew")
      ? profile.email
      : "ahmed.qompoz@gmail.com";

  const cleanLinkedin =
    profile?.linkedinUrl && profile.linkedinUrl.length > 22
      ? profile.linkedinUrl
      : "https://linkedin.com/in/ahmed-qompoz";

  const cleanTwitter = profile?.twitterUrl || "https://x.com/ahmedqompoz";
  const cleanGithub = profile?.githubUrl || "https://github.com";
  const whatsappUrl = profile?.whatsappUrl || "https://wa.me/970592855602";

  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      href: cleanGithub,
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: cleanLinkedin,
    },
    {
      name: "X (Twitter)",
      icon: Twitter,
      href: cleanTwitter,
    },
    {
      name: t("resumeBtn"),
      icon: FileText,
      href: profile?.resumeUrl || "/resume.pdf",
    },
  ];

  const contactSchema = z.object({
    name: z
      .string()
      .trim()
      .min(1, language === "ar" ? "الاسم مطلوب" : "Name is required")
      .max(100),
    email: z
      .string()
      .trim()
      .email(language === "ar" ? "يرجى إدخال بريد إلكتروني صالح" : "Please enter a valid email"),
    message: z
      .string()
      .trim()
      .min(1, language === "ar" ? "الرسالة مطلوبة" : "Message is required")
      .max(1000),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = contactSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors: { [key: string]: string } = {};
      validation.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      await emailjs.send(
        "ahmed",
        "template_wanyswu",
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: profile?.name || "Ahmed Qompoz",
        },
        "_63K7TVQxU9-re0-m"
      );

      Swal.fire({
        title: language === "ar" ? "تم الإرسال بنجاح!" : "Sent Successfully!",
        text:
          language === "ar"
            ? "شكراً لتواصلك، سأقوم بالرد عليك في أقرب وقت ممكن."
            : "Thanks for reaching out! I'll get back to you shortly.",
        icon: "success",
        confirmButtonColor: "#2563eb",
      });

      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
      Swal.fire({
        title: language === "ar" ? "تعذر الإرسال" : "Submission Failed",
        text:
          language === "ar"
            ? "يرجى المحاولة لاحقاً أو التواصل مباشرة عبر الواتساب أو البريد."
            : "Please try again later or contact me directly via WhatsApp or email.",
        icon: "error",
        confirmButtonColor: "#2563eb",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <section id="contact" dir={dir} className="py-24 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[130px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[130px] -z-10 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4 backdrop-blur-md">
            <Mail className="w-4 h-4 text-blue-500" />
            <span className="font-mono text-xs font-bold text-blue-500 uppercase tracking-widest">
              {t("contactBadge")}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-5 tracking-tight">
            {t("contactTitle")}{" "}
            <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-500 to-indigo-500 dark:from-white dark:to-blue-400">
              {t("contactTitleHighlight")}
            </span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            {t("contactDesc")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto items-start">
          {/* Contact Form */}
          <Card className="bg-card/60 dark:bg-card/40 border-black/5 dark:border-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-10 shadow-xl">
            <CardContent className="p-0">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {t("formNameLabel")}
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={language === "ar" ? "أحمد محمد" : "John Doe"}
                    className="h-12 rounded-xl bg-background/50 border-black/10 dark:border-white/10 focus-visible:ring-blue-500"
                  />
                  {errors.name && (
                    <p className="text-xs font-semibold text-rose-500">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {t("formEmailLabel")}
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    className="h-12 rounded-xl bg-background/50 border-black/10 dark:border-white/10 focus-visible:ring-blue-500"
                  />
                  {errors.email && (
                    <p className="text-xs font-semibold text-rose-500">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {t("formMessageLabel")}
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={
                      language === "ar"
                        ? "أخبرني عن مشروعك أو النظام الذي تود تطويره..."
                        : "Tell me about your project, platform requirements, or engineering needs..."
                    }
                    className="rounded-xl bg-background/50 border-black/10 dark:border-white/10 focus-visible:ring-blue-500 resize-none"
                  />
                  {errors.message && (
                    <p className="text-xs font-semibold text-rose-500">{errors.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition-all"
                >
                  {isSubmitting ? (
                    <span>{t("formSendingBtn")}</span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Send className="w-4 h-4" />
                      {t("formSubmitBtn")}
                    </span>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Quick Contact & Channels */}
          <div className="space-y-6">
            {/* Direct Email Card */}
            <Card className="bg-card/60 dark:bg-card/40 border-black/5 dark:border-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-xl hover:border-blue-500/30 transition-all group">
              <CardContent className="p-0 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:scale-105 transition-transform shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block mb-1">
                    {t("emailCardTitle")}
                  </span>
                  <a
                    href={`mailto:${professionalEmail}`}
                    className="text-base sm:text-lg font-black text-foreground hover:text-blue-500 transition-colors truncate block"
                  >
                    {professionalEmail}
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Direct WhatsApp Call to Action */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-6 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/15 hover:border-emerald-500/40 transition-all group shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/30 group-hover:scale-105 transition-transform shrink-0">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
                    {language === "ar" ? "تواصل مباشر وفوري" : "Instant Messaging"}
                  </span>
                  <span className="text-base sm:text-lg font-black text-foreground">
                    {t("whatsappBtn")}
                  </span>
                </div>
              </div>
              <Sparkles className="w-5 h-5 text-emerald-500 opacity-60 group-hover:opacity-100 transition-opacity" />
            </a>

            {/* Social Channels */}
            <Card className="bg-card/60 dark:bg-card/40 border-black/5 dark:border-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-xl">
              <CardContent className="p-0">
                <h3 className="text-base font-black text-foreground mb-4">
                  {t("onlinePresenceTitle")}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 hover:border-blue-500/40 hover:bg-blue-500/10 transition-all group"
                    >
                      <div className="w-8 h-8 rounded-xl bg-card flex items-center justify-center text-foreground group-hover:text-blue-500 transition-colors shadow-xs">
                        <link.icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-foreground group-hover:text-blue-500 transition-colors truncate">
                        {link.name}
                      </span>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
