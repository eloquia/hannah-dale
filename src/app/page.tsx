"use client";

import Image from "next/image";
import { Hedvig_Letters_Serif, Dancing_Script, Fleur_De_Leah, Imperial_Script, Love_Light, Mea_Culpa, Lovers_Quarrel, Monsieur_La_Doulaise, Passions_Conflict } from 'next/font/google'
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from "framer-motion";

const hedvig = Hedvig_Letters_Serif({
  subsets: ['latin'],
  variable: '--font-hedvig-letters-serif',
})

const dancing = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-dancing-script',
})

const loversQuarrel = Lovers_Quarrel({
  subsets: ['latin'],
  variable: '--font-lovers-quarrel',
  weight: '400',
})

const laDoulaise = Monsieur_La_Doulaise({
  subsets: ['latin'],
  variable: '--font-monsieur-la-doulaise',
  weight: '400',
})

const passion = Passions_Conflict({
  subsets: ['latin'],
  variable: '--font-passions-conflict',
  weight: '400',
})

const imperial = Imperial_Script({
  subsets: ['latin'],
  variable: '--font-imperial-script',
  weight: '400',
})

const meaCulpa = Mea_Culpa({
  subsets: ['latin'],
  variable: '--font-mea-culpa',
  weight: '400',
})

const fleur = Fleur_De_Leah({
  subsets: ['latin'],
  variable: '--font-fleur-de-leah',
  weight: '400',
})

const loveLight = Love_Light({
  subsets: ['latin'],
  variable: '--font-love-light',
  weight: '400',
})

const FADED_GOLD = "#EBD3AF";
const OCEAN_STEEL = "#838461";

const DISPLAYED_IMAGES = [
  "/landing/landing-4.jpg",
  // "/landing/landing-3.jpg",
  // "/landing/landing-2.jpg",
]

export default function Home() {
  const router = useRouter();
  const [displayedBackgroundImageIdx, setDisplayedBackgroundImageIdx] = useState<number>(0);

  const handleNextBackgroundImage = () => {
    const nextIdx = displayedBackgroundImageIdx + 1;
    console.log(nextIdx);
    if (nextIdx < DISPLAYED_IMAGES.length) {
      setDisplayedBackgroundImageIdx(nextIdx);
    } else {
      router.push('/chapter-1');
    }
  };

  return (
    <AnimatePresence>
      <motion.main
        onClick={handleNextBackgroundImage}
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div
          className="hero min-h-screen"
          style={{
            backgroundImage: `url(${DISPLAYED_IMAGES[displayedBackgroundImageIdx]})`,
          }}
        >
          <div className="hero-overlay bg-opacity-10"></div>
          <div className="hero-content text-neutral-content">
            <div className="max-w-md">
              <div className="flex flex-col items-center gap-2 mb-64">
                <motion.h1
                  className={loveLight.className + " text-5xl text-[#838461]"}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ ease: "easeInOut", delay: 0.5 }}
                >
                  Hannah & Dale
                </motion.h1>
                <motion.h2
                  className="text-lg text-[#838461] mb-12"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ ease: "easeInOut", delay: 1 }}
                >
                  Denver - San Diego - ?
                </motion.h2>
              </div>
            </div>
          </div>
        </div>
      </motion.main>
    </AnimatePresence>
  );
}
