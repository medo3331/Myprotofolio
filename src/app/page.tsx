import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { SectionGrid } from "@/components/sections/SectionGrid";
import { getSite, getSections } from "@/lib/content";

export default function Home() {
  const site = getSite();
  const sections = getSections();

  return (
    <>
      <Navbar handle={site.handle} />
      <main>
        <Hero site={site} />
        <SectionGrid sections={sections} />
      </main>
      <Footer name={site.name} />
    </>
  );
}
