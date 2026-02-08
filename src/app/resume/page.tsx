import React from "react";
import Container from "@/components/common/Container";
import { Separator } from "@/components/ui/separator";
import { resumeConfig } from "@/config/Resume";

export default function ResumePage() {
    return (
        <Container className="py-16 px-2 bg-background">
            <div className="space-y-8">
                <div className="space-y-4 text-center">
                    <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
                        Resume
                    </h1>
                    <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
                        My resume.
                    </p>
                </div>
                <Separator />
                <div className="mx-auto max-w-2xl">
                    <iframe
                        src={resumeConfig.url}
                        className="min-h-screen w-full"
                    ></iframe>
                </div>
            </div>
        </Container>
    )
}