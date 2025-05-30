export interface ImageConfig {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export interface ProjectItem {
  title: string;
  description: string;
  image: ImageConfig;
  link: string;
  technologies: string[];
}

export interface SkillItem {
  name: string;
  level: number;
  category: string;
}

export interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
}

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
}

export interface LandingConfig {
  intro: {
    name: string;
    title: string;
    description: string;
    image: ImageConfig;
  };
  about: {
    title: string;
    description: string;
    image: ImageConfig;
  };
  projects: {
    title: string;
    items: ProjectItem[];
  };
  skills: {
    title: string;
    items: SkillItem[];
  };
  experience: {
    title: string;
    items: ExperienceItem[];
  };
  contact: {
    title: string;
    description: string;
    email: string;
    social: SocialLinks;
  };
}

export const defaultLandingConfig: LandingConfig = {
  intro: {
    name: "Nguyen Van A",
    title: "Front-End Leader", 
    description: "I'm a passionate developer with experience in building modern web applications. I specialize in Angular, React, Next.js, and TypeScript.",
    image: {
      src: "/assets/images/profile.jpg",
      width: 400,
      height: 400,
      alt: "Profile picture"
    }
  },
  about: {
    title: "About Me",
    description: "I'm a software developer with a passion for creating beautiful and functional web applications. I specialize in Angular, React, Next.js, and TypeScript. I have experience in both front-end and back-end development.",
    image: {
      src: "/assets/images/about.jpg", 
      width: 600,
      height: 400,
      alt: "About section image"
    }
  },
  projects: {
    title: "My Projects",
    items: [
      {
        title: "vnpay.vn",
        description: "I worked as a full-stack developer on this project for 3 years. Website introduces VNPAY company and the services provided by this company.",
        image: {
          src: "/assets/images/vnpay.png",
          width: 800,
          height: 600,
          alt: "VNPAY website screenshot"
        },
        link: "https://vnpay.vn",
        technologies: ["React", "Next.js", "Ant Design", "Nestjs", "PostgreSQL", "Docker", "K8S"]
      },
      {
        title: "VNPAY eContract",
        description: "Website VNPAY e-Contract using Micro Front-end structure and nx workspace",
        image: {
          src: "/assets/images/vnpay-contract.png",
          width: 800,
          height: 600,
          alt: "VNPAY eContract screenshot"
        },
        link: "https://vnpaycontract.vn/app/auth",
        technologies: ["Angular", "Nx Workspace", "Docker", "K8S", "Micro Frontend"]
      },
      {
        title: "VNPAY eInvoice",
        description: "Website VNPAY e-Invoice using nx workspace. Admin site, Portal site, Web SDK for the VNPAY e-Invoice",
        image: {
          src: "/assets/images/vnpay-invoice.png",
          width: 800,
          height: 600,
          alt: "VNPAY eInvoice screenshot"
        },
        link: "https://vnpayinvoice.vn/auth/login",
        technologies: ["Angular", "Nx Workspace", "Docker", "K8S"]
      }
    ]
  },
  skills: {
    title: "My Skills",
    items: [
      {
        name: "HTML",
        level: 95,
        category: "Frontend"
      },
      {
        name: "CSS", 
        level: 90,
        category: "Frontend"
      },
      {
        name: "JavaScript",
        level: 95,
        category: "Frontend"
      },
      {
        name: "TypeScript",
        level: 90,
        category: "Frontend"
      },
      {
        name: "Angular",
        level: 95,
        category: "Frontend"
      },
      {
        name: "React",
        level: 90,
        category: "Frontend"
      },
      {
        name: "Next.js",
        level: 85,
        category: "Frontend"
      },
      {
        name: "Node.js",
        level: 85,
        category: "Backend"
      },
      {
        name: "Nestjs",
        level: 80,
        category: "Backend"
      },
      {
        name: "PostgreSQL",
        level: 80,
        category: "Database"
      }
    ]
  },
  experience: {
    title: "My Experience",
    items: [
      {
        title: "Front-End Leader",
        company: "VIET NAM PAYMENT SOLUTION JOINT STOCK COMPANY",
        period: "7/2020 - present",
        description: "I worked as a front-end developer for 2 years. I'm now a Front-End Leader working in VNPAY. My stack includes Angular, React, Next.js, TypeScript, Ant Design, Nestjs, Prisma and PostgreSql. I also upskilled to the full stack.",
        technologies: ["Angular", "React", "Next.js", "TypeScript", "Ant Design", "Nestjs", "Prisma", "PostgreSQL"]
      },
      {
        title: "Full-Stack Developer",
        company: "Lisod",
        period: "5/2020 - 7/2020",
        description: "I worked as a Full-Stack developer for 2 months.",
        technologies: ["React", "Node.js", "TypeScript"]
      },
      {
        title: "Front-End Developer",
        company: "Powergate Software",
        period: "7/2018",
        description: "I worked as a front-end developer for 2 years in Mobile/Web application developer. I immediately found a job as a front-end developer.",
        technologies: ["React", "JavaScript", "HTML", "CSS"]
      }
    ]
  },
  contact: {
    title: "Contact Me",
    description: "Feel free to reach out to me for any questions or opportunities.",
    email: "your.email@example.com",
    social: {
      github: "https://github.com/yourusername",
      linkedin: "https://linkedin.com/in/yourusername",
      twitter: "https://twitter.com/yourusername"
    }
  }
};