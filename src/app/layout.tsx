import { ViewTransitions } from "next-view-transitions"
import { ThemeProvider } from "@/components/common/ThemeProviders";
import ReactLenis from "lenis/react";

import ScrollToTop from "@/components/common/ScrollToTop";
import { generateMetadata as getMetadata } from "@/config/Meta";
import Footer from "@/components/landing/Footer";
import Navbar from "@/components/landing/Navbar";
import "./globals.css";

export const metadata = getMetadata("/");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <body
          className="font-parkinsans antialiased min-h-screen"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(0, 0, 0, 0.2) 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
            backgroundPosition: "0 0",
          }}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <ReactLenis root>
              <div className="min-h-screen flex flex-col pb-12">
                <ScrollToTop />
                <Navbar />
                {children}
                <Footer />
              </div>
            </ReactLenis>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
