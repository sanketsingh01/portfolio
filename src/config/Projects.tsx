import JavaScript from "@/components/technologies/JavaScript";
import ReactIcon from "@/components/technologies/ReactIcon";
import TailwindCss from "@/components/technologies/TailwindCss";
import NodeJs from "@/components/technologies/NodeJs";
import Prisma from "@/components/technologies/Prisma";
import PostgreSQL from "@/components/technologies/PostgreSQL";
import Vercel from "@/components/technologies/Vercel";

export interface Technology {
    name: string;
    icon: React.ReactNode;
}

export interface Projects {
    name: string;
    description: string;
    image: string;
    gitHub?: string;
    liveLink?: string;
    technologies: Technology[];
    isCompleted: boolean;
}

export const projects: Projects[] = [
    {
        name: "CodeLeap",
        description: "Codeleap is an DSA problem solving platform where you can solve many leetcode premium problems for 1/4th price of leetcode.",
        image: '/projects/project1.webp',
        isCompleted: false,
        gitHub: 'https://github.com/sanketsingh01/CodeLeap',
        liveLink: 'https://www.codeleap.in/',
        technologies: [
            {
                name: "JavaScript",
                icon: <JavaScript />,
            },
            {
                name: "React",
                icon: <ReactIcon />,
            },
            {
                name: "Tailwind CSS",
                icon: <TailwindCss />,
            },
            {
                name: "NodeJs",
                icon: <NodeJs />,
            },
            {
                name: "Prisma",
                icon: <Prisma />,
            },
            {
                name: "PostgreSQL",
                icon: <PostgreSQL />,
            },
            {
                name: "Vercel",
                icon: <Vercel />,
            },
        ]
    },
    {
        name: "Chaiteam",
        description: "ChaiTeam is a collaborative web project built for Chaicode cohort to streamline team coordination, task management, and knowledge sharing.",
        image: '/projects/project2.webp',
        isCompleted: true,
        gitHub: 'https://github.com/sanketsingh01/CodeLeap',
        liveLink: 'https://www.chaiteam.in/',
        technologies: [
            {
                name: "JavaScript",
                icon: <JavaScript />,
            },
            {
                name: "React",
                icon: <ReactIcon />,
            },
            {
                name: "Tailwind CSS",
                icon: <TailwindCss />,
            },
            {
                name: "NodeJs",
                icon: <NodeJs />,
            },
            {
                name: "Prisma",
                icon: <Prisma />,
            },
            {
                name: "PostgreSQL",
                icon: <PostgreSQL />,
            },
            {
                name: "Vercel",
                icon: <Vercel />,
            },
        ]
    },
]