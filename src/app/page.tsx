import Footer from "@/components/Footer";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="p-10 flex-grow">
        <Hero />
      </div>
      <div className="px-10 bg-[#ebf3e7]">
        <Footer />
      </div>
    </div>
  );
}
