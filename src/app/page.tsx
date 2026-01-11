import Image from "next/image";
import Header from "@/components/landing/Header";
import Container from "@/components/common/Container";

export default function Home() {
  return (
    <Container className="min-h-screen py-10">
      <Header />
    </Container>
  );
}
