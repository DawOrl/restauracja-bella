/**
 * Statyczne importy zdjęć — Next.js automatycznie wylicza width/height
 * i generuje blurDataURL (placeholder="blur").
 *
 * Źródło: Pexels (licencja darmowa, bez wymaganej atrybucji).
 * Pliki w `src/images/` (klimat/galeria) oraz `src/images/menu/` (pozycje menu).
 */
import type { StaticImageData } from "next/image";

import hero from "@/images/hero.jpg";
import about from "@/images/about.jpg";

import dishPasta from "@/images/dish-pasta.jpg";
import dishPizza from "@/images/dish-pizza.jpg";

import gWineInterior from "@/images/g-wine-interior.jpg";
import gTable from "@/images/g-table.jpg";
import gBolognese from "@/images/g-bolognese.jpg";
import gPizzaOven from "@/images/g-pizza-oven.jpg";
import gBruschetta from "@/images/g-bruschetta.jpg";
import gCharcuterie from "@/images/g-charcuterie.jpg";
import gCannoli from "@/images/g-cannoli.jpg";
import gRedwine from "@/images/g-redwine.jpg";
import gAperol from "@/images/g-aperol.jpg";
import gIngredients from "@/images/g-ingredients.jpg";
import gDough from "@/images/g-dough.jpg";
import gTiramisu from "@/images/g-tiramisu.jpg";

// --- Zdjęcia poszczególnych pozycji menu (klucz = MenuItem.id) ---
import mBruschette from "@/images/menu/bruschette.jpg";
import mBurrata from "@/images/menu/burrata.jpg";
import mTagliere from "@/images/menu/tagliere.jpg";
import mVitello from "@/images/menu/vitello.jpg";
import mCaprese from "@/images/menu/caprese.jpg";
import mCarbonara from "@/images/menu/carbonara.jpg";
import mTagliatelleRagu from "@/images/menu/tagliatelle-ragu.jpg";
import mCacioPepe from "@/images/menu/cacio-pepe.jpg";
import mRavioli from "@/images/menu/ravioli.jpg";
import mFrutti from "@/images/menu/frutti.jpg";
import mMargherita from "@/images/menu/margherita.jpg";
import mDiavola from "@/images/menu/diavola.jpg";
import mQuattro from "@/images/menu/quattro.jpg";
import mProsciutto from "@/images/menu/prosciutto.jpg";
import mOrtolana from "@/images/menu/ortolana.jpg";
import mOssobuco from "@/images/menu/ossobuco.jpg";
import mBranzino from "@/images/menu/branzino.jpg";
import mPollo from "@/images/menu/pollo.jpg";
import mMelanzane from "@/images/menu/melanzane.jpg";
import mTiramisu from "@/images/menu/tiramisu.jpg";
import mPannacotta from "@/images/menu/pannacotta.jpg";
import mCannoli from "@/images/menu/cannoli.jpg";
import mGelato from "@/images/menu/gelato.jpg";
import mVinoRosso from "@/images/menu/vino-rosso.jpg";
import mChianti from "@/images/menu/chianti.jpg";
import mAperol from "@/images/menu/aperol.jpg";
import mNegroni from "@/images/menu/negroni.jpg";
import mEspresso from "@/images/menu/espresso.jpg";
import mAcqua from "@/images/menu/acqua.jpg";

export const heroImage: StaticImageData = hero;
export const aboutImage: StaticImageData = about;

/** Zdjęcia dań w menu — klucz odpowiada `MenuItem.id`. */
export const menuImages: Record<string, StaticImageData> = {
  bruschette: mBruschette,
  burrata: mBurrata,
  tagliere: mTagliere,
  vitello: mVitello,
  caprese: mCaprese,
  carbonara: mCarbonara,
  "tagliatelle-ragu": mTagliatelleRagu,
  "cacio-pepe": mCacioPepe,
  ravioli: mRavioli,
  frutti: mFrutti,
  margherita: mMargherita,
  diavola: mDiavola,
  quattro: mQuattro,
  prosciutto: mProsciutto,
  ortolana: mOrtolana,
  ossobuco: mOssobuco,
  branzino: mBranzino,
  pollo: mPollo,
  melanzane: mMelanzane,
  tiramisu: mTiramisu,
  pannacotta: mPannacotta,
  cannoli: mCannoli,
  gelato: mGelato,
  "vino-rosso": mVinoRosso,
  chianti: mChianti,
  aperol: mAperol,
  negroni: mNegroni,
  espresso: mEspresso,
  acqua: mAcqua,
};

export type GalleryImage = { src: StaticImageData; alt: string };

export const galleryImages: GalleryImage[] = [
  { src: gWineInterior, alt: "Kieliszki wina w eleganckim wnętrzu trattorii" },
  { src: gBolognese, alt: "Spaghetti bolognese z natką pietruszki" },
  { src: gPizzaOven, alt: "Pizza margherita w piecu opalanym drewnem" },
  { src: gTable, alt: "Pięknie nakryty stół ze świecami" },
  { src: gBruschetta, alt: "Bruschetta z pomidorami, oliwkami i bazylią" },
  { src: gTiramisu, alt: "Klasyczne tiramisù posypane kakao" },
  { src: gCharcuterie, alt: "Deska włoskich wędlin i serów" },
  { src: gRedwine, alt: "Kieliszek czerwonego wina przy stoliku" },
  { src: gDough, alt: "Wyrabianie świeżego ciasta na makaron" },
  { src: gCannoli, alt: "Sycylijskie cannoli z kremem ricotta" },
  { src: gAperol, alt: "Aperol Spritz — włoskie aperitivo" },
  { src: gIngredients, alt: "Pomidory i oliwa z oliwek — świeże składniki" },
];

/** Zdjęcia do danych strukturalnych / SEO (kolejność = priorytet). */
export const seoImages: GalleryImage[] = [
  { src: hero, alt: "Wnętrze trattorii Bella Cucina" },
  { src: dishPasta, alt: "Świeży makaron" },
  { src: dishPizza, alt: "Pizza z pieca opalanego drewnem" },
];
