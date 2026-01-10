import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-white text-black flex-col justify-center items-center">
      Hello, world
      <Button variant={"default"}>Click me</Button>
    </div>
  );
}
