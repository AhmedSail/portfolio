import { ArrowDown, Github, Linkedin, Twitter, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Hero = ({ profile }: { profile: any | null }) => {
  const scrollToProjects = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const name = profile?.name || "Ahmed Qompoz";
  const title = profile?.title || "Full Stack Web developer";
  const bio =
    profile?.bio ||
    "I craft beautiful, performant web applications with modern technologies. Passionate about clean code, great UX, and turning complex problems into elegant solutions.";
  const imageUrl =
    profile?.imageUrl ||
    "/Gemini_Generated_Image_vfoxzbvfoxzbvfox-removebg-preview-removebg-preview.png";

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Dynamic Squares Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="grid-background absolute inset-0 opacity-[0.05] dark:opacity-20" />
        <div className="dot-background absolute inset-0 opacity-[0.03] dark:opacity-10" />

        {/* Floating Decorative Squares */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`absolute border rounded-xl opacity-20 dark:opacity-40 ${
              i % 2 === 0 ? "animate-float" : "animate-float-reverse"
            } ${
              i % 3 === 0
                ? "border-blue-400/50 bg-blue-400/5 shadow-[0_0_15px_rgba(96,165,250,0.3)]"
                : "border-black/10 dark:border-white/20 bg-black/5 dark:bg-white/5 shadow-[0_0_15px_rgba(0,0,0,0.05)] dark:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
            }`}
            style={{
              width: `${Math.random() * 120 + 40}px`,
              height: `${Math.random() * 120 + 40}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 1.5}s`,
              animationDuration: `${Math.random() * 10 + 15}s`,
            }}
          />
        ))}
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow z-0" />
      <div
        className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-400/10 dark:bg-white/10 rounded-full blur-3xl animate-pulse-slow z-0"
        style={{ animationDelay: "2s" }}
      />

      <div className="container mx-auto px-6 relative z-10 mt-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 max-w-6xl mx-auto">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Available badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 animate-fade-in backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
              <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                Available for opportunities
              </span>
            </div>

            {/* Name with gradient */}
            <h1
              className="text-4xl sm:text-6xl md:text-8xl font-black mb-4 sm:mb-6 animate-fade-in tracking-tighter leading-tight"
              style={{ animationDelay: "0.1s" }}
            >
              Hi, I'm <br />
              <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-500 to-blue-300 dark:to-white">
                {name}
              </span>
            </h1>

            {/* Title */}
            <div
              className="mb-6 sm:mb-8 animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-muted-foreground tracking-tight">
                {title}
              </h2>
            </div>

            {/* Bio */}
            <p
              className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 mb-8 sm:mb-10 animate-fade-in leading-relaxed font-medium opacity-80"
              style={{ animationDelay: "0.3s" }}
            >
              {bio}
            </p>

            {/* CTA Buttons */}
            <div
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12 animate-fade-in w-full sm:w-auto"
              style={{ animationDelay: "0.4s" }}
            >
              <Button
                size="lg"
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-500/20 rounded-2xl px-10 h-16 text-lg font-bold transition-all hover:scale-105 active:scale-95"
                onClick={scrollToProjects}
              >
                View My Work
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 px-10 h-16 text-lg font-bold rounded-2xl backdrop-blur-sm transition-all hover:border-blue-500/50"
                onClick={scrollToContact}
              >
                Get In Touch
              </Button>
            </div>
          </div>

          {/* Image & Music Visualizer */}
          <div
            className="flex-1 relative animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96 mx-auto">
              {/* Music Bars Visualizer Around Image */}
              <div className="absolute inset-x-[-20%] bottom-[-10%] flex items-end justify-center gap-1.5 h-40 opacity-30 pointer-events-none">
                {[...Array(25)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1.5 rounded-full animate-music-bar bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                    style={{
                      animationDelay: `${i * 0.08}s`,
                      height: `${20 + Math.random() * 80}%`,
                      animationDuration: `${1.5 + Math.random()}s`,
                    }}
                  />
                ))}
              </div>

              {/* Main Image Container */}
              <div className="relative z-10 w-full h-full rounded-[2.5rem] p-1.5 bg-linear-to-b from-blue-400/20 to-transparent dark:from-blue-400/10 backdrop-blur-sm border border-black/5 dark:border-white/10 overflow-hidden shadow-2xl group transition-all duration-700 hover:rounded-[4rem]">
                <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <img
                  src={imageUrl}
                  alt={name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
              </div>

              {/* Float badge */}
              <div className="absolute -top-6 -right-6 p-5 bg-card/80 dark:bg-white/5 backdrop-blur-2xl rounded-3xl border border-black/5 dark:border-white/10 shadow-2xl animate-float z-20">
                <div className="flex flex-col items-center">
                  <div className="text-[10px] font-black uppercase text-blue-600 dark:text-blue-400 tracking-tighter">
                    Verified
                  </div>
                  <div className="w-10 h-0.5 bg-blue-500/30 dark:bg-blue-500/50 my-1.5 rounded-full" />
                  <div className="text-[10px] font-black uppercase text-foreground dark:text-white tracking-widest leading-none">
                    Developer
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links Updated */}
        <div
          className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-16 animate-fade-in max-w-6xl mx-auto"
          style={{ animationDelay: "0.5s" }}
        >
          {[
            { icon: Github, href: profile?.githubUrl, label: "GitHub" },
            { icon: Linkedin, href: profile?.linkedinUrl, label: "LinkedIn" },
            { icon: Twitter, href: profile?.twitterUrl, label: "Twitter" },
            {
              icon: FileText,
              href: profile?.resumeUrl,
              label: "Resume",
              download: true,
            },
          ]
            .filter((s) => s.href)
            .map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                download={social.download}
                className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-black/3 dark:bg-white/5 hover:bg-blue-600/10 border border-black/5 dark:border-white/10 hover:border-blue-500/50 transition-all duration-700 group relative shadow-sm"
              >
                <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-blue-500 transition-colors duration-500" />
              </a>
            ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
          <ArrowDown className="w-6 h-6 text-blue-500" />
        </div>
      </div>
    </section>
  );
};
