import { HeroConfig } from "./Hero";

export interface PageMeta {
    title: string;
    description: string;
    keywords?: string[];
    image?: string;
    twitterCard?: 'summary' | 'summary_large_image';
}

export const siteConfig = {
    name: "Sanket Singh",
    title: "Portfolio",
    description: "Personal Portfolio of Sanket Singh",
    url: process.env.NEXT_PUBLIC_URL || 'http://localhost:3000',
    image: '/meta/opengraph-image.webp',
    author: {
        name: 'Sanket Singh',
        twitter: "@SinghSanket78",
        github: "sanketsing01",
        linkedin: "sanket-singh-5359732b8",
        email: "vt118452@gmail.com"
    },
    keywords: [
        'portfolio',
        'developer',
        'full-stack',
        'react',
        'nextjs',
        'typescript',
        'web development',
        'sanket singh',
    ],
};


export const pageMetaData: Record<string, PageMeta> = {
    // Home Page
    '/': {
        title: `${siteConfig.name} - ${siteConfig.title}`,
        description: `${siteConfig.description} Explore my projects, experience, and technical expertise.`,
        keywords: [
            'portfolio',
            'developer',
            'full-stack',
            'web development',
            'projects',
        ],
        image: '/meta/hero.webp',
        twitterCard: 'summary_large_image',
    }
}

// Helper function to get metadata for a specific page
export function getPageMetadata(pathname: string): PageMeta {
    return pageMetaData[pathname] || pageMetaData['/'];
}

// Helper function to generate complete metadata object for Next.js
export function generateMetadata(pathname: string) {
    const pageMeta = getPageMetadata(pathname);

    return {
        metadataBase: new URL(siteConfig.url),
        title: pageMeta.title,
        description: pageMeta.description,
        keywords: pageMeta.keywords?.join(', '),
        authors: [{ name: siteConfig.author.name }],
        creator: siteConfig.author.name,
        openGraph: {
            type: 'website',
            url: `${siteConfig.url}${pathname}`,
            title: pageMeta.title,
            description: pageMeta.description,
            siteName: siteConfig.title,
            images: [
                {
                    url: pageMeta.image || siteConfig.image,
                    width: 1200,
                    height: 630,
                    alt: pageMeta.title,
                },
            ],
        },
        twitter: {
            card: pageMeta.twitterCard || 'summary_large_image',
            title: pageMeta.title,
            description: pageMeta.description,
            creator: siteConfig.author.twitter,
            images: [pageMeta.image || siteConfig.image],
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
        alternates: {
            canonical: `${siteConfig.url}${pathname}`,
        },
    };
}