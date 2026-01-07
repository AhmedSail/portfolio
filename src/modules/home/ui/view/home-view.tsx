"use client";
import dynamic from "next/dynamic";
import { Header } from "@/components/Header";
import { Hero } from "@/components/section/Hero";

const Projects = dynamic(() =>
  import("@/components/section/Projects").then((mod) => mod.Projects)
);
const Skills = dynamic(() =>
  import("@/components/section/Skills").then((mod) => mod.Skills)
);
const Contact = dynamic(() =>
  import("@/components/section/Contact").then((mod) => mod.Contact)
);
const Footer = dynamic(() =>
  import("@/components/Footer").then((mod) => mod.Footer)
);

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
