import NextJs from "@/components/technologies/NextJs";
import TailwindCss from "@/components/technologies/TailwindCss";
import TypeScript from "@/components/technologies/TypeScript";
import ReactIcon from "@/components/technologies/ReactIcon";
import Vercel from "@/components/technologies/Vercel";
import ExpressJs from "@/components/technologies/ExpressJs";
import Postman from "@/components/technologies/Postman";
export interface Technology {
    name: string;
    href: string;
    icon: React.ReactNode;
}

export interface Experience {
    company: string;
    position: string;
    location: string;
    image: string;
    description: string[];
    startDate: string;
    endDate: string;
    website: string;
    x?: string;
    linkedin?: string;
    github?: string;
    technologies: Technology[];
    isCurrent: boolean;
    isBlur?: boolean;
}

export const experiences: Experience[] = [
    {
        isCurrent: true,
        isBlur: false,
        company: 'Alter Dimensions Innovations',
        position: 'Frontend Developer',
        location: 'California, US (Remote)',
        image: '/assets/alter-dimension.webp',
        description: [
            'Architected and developed the complete frontend infrastructure for the platform, a comprehensive solution for creating and managing promotional campaigns.',
            'Led a comprehensive codebase refactoring initiative that improved maintainability, scalability, and development velocity across the entire platform.',
            'Integrated and optimized backend API connections, implementing efficient data fetching strategies and error handling mechanisms.',
            'Enhanced user experience and interface design through implementation of consistent design systems, accessibility standards, and performance optimizations.',
        ],
        startDate: 'December 2025',
        endDate: 'Present',
        technologies: [
            {
                name: 'Next.js',
                href: 'https://nextjs.org/',
                icon: <NextJs />,
            },
            {
                name: 'Tailwind CSS',
                href: 'https://tailwindcss.com/',
                icon: <TailwindCss />,
            },
            {
                name: 'TypeScript',
                href: 'https://typescriptlang.org/',
                icon: <TypeScript />,
            },
            {
                name: 'React',
                href: 'https://react.dev/',
                icon: <ReactIcon />,
            },

            {
                name: 'Vercel',
                href: 'https://vercel.com/',
                icon: <Vercel />,
            },
            {
                name: 'Express',
                href: 'https://expressjs.com/',
                icon: <ExpressJs />,
            },
            {
                name: 'Postman',
                href: 'https://www.postman.com/',
                icon: <Postman />,
            },
        ],
        website: '#',
        github: '#',
        x: '#'
    },
]