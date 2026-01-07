import {
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  Heart,
} from "lucide-react";

export const Footer = ({ profile }: { profile: any | null }) => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: profile?.githubUrl, color: "hover:text-blue-400" },
    {
      icon: Linkedin,
      href: profile?.linkedinUrl,
      color: "hover:text-blue-400",
    },
    { icon: Twitter, href: profile?.twitterUrl, color: "hover:text-blue-400" },
    {
      icon: Instagram,
      href: profile?.instagramUrl,
      color: "hover:text-pink-400",
    },
    {
      icon: Facebook,
      href: profile?.facebookUrl,
      color: "hover:text-blue-500",
    },
  ].filter((link) => link.href);

  return (
    <footer className="py-12 border-t border-black/5 dark:border-white/5 bg-background/50 backdrop-blur-md">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-black text-white text-xs shadow-lg shadow-blue-500/20">
                {profile?.name ? profile.name[0] : "A"}
              </div>
              <span className="font-black tracking-tighter text-lg bg-clip-text text-transparent bg-linear-to-r from-blue-600 dark:from-blue-400 to-blue-400 dark:to-white">
                {profile?.name || "Ahmed Qompoz"}
              </span>
            </div>
            <p className="text-sm text-muted-foreground font-medium">
              © {currentYear} • Built with{" "}
              <Heart className="w-3 h-3 inline text-red-500 animate-pulse" /> by{" "}
              {profile?.name || "Ahmed Qompoz"}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-muted-foreground transition-all hover:scale-110 ${link.color} hover:border-blue-500/50 hover:text-blue-500 dark:hover:text-blue-400 shadow-sm`}
              >
                <link.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
