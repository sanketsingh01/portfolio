export interface BlogFrontmatter {
    title: string;
    description: string;
    image: string;
    date: string;
    isPublished: boolean;
}

export interface BlogPost {
    slug: string;
    frontmatter: BlogFrontmatter;
    content: string;
}

export interface Blogs {
    slug: string;
    frontmatter: BlogFrontmatter;
}

export const blogs: Blogs[] = [
    {
        slug: "https://data-structure-and-algorithm.hashnode.dev/how-sometimes-100-lines-of-code-is-much-better-than-small-code",
        frontmatter: {
            title: "How Large code is better than Small Code",
            description: "How Sometimes 100 Lines of Code is much better than Small Code",
            image: "/blogs/blog1.webp",
            date: "2025-05-04",
            isPublished: true
        }
    },
    {
        slug: "https://instroduction-to-javascript.hashnode.dev/functions-building-blocks-of-javascript",
        frontmatter: {
            title: "Functions - Building Blocks of JavaScript",
            description: "All about the functions of JavaScript that a programmer should know!",
            image: "/blogs/blog2.webp",
            date: "2025-02-14",
            isPublished: true
        }
    }
]