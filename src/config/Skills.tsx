import { ReactNode } from "react";

import AWS from "@/components/technologies/AWS";
import Docker from "@/components/technologies/Docker";
import BootStrap from "@/components/technologies/BootStrap";
import Bun from "@/components/technologies/Bun";
import NPM from "@/components/technologies/NPM";
import Html from "@/components/technologies/Html";
import CSS from "@/components/technologies/CSS";
import ExpressJs from "@/components/technologies/ExpressJs";
import JavaScript from "@/components/technologies/JavaScript";
import Cpp from "@/components/technologies/Cpp";
import Python from "@/components/technologies/Python";
import MongoDB from "@/components/technologies/MongoDB";
import Motion from "@/components/technologies/Motion";
import NextJs from "@/components/technologies/NextJs";
import Netlify from "@/components/technologies/Netlify";
import NodeJs from "@/components/technologies/NodeJs";
import PostgreSQL from "@/components/technologies/PostgreSQL";
import Prisma from "@/components/technologies/Prisma";
import Postman from "@/components/technologies/Postman";
import ReactIcon from "@/components/technologies/ReactIcon";
import TailwindCss from "@/components/technologies/TailwindCss";
import TypeScript from "@/components/technologies/TypeScript";
import Vercel from "@/components/technologies/Vercel";
import Shadcn from "@/components/technologies/Shadcn";

export type SkillItem = {
    name: string;
    icon: ReactNode;
};

export const skillsConfig: SkillItem[] = [
    {
        name: "HTML",
        icon: <Html />
    },
    {
        name: "CSS",
        icon: <CSS />
    },
    {
        name: "JavaScript",
        icon: <JavaScript />
    },
    {
        name: "TypeScript",
        icon: <TypeScript />
    },
    {
        name: "C/C++",
        icon: <Cpp />
    },
    {
        name: "Python",
        icon: <Python />
    },
    {
        name: "React",
        icon: <ReactIcon />
    },
    {
        name: "Next.js",
        icon: <NextJs />
    },
    {
        name: "Tailwind CSS",
        icon: <TailwindCss />
    },
    {
        name: "Bootstrap",
        icon: <BootStrap />
    },
    {
        name: "AWS",
        icon: <AWS />
    },
    {
        name: "Docker",
        icon: <Docker />
    },
    {
        name: "Node.js",
        icon: <NodeJs />
    },
    {
        name: "Express.js",
        icon: <ExpressJs />
    },
    {
        name: "MongoDB",
        icon: <MongoDB />
    },
    {
        name: "PostgreSQL",
        icon: <PostgreSQL />
    },
    {
        name: "Prisma",
        icon: <Prisma />
    },
    {
        name: "Postman",
        icon: <Postman />
    },
    {
        name: "Vercel",
        icon: <Vercel />
    },
    {
        name: "Netlify",
        icon: <Netlify />
    },
    {
        name: "Bun",
        icon: <Bun />
    },
    {
        name: "npm",
        icon: <NPM />
    },
    {
        name: "Framer Motion",
        icon: <Motion />
    },
    {
        name: "Shadcn UI",
        icon: <Shadcn />
    }
]