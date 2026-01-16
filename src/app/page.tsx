import Image from "next/image";
import Header from "@/components/landing/Header";
import Container from "@/components/common/Container";
import Hero from "@/components/landing/Hero";
import Experience from "@/components/landing/Experience";

export default function Home() {
  return (
    <Container className="min-h-screen px-4 mx:px-6 py-12 pb-24">
      <Header />
      <Hero />
      <Experience />
    </Container>
  );
}
