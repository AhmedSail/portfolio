"use client";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Contact } from "@/components/section/Contact";
import { Hero } from "@/components/section/Hero";
import { Projects } from "@/components/section/Projects";
import { Skills } from "@/components/section/Skills";

import { Button } from "@/components/ui/button";

const HomeView = ({
  projects,
  skills,
  profile,
}: {
  projects: any[];
  skills: any[];
  profile: any | null;
}) => {
  return (
    <div className="flex flex-col gap-0">
      <Header profile={profile} />
      <div className="min-h-screen bg-background">
        <main>
          <Hero profile={profile} />
          <Projects projects={projects} />
          <Skills skills={skills} />
          <Contact profile={profile} />
        </main>
      </div>
      <Footer profile={profile} />
    </div>
  );
};

export default HomeView;
