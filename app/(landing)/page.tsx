import React from "react";
import About from "@/components/about";
import Contact from "@/components/contact";
import Experience from "@/components/experience";
import Intro from "@/components/intro";
import Projects from "@/components/projects";
import SectionDivider from "@/components/section-divider";
import Skills from "@/components/skills";
import { getLandingConfig } from "@/services/api/landing.server";

export default async function Home() {
  const config = await getLandingConfig();
  return (
    <main className="flex flex-col items-center px-4">
      <Intro config={config.intro} contact={config.contact} />
      <SectionDivider />
      <About config={config.about} />
      <Projects config={config.projects} />
      <Skills config={config.skills} />
      <Experience config={config.experience} />
      <Contact config={config.contact} />
    </main>
  );
}
