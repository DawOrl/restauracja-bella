"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { heroImage } from "@/data/images";
import { EASE } from "@/lib/motion";

export function Hero() {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduce ? 0 : 0.12, delayChildren: 0.1 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 26 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.8, ease: EASE },
    },
  };

  return (
    <section
      id="top"
      className="relative flex min-h-dvh items-center justify-center overflow-hidden"
    >
      {/* Tło */}
      <Image
        src={heroImage}
        alt="Wnętrze trattorii Bella Cucina o zmierzchu"
        fill
        priority
        placeholder="blur"
        sizes="100vw"
        className="object-cover"
      />
      {/* Warstwy przyciemnienia dla czytelności */}
      <div className="absolute inset-0 bg-linear-to-b from-espresso/70 via-espresso/45 to-espresso/80" />
      <div className="absolute inset-0 bg-linear-to-t from-espresso/60 to-transparent" />

      {/* Treść */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-4xl px-5 text-center text-cream sm:px-8"
      >
        <motion.p
          variants={item}
          className="eyebrow eyebrow--center text-gold-soft!"
        >
          Trattoria familijna · Kraków
        </motion.p>

        <motion.h1
          variants={item}
          className="mt-6 font-display text-5xl leading-[1.05] text-cream sm:text-6xl md:text-7xl lg:text-[5.5rem]"
        >
          Prawdziwa Italia
          <br />
          <span className="italic text-gold">na Twoim talerzu</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-cream/85 sm:text-lg"
        >
          Świeży makaron wyrabiany codziennie, pizza z pieca opalanego drewnem i
          wina prosto z Włoch — w sercu Krakowa od 1987 roku.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#rezerwacja"
            className="w-full rounded-full bg-terracotta px-8 py-4 text-base font-semibold text-cream shadow-lg transition-all duration-300 hover:bg-terracotta-dark hover:shadow-xl sm:w-auto"
          >
            Zarezerwuj stolik
          </a>
          <a
            href="#menu"
            className="w-full rounded-full border border-cream/40 px-8 py-4 text-base font-semibold text-cream backdrop-blur-sm transition-all duration-300 hover:border-cream hover:bg-cream/10 sm:w-auto"
          >
            Zobacz menu
          </a>
        </motion.div>
      </motion.div>

      {/* Wskaźnik scrolla */}
      <motion.a
        href="#o-nas"
        aria-label="Przewiń w dół"
        initial={{ opacity: 0 }}
        animate={{ opacity: reduce ? 1 : [0.4, 1, 0.4] }}
        transition={
          reduce ? undefined : { repeat: Infinity, duration: 2.2, ease: "easeInOut" }
        }
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-cream/80"
      >
        <span className="flex h-10 w-6 items-start justify-center rounded-full border border-cream/50 p-1.5">
          <span className="h-2 w-1 rounded-full bg-cream/80" />
        </span>
      </motion.a>
    </section>
  );
}
