import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { MenuSection } from "@/components/MenuSection";
import { Gallery } from "@/components/Gallery";
import { Contact } from "@/components/Contact";
import { Reservation } from "@/components/Reservation";
import { Footer } from "@/components/Footer";
import { MobileBar } from "@/components/MobileBar";
import { buildRestaurantJsonLd, jsonLdScript } from "@/lib/schema";
import { restaurant } from "@/data/restaurant";
import { seoImages } from "@/data/images";

export default function Home() {
  const imageUrls = seoImages.map((img) =>
    new URL(img.src, restaurant.siteUrl).toString(),
  );
  const jsonLd = buildRestaurantJsonLd(imageUrls);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }}
      />
      <Header />
      {/* Kolejność jak wieczór w trattorii: kto gotuje, co jemy, jak tu jest,
          gdzie to jest, a na koniec rezerwacja, która przechodzi w stopkę. */}
      <main id="tresc" className="bg-grain">
        <Hero />
        <About />
        <MenuSection />
        <Gallery />
        <Contact />
        <Reservation />
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}
