import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { MenuSection } from "@/components/MenuSection";
import { Gallery } from "@/components/Gallery";
import { Reservation } from "@/components/Reservation";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { buildRestaurantJsonLd, jsonLdScript } from "@/lib/schema";
import { restaurant } from "@/data/restaurant";
import { seoImages } from "@/data/images";

export default function Home() {
  const imageUrls = seoImages.map((img) =>
    new URL(img.src.src, restaurant.siteUrl).toString()
  );
  const jsonLd = buildRestaurantJsonLd(imageUrls);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }}
      />
      <Header />
      <main>
        <Hero />
        <About />
        <MenuSection />
        <Gallery />
        <Reservation />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
