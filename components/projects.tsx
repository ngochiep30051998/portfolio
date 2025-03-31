"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { BsGithub, BsArrowUpRightSquare } from "react-icons/bs";
import SectionHeading from "./section-heading";
import { useSectionInView } from "@/lib/hooks";
import type { LandingConfig } from "@/lib/config/landing";
import Project from "./project";

interface ProjectsProps {
  config: LandingConfig['projects'];
}

export default function Projects({ config }: ProjectsProps) {
  const { ref } = useSectionInView("Projects", 0.5);

  return (
    <section ref={ref} id="projects" className="scroll-mt-28 mb-28">
      <SectionHeading>My projects</SectionHeading>
      <div>
        {config.items.map((project, index) => (
          <React.Fragment key={index}>
            <Project 
              title={project.title}
              description={project.description}
              tags={project.technologies}
              imageUrl={project.image.src}
              url={project.link}
            />
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
