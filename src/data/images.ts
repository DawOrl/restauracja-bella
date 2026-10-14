/**
 * Statyczne importy zdjęć: Next.js sam wylicza width/height i generuje
 * blurDataURL (placeholder="blur").
 *
 * Jedna seria (fal.ai, nano-banana): ciepłe światło żarówek i świec, ciemny
 * orzech, len, kremowa kamionka, lekkie ziarno filmu. Makaron 3D to render
 * z Blendera (scripts/blender/pasta_still_life.py).
 */
import type { StaticImageData } from "next/image";

import hero from "@/images/hero.webp";
import kuchniaMakaron from "@/images/kuchnia-makaron.webp";
import makaron3d from "@/images/makaron-3d.webp";

import menuAntipasti from "@/images/menu-antipasti.webp";
import menuPasta from "@/images/menu-pasta.webp";
import menuPizza from "@/images/menu-pizza.webp";
import menuSecondi from "@/images/menu-secondi.webp";
import menuDolci from "@/images/menu-dolci.webp";
import menuBevande from "@/images/menu-bevande.webp";

import galeriaSala from "@/images/galeria-sala.webp";
import galeriaPiec from "@/images/galeria-piec.webp";
import galeriaKuchnia from "@/images/galeria-kuchnia.webp";
import galeriaWino from "@/images/galeria-wino.webp";
import galeriaSkladniki from "@/images/galeria-skladniki.webp";
import galeriaDeser from "@/images/galeria-deser.webp";

export type Photo = { src: StaticImageData; alt: string };

export const heroImage: Photo = {
  src: hero,
  alt: "Stolik nakryty na wieczór pod ceglanym sklepieniem: tagliatelle al ragù, focaccia z rozmarynem, oliwki, czerwone wino i świeca",
};

export const aboutImage: Photo = {
  src: kuchniaMakaron,
  alt: "Gniazda świeżo pokrojonego makaronu tagliatelle, wałek i kopczyk mąki z żółtkami na drewnianym blacie",
};

/** Martwa natura z makaronu (render 3D), dekoracja nagłówka karty. */
export const pastaRender: StaticImageData = makaron3d;

/** Jedno zdjęcie na kategorię karty (klucz = `MenuCategory.id`). */
export const menuCategoryImages: Record<string, Photo> = {
  antipasti: {
    src: menuAntipasti,
    alt: "Burrata z pomidorami, bazylią i oliwą, obok grzanki z chleba na zakwasie",
  },
  pasta: {
    src: menuPasta,
    alt: "Spaghetti alla carbonara z chrupiącym guanciale i świeżo mielonym pieprzem",
  },
  pizza: {
    src: menuPizza,
    alt: "Pizza margherita z pieca opalanego drewnem na drewnianej desce",
  },
  secondi: {
    src: menuSecondi,
    alt: "Ossobuco na szafranowym risotto z gremolatą",
  },
  dolci: {
    src: menuDolci,
    alt: "Porcja tiramisù posypana kakao, w tle filiżanka espresso",
  },
  bevande: {
    src: menuBevande,
    alt: "Karafka czerwonego wina domowego, kieliszek wina i negroni z oliwkami",
  },
};

/** Galeria: kolejność = kolejność w siatce i w podglądzie. */
export const galleryImages: Photo[] = [
  {
    src: galeriaSala,
    alt: "Sala pod ceglanym sklepieniem wieczorem, nakryte stoliki i świece",
  },
  {
    src: galeriaPiec,
    alt: "Pizza w piecu opalanym drewnem, w głębi płonące polana",
  },
  {
    src: galeriaKuchnia,
    alt: "Ragù na kuchence, miedziane rondle i stos talerzy",
  },
  {
    src: galeriaWino,
    alt: "Butelki wina w drewnianym regale wpuszczonym w ceglaną ścianę, przed nimi świeca",
  },
  {
    src: galeriaSkladniki,
    alt: "Pomidory San Marzano, bazylia, czosnek, oliwa i kawałek parmezanu na lnianej ściereczce",
  },
  {
    src: galeriaDeser,
    alt: "Espresso, dwa cannoli z pistacjami i kieliszek limoncello na koniec kolacji",
  },
];

/** Zdjęcia do danych strukturalnych / SEO (kolejność = priorytet). */
export const seoImages: StaticImageData[] = [
  hero,
  menuPasta,
  menuPizza,
  galeriaSala,
];
