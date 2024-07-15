"use client";

import { Love_Light } from 'next/font/google'
import { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/navigation';
import { AnimatePresence, PanInfo, motion, useAnimationControls, useDragControls } from "framer-motion";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

import backgroundImage from '../../public/landing/landing-4.jpg';

gsap.registerPlugin(useGSAP, MotionPathPlugin);

const loveLight = Love_Light({
  subsets: ['latin'],
  variable: '--font-love-light',
  weight: '400',
})

const FADED_GOLD = "#EBD3AF";
const OCEAN_STEEL = "#838461";
const OCEAN_STEEL_DARKER = "#0d0d0a";

const DISPLAYED_IMAGES = [
  "/landing/landing-4.jpg"
]

const planeInitialTransition = { duration: 4, ease: "easeInOut" };

export default function Home() {
  const router = useRouter();
  const [displayedBackgroundImageIdx, setDisplayedBackgroundImageIdx] = useState<number>(0);
  const constraintsRef = useRef(null)
  const dragControls = useDragControls()
  const animationControls = useAnimationControls()
  const globeRef = useRef<SVGSVGElement | null>(null);
  const planeRef = useRef<HTMLDivElement | null>(null);
  const [planeRect, setPlaneRect] = useState<DOMRect>({} as DOMRect);
  const [globeRect, setGlobeRect] = useState<DOMRect>({} as DOMRect);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    window.addEventListener("resize", updatePosition);
    // updatePosition();

    // animationControls.start({
    //   opacity: 1,
    //   // y: 20,
    //   transition: planeInitialTransition,
    // }, {
    //   // delay: 2.5,
    //   ease: "easeInOut",
    // });

    setGlobeRect(globeRef.current?.getBoundingClientRect() as DOMRect);
    setPlaneRect(planeRef.current?.getBoundingClientRect() as DOMRect);
  }, []);

  useGSAP(() => {
    gsap.to(planeRef.current, {
      duration: 4,
      ease: "easeInOut",
      delay: 1.75,
      opacity: 1,
      motionPath: {
        path: "#heart-path",
        align: "#heart-path",
        autoRotate: true,
        // alignOrigin: [0.5, 0.5]
      },
      onComplete: () => {
        animationControls.start({
          opacity: 1,
        });
      },
    });
  });

  useEffect(() => {
    // figure out if plane and globe are overlapped

    if (!planeRect || !globeRect) return;

    // console.log({ planeRect, globeRect });

    if (
      planeRect.x < globeRect.x + globeRect.width &&
      planeRect.x + planeRect.width > globeRect.x &&
      planeRect.y < globeRect.y + globeRect.height &&
      planeRect.y + planeRect.height > globeRect.y
    ) {
      router.push('/chapter-1');
    }
  }, [planeRect, globeRect, router]);

  const updatePosition = () => {
    const rect = planeRef.current?.getBoundingClientRect();
    // console.log('updatePosition', rect);
    setPlaneRect(rect as DOMRect);
  };

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // convert cartesian x, y coordinates to degrees

    const { x, y } = info.offset;
    const { width, height } = planeRect;
    const centerX = width / 2;
    const centerY = height / 2;
    const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);

    animationControls.set({
      rotate: angle
    })
  }

  return (
    <AnimatePresence>
      <motion.main
        key="landing-page"
        ref={constraintsRef}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0, x:100 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div
          className="hero min-h-screen min-w-screen"
          style={{
            backgroundImage: `url(${backgroundImage.src})`
          }}
        >
          <div className="hero-overlay bg-opacity-10 z-10">
            <div className="relative flex items-center justify-center h-screen">
              <svg xmlns="http://www.w3.org/2000/svg" height="50vh" width="50vw" viewBox="0 0 200 200">
                <motion.path
                  id="heart-path"
                  d="M100,60 Q100,0 150,0 T200,60 Q200,100 150,140 T100,200 Q100,180 50,140 T0,60 Q0,0 50,0 T100,60 Z"
                  fill="transparent"
                  strokeWidth="0"
                  stroke="rgba(255, 255, 255, 0.69)"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={planeInitialTransition}
                />
              </svg>
              <motion.div
                // id="landing-plane"
                key="landing-plane"
                ref={planeRef}
                className='absolute'
                drag
                onDrag={handleDrag}
                dragConstraints={constraintsRef}
                dragMomentum={false}
                dragControls={dragControls}
                // whileDrag={{ scale: 1.1 }}
                // whileHover={{ scale: 1.1 }}
                initial={{ opacity: 0 }}
                animate={animationControls}
                onDragEnd={updatePosition}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 text-[#0d0d0a]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                  />
                </svg>
              </motion.div>
            </div>
          </div>
          <div className="hero-content text-neutral-content">
            <div className="max-w-md">
              <div className="flex flex-col items-center gap-2 mb-64">
                <div className="h1-header flex flex-row gap-2">
                  <motion.h1
                    key="landing-h1-1"
                    className={loveLight.className + " text-5xl text-[#838461]"}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ ease: "easeInOut", delay: 0.5 }}
                  >
                    Hannah
                  </motion.h1>
                  <motion.h1
                    key="landing-h1-2"
                    className={loveLight.className + " text-5xl text-[#838461]"}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ ease: "easeInOut", delay: 0.8 }}
                  >
                    &
                  </motion.h1>
                  <motion.h1
                    key="landing-h1-3"
                    className={loveLight.className + " text-5xl text-[#838461]"}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ ease: "easeInOut", delay: 1.1 }}
                  >
                    Dale
                  </motion.h1>
                </div>

                <div className="h2-header flex flex-row gap-2">
                  <motion.h2
                    key="landing-h2-1"
                    className="flex flex-gap-2 text-sm text-[#838461] mb-12 md:mb-4 lg:mb-24"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ ease: "easeInOut", delay: 1.4 }}
                  >
                    Denver
                  </motion.h2>
                  <span>&nbsp;</span>
                  <motion.h2
                    key="landing-h2-2"
                    className="flex flex-gap-2 text-sm text-[#838461] mb-12 md:mb-4 lg:mb-24"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ ease: "easeInOut", delay: 1.55 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                      />
                    </svg>
                  </motion.h2>
                  <span>&nbsp;</span>
                  <motion.h2
                    key="landing-h2-3"
                    className="flex flex-gap-2 text-sm text-[#838461] mb-12 md:mb-4 lg:mb-24"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ ease: "easeInOut", delay: 1.7 }}
                  >
                    San Diego
                  </motion.h2>
                  <span>&nbsp;</span>
                  <motion.h2
                    key="landing-h2-4"
                    className="flex flex-gap-2 text-sm text-[#838461] mb-12 md:mb-4 lg:mb-24"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ ease: "easeInOut", delay: 1.85 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                      />
                    </svg>
                  </motion.h2>
                  <span>&nbsp;</span>
                  <motion.h2
                    key="landing-h2-5"
                    className="flex flex-gap-2 text-sm text-[#838461] mb-12 md:mb-4 lg:mb-24"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ ease: "easeInOut", delay: 2 }}
                  >
                    <svg
                      ref={globeRef}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m20.893 13.393-1.135-1.135a2.252 2.252 0 0 1-.421-.585l-1.08-2.16a.414.414 0 0 0-.663-.107.827.827 0 0 1-.812.21l-1.273-.363a.89.89 0 0 0-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 0 1-1.81 1.025 1.055 1.055 0 0 1-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 0 1-1.383-2.46l.007-.042a2.25 2.25 0 0 1 .29-.787l.09-.15a2.25 2.25 0 0 1 2.37-1.048l1.178.236a1.125 1.125 0 0 0 1.302-.795l.208-.73a1.125 1.125 0 0 0-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 0 1-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 0 1-1.458-1.137l1.411-2.353a2.25 2.25 0 0 0 .286-.76m11.928 9.869A9 9 0 0 0 8.965 3.525m11.928 9.868A9 9 0 1 1 8.965 3.525"
                      />
                    </svg>
                  </motion.h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.main>
    </AnimatePresence>
  );
}
