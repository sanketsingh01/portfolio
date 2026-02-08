import Container from "@/components/common/Container";
import { BlogCard } from "@/components/blog/BlogCard";
import { Separator } from "@/components/ui/separator";
import { Blogs, blogs } from "@/config/Blog";

export default function BlogsPage() {
    return (
        <Container className="py-16 px-2 bg-background">
            <div className="space-y-8">
                {/* Header */}
                <div className="space-y-4 text-center">
                    <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
                        Blogs
                    </h1>
                    <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
                        My blogs and work across different technologies and domains.
                    </p>
                </div>

                <Separator />

                {/* Blogs */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-semibold">
                            All Blogs
                            {blogs.length > 0 && (
                                <span className="text-muted-foreground ml-2 text-sm font-normal">
                                    ({blogs.length}{' '}
                                    {blogs.length === 1 ? 'blog' : 'blogs'})
                                </span>
                            )}
                        </h2>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                        {blogs.map((blog: Blogs) => (
                            <BlogCard key={blog.slug} post={blog} />
                        ))}
                    </div>
                </div>
            </div>
        </Container>
    );
}  