import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaAngular } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import vnpayImg from "@/public/assets/images/vnpay.png";
import ymacauImg from "@/public/assets/images/ymacau.jpg";
import vnpayContractImg from "@/public/assets/images/vnpay-contract.png";

export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;

export const experiencesData = [
  {
    title: "Front-End Developer",
    location: "Powergate Software",
    description:
      "I worked as a front-end developer for 2 years in Mobile/Web application developer. I immediately found a job as a front-end developer.",
    icon: React.createElement(CgWorkAlt),
    date: "7/2018",
  },
  {
    title: "Full-Stack Developer",
    location: "Lisod",
    description:
      "I worked as a Full-Stack developer for 2 months.",
    icon: React.createElement(CgWorkAlt),
    date: "5/2020 - 7/2020",
  },
  {
    title: "Front-End Leader",
    location: "VIET NAM PAYMENT SOLUTION JOINT STOCK COMPANY",
    description:
      "I worked as a front-end developer for 2 years. I'm now a Front-End Leader working in VNPAY. My stack includes Angular, React, Next.js, TypeScript, Ant Design, Nestjs, Prisma and PostgreSql. I also upskilled to the full stack.",
    icon: React.createElement(FaAngular),
    date: "7/2020 - present",
  },
] as const;

export const projectsData = [
  {
    title: "vnpay.vn",
    description:
      "I worked as a full-stack developer on this project for 3 years. Website introduces VNPAY company and the services provided by this company.",
    tags: [
      "React",
      "Next.js",
      "Ant Design",
      "Nestjs",
      "PostgreSQL",
      "Docker",
      "K8S",
    ],
    imageUrl: vnpayImg,
  },
  {
    title: "VNPAY eContract",
    description:
      "Website VNPAY e-Contract using Micro Front-end structure and nx workspace",
    tags: ["Angular", "Nx Workspace", "Docker", "K8S"],
    imageUrl: vnpayContractImg,
  },
  {
    title: "Ymacau",
    description: `This is a white-label app project. Users can develop an application
      using available components in the system (layout, interface, data,
      ...) by the web platform. 
      `,
    tags: ["Ionic", "Angular"],
    imageUrl: ymacauImg,
  },
] as const;

export const skillsData = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "Angular",
  "React",
  "Next.js",
  "Node.js",
  "Nestjs",
  "Git",
  "Ant Design",
  "Prisma",
  "MongoDB",
  "Redux",
  "Express",
  "PostgreSQL",
] as const;
