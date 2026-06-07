"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { galleryImages } from "@/data/images";
import { Reveal } from "@/components/ui/Reveal";
import { EASE } from "@/lib/motion";

export function Gallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const reduce = useReducedMotion();

  const close = useCallback(() => setOpenIndex(null), []);
  const next = useCallback(
    () =>
      setOpenIndex((i) => (i === null ? i : (i + 1) % galleryImages.length)),
    []
  );
  const prev = useCallback(
    () =>
      setOpenIndex((i) =>
        i === null ? i : (i - 1 + galleryImages.length) % galleryImages.length
      ),
    []
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex, close, next, prev]);

  return (
    <section id="galeria" className="bg-cream-deep py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="text-center">
          <p className="eyebrow eyebrow--center justify-center">Galeria</p>
          <h2 className="mt-5 font-display text-4xl sm:text-5xl md:text-6xl">
            Atmosfera i smak
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Zajrzyj do środka, zanim do nas wpadniesz.
          </p>
        </Reveal>

        <div className="mt-14 columns-2 gap-4 *:mb-4 md:columns-3 lg:columns-4">
          {galleryImages.map((img, i) => (
            <button
              key={img.alt}
              type="button"
              onClick={() => setOpenIndex(i)}
              className="group relative block w-full overflow-hidden rounded-xl break-inside-avoid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta"
              aria-label={`Powiększ zdjęcie: ${img.alt}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                placeholder="blur"
                sizes="(min-width: 1024px) 22vw, (min-width: 768px) 30vw, 45vw"
                className="h-auto w-full object-cover transition-transform duration-500 ease-out-soft group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-espresso/0 transition-colors duration-300 group-hover:bg-espresso/15" />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {openIndex !== null && (
          <motion.div
            className="fixed inset-0 z-60 flex items-center justify-center bg-espresso/95 p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.25 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Podgląd zdjęcia"
          >
            {/* Zamknij */}
            <button
              type="button"
              onClick={close}
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-cream/10 text-2xl text-cream transition-colors hover:bg-cream/20 sm:right-6 sm:top-6"
              aria-label="Zamknij"
            >
              ✕
            </button>

            {/* Poprzednie */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-3 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-cream/10 text-2xl text-cream transition-colors hover:bg-cream/20 sm:left-6"
              aria-label="Poprzednie zdjęcie"
            >
              ‹
            </button>

            <motion.div
              key={openIndex}
              className="relative max-h-[85vh] w-auto max-w-5xl"
              initial={{ scale: reduce ? 1 : 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.3, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={galleryImages[openIndex].src}
                alt={galleryImages[openIndex].alt}
                placeholder="blur"
                sizes="90vw"
                className="max-h-[85vh] w-auto rounded-lg object-contain"
              />
              <p className="mt-3 text-center text-sm text-cream/70">
                {galleryImages[openIndex].alt} · {openIndex + 1} /{" "}
                {galleryImages.length}
              </p>
            </motion.div>

            {/* Następne */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-3 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-cream/10 text-2xl text-cream transition-colors hover:bg-cream/20 sm:right-6"
              aria-label="Następne zdjęcie"
            >
              ›
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
