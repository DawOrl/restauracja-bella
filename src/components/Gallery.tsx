"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { galleryImages } from "@/data/images";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import { EASE } from "@/lib/motion";
import { isolate, lockScroll } from "@/lib/modal";

const noop = () => () => {};

/*
  Układ siatki: szeroka sala i składniki dostają więcej miejsca, pionowe
  detale węższe kolumny. Na telefonie dwie kolumny, poziome zdjęcia na całą szerokość.
*/
const layout = [
  "col-span-2 aspect-[3/2] lg:col-span-6 lg:aspect-auto lg:h-[30rem]",
  "aspect-[4/5] lg:col-span-3 lg:aspect-auto lg:h-[30rem]",
  "aspect-[4/5] lg:col-span-3 lg:aspect-auto lg:h-[30rem]",
  "aspect-[4/5] lg:col-span-3 lg:aspect-auto lg:h-[26rem]",
  // na telefonie składniki idą na koniec, żeby wino i deser stanęły w parze
  "order-last col-span-2 aspect-[3/2] lg:order-none lg:col-span-6 lg:aspect-auto lg:h-[26rem]",
  "aspect-[4/5] lg:col-span-3 lg:aspect-auto lg:h-[26rem]",
];
const sizes = [
  "(min-width: 1024px) 46vw, 92vw",
  "(min-width: 1024px) 23vw, 46vw",
  "(min-width: 1024px) 23vw, 46vw",
  "(min-width: 1024px) 23vw, 46vw",
  "(min-width: 1024px) 46vw, 92vw",
  "(min-width: 1024px) 23vw, 46vw",
];

export function Gallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  // portal do <body> dopiero po hydracji (na serwerze nie ma document)
  const mounted = useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );

  const close = useCallback(() => setOpenIndex(null), []);
  const next = useCallback(
    () =>
      setOpenIndex((i) => (i === null ? i : (i + 1) % galleryImages.length)),
    [],
  );
  const prev = useCallback(
    () =>
      setOpenIndex((i) =>
        i === null ? i : (i - 1 + galleryImages.length) % galleryImages.length,
      ),
    [],
  );

  const isOpen = openIndex !== null;
  // Podgląd siedzi w portalu bezpośrednio w <body>, więc cała reszta strony
  // może dostać `inert`: Tab krąży tylko po przyciskach podglądu. Po
  // zamknięciu fokus wraca na kliknięte zdjęcie (dopiero po zdjęciu inert).
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!isOpen || !dialog) return;
    const unlock = lockScroll();
    const restore = isolate(dialog);
    closeRef.current?.focus();
    return () => {
      restore();
      unlock();
      triggerRef.current?.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, close, next, prev]);

  return (
    <section
      id="galeria"
      className="relative bg-espresso py-24 text-cream sm:py-32"
    >
      <div className="mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12 xl:px-20">
        <Reveal className="grid items-end gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="kicker text-gold!">Galleria</p>
            <h2 className="mt-4 font-display text-[2.6rem] leading-[1.02] sm:text-6xl">
              Wieczór pod{" "}
              <span className="accent text-gold-soft">
                ceglanym sklepieniem
              </span>
            </h2>
          </div>
          <p className="max-w-[28rem] text-lg leading-relaxed text-cream/75 lg:col-span-5 lg:justify-self-end">
            Zajrzyj do środka, zanim do nas wpadniesz: sala, piec, kuchnia i to,
            co trafia na stół.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-12">
          {galleryImages.map((img, i) => (
            <button
              key={img.alt}
              type="button"
              onClick={(e) => {
                triggerRef.current = e.currentTarget;
                setOpenIndex(i);
              }}
              className={cn(
                "group relative block w-full overflow-hidden rounded-[0.6rem] bg-espresso-soft focus-visible:outline-gold",
                layout[i],
              )}
              aria-label={`Powiększ zdjęcie: ${img.alt}`}
            >
              <Image
                src={img.src}
                alt=""
                fill
                placeholder="blur"
                sizes={sizes[i]}
                className="object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.04]"
              />
            </button>
          ))}
        </div>
      </div>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {openIndex !== null && (
              <motion.div
                ref={dialogRef}
                className="fixed inset-0 z-60 flex items-center justify-center bg-[#140e0b]/95 p-4 sm:p-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduce ? 0 : 0.25 }}
                onClick={close}
                role="dialog"
                aria-modal="true"
                aria-label="Podgląd zdjęcia"
              >
                <button
                  ref={closeRef}
                  type="button"
                  onClick={close}
                  className="absolute right-3 top-3 z-10 flex h-12 w-12 items-center justify-center rounded-full text-cream transition-colors hover:bg-cream/10 sm:right-6 sm:top-6"
                  aria-label="Zamknij podgląd"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
                    <path
                      d="M4 4l12 12M16 4L4 16"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                  </svg>
                </button>

                <motion.figure
                  key={openIndex}
                  className="flex max-h-full w-full max-w-5xl flex-col items-center"
                  initial={{ opacity: 0, scale: reduce ? 1 : 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: reduce ? 0 : 0.35, ease: EASE }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Image
                    src={galleryImages[openIndex].src}
                    alt={galleryImages[openIndex].alt}
                    placeholder="blur"
                    sizes="(min-width: 1024px) 64rem, 100vw"
                    className="h-auto max-h-[78svh] w-auto max-w-full rounded-md object-contain"
                  />
                  <figcaption className="mt-4 flex w-full max-w-2xl items-center justify-between gap-4 text-sm text-cream/75">
                    <button
                      type="button"
                      onClick={prev}
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cream/25 text-cream transition-colors hover:bg-cream/10"
                      aria-label="Poprzednie zdjęcie"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        aria-hidden
                      >
                        <path
                          d="M11 3L5 9l6 6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                        />
                      </svg>
                    </button>
                    <span className="text-center">
                      {galleryImages[openIndex].alt}
                      <span className="ml-2 tabular-nums text-cream/50">
                        {openIndex + 1}/{galleryImages.length}
                      </span>
                    </span>
                    <button
                      type="button"
                      onClick={next}
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cream/25 text-cream transition-colors hover:bg-cream/10"
                      aria-label="Następne zdjęcie"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        aria-hidden
                      >
                        <path
                          d="M7 3l6 6-6 6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                        />
                      </svg>
                    </button>
                  </figcaption>
                </motion.figure>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </section>
  );
}
