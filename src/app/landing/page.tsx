"use client";

import ParallaxText from "@/components/ui/parallax-text";
import { motion, stagger, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";

export default function Landing() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    console.log("Page scroll: ", latest)
  })

  useEffect(() => {
    setIsLoaded(true);
  }, [])

  return (
    <div className="flex">
      <section className="w-full parallax-wrapper">
        <ParallaxText baseVelocity={-5}>The Story of</ParallaxText>
        <ParallaxText baseVelocity={5}>Hannah and Dale</ParallaxText>
      </section>
    </div>
  )
}
