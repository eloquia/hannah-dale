"use client";

import { MapGameImage } from '@/models/map.models';
import { MotionValue, motion, useScroll, useSpring, useTransform } from "framer-motion";
import { MouseEvent, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import Image, { StaticImageData } from "next/image";

import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.

import { useRouter } from 'next/navigation';
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

import belmontPark from '../../../public/chapter-3/belmont-park.jpeg'
import flowerFields from '../../../public/chapter-3/flower-fields.jpeg'
import breakfastRepublic from '../../../public/chapter-3/breakfast-republic.jpeg'
import joshuaTree from '../../../public/chapter-3/joshua-tree.jpeg'
import ring from '../../../public/chapter-3/ring.jpeg'
import { ISourceOptions } from '@tsparticles/engine';

const defaults = {
  spread: 360,
  ticks: 100,
  gravity: 0,
  decay: 0.94,
  startVelocity: 30,
  shapes: ["heart"],
  colors: ["FFC0CB", "FF69B4", "FF1493", "C71585"],
};

const texts = [
  "All throughout that time",
  "I asked you in the past many times.",
  "So I will ask you again,",
]

type ImageProps = {
  src: StaticImageData;
  alt: string;
  text: string;
}

const BELMONT_PARK: ImageProps = {
  src: belmontPark,
  alt: 'Belmont Park',
  text: '',
};

const FLOWER_FIELDS: ImageProps = {
  src: flowerFields,
  alt: 'Flower Fields',
  text: 'Will',
};

const BREAKFAST_REPUBLIC: ImageProps = {
  src: breakfastRepublic,
  alt: 'Breakfast Republic',
  text: 'You',
};

const JOSHUA_TREE: ImageProps = {
  src: joshuaTree,
  alt: 'Joshua Tree',
  text: 'Marry',
};

const RING: ImageProps = {
  src: ring,
  alt: 'Ring',
  text: "Me?",
};

const variants = {
  visible: {
    opacity: 1,
    x: 0,
  },
  hidden: {
    opacity: 0,
    x: -100,
  },
};

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

function SpecialImage({ src, alt, text }: { src: StaticImageData, alt: string, text: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 300);

  return (
    <section className="h-4/5 flex justify-content align-items relative snap-center my-64">
      <div ref={ref}>
        <Image src={src} alt={alt} style={{ width: '300px', height: 'auto' }} />
      </div>
      <motion.h2 style={{ y }} className="absolute right-8 text-4xl font-bold">{text}</motion.h2>
    </section>
  );
}

const offset = 50;

export default function Chapter3() {
  const { width, height } = useWindowSize()
  const router = useRouter();
  const { scrollYProgress } = useScroll();
  const [init, setInit] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      //await loadFull(engine);
      await loadSlim(engine);
      //await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options = useMemo(
    () => ({
      background: {
        color: {
          value: "#0d47a1",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#ffffff",
        },
        links: {
          color: "#ffffff",
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 6,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 80,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 5 },
        },
      },
      detectRetina: true,
    } as ISourceOptions),
    [],
  );

  const particlesLoaded = async (container: any) => {
    console.log(container);
  };

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: MouseEvent<Element>) => {
    // console.log(e)
    // if mouse is within 100 pixels of the button, move the button away
    if (buttonRef.current && buttonRef.current.contains(e.target as Node)) {
      // buttonRef.current.style.transform = 'transl
    }
  };

  const handleMouseOver = () => {
    console.log('mouse over')
   // move the button a random amount, at least 50 pixels away and up to 200 pixels away
    if (buttonRef.current) {
      buttonRef.current.style.transform = `translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px)`
      // disable button
      buttonRef.current.disabled = true
    }
  }

  const handleYes = () => {
    // router.push('/we-are-getting-married');
    setShowConfetti(true);
  }

  return (
    <main className="snap-y snap-mandatory min-w-screen px-16 flex justify-center items-center" onMouseMove={handleMouseMove}>
      <div className="flex flex-col justify-content items-center md:w-1/2">
        {[BELMONT_PARK, FLOWER_FIELDS, BREAKFAST_REPUBLIC, JOSHUA_TREE, RING].map((image, idx) => (
          <SpecialImage key={idx} src={image.src} alt={image.alt} text={image.text} />
        ))}

        <div className="mb-64">
          <video
            muted
            controls
            playsInline
            width="320"
            height="240"
            preload="none"
          >
            <source src="/chapter-3/wymm.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="relative min-h-screen py-64 w-1/2 flex justify-evenly items-center">
          {/* <button
            className="rounded-lg bg-red-400 py-2 px-4 text-gray-100 disabled:opacity-75 disabled:cursor-not-allowed"
            ref={buttonRef}
            onMouseOver={handleMouseOver}
          >
            No
          </button> */}
          <button
            className="rounded-lg bg-green-500 py-2 px-4 text-gray-100"
            onClick={handleYes}
          >
            Yes
          </button>
          {
            showConfetti && <div className='absolute -z-10 top-0 -left-32'>
              <Confetti
                width={width}
                height={height}
              />
            </div>
          }
        </div>
      </div>
    </main>
  );
}
