"use client";

import { useEffect, useState } from "react";

import { useRouter } from 'next/navigation';
import AnimatedText from "@/components/ui/animated-text";
import { AnimatePresence, motion } from "framer-motion";
import { TYPEWRITE_DELAY_MILLIS } from "@/constants/timer";

const text = [
  "Once upon a time...",
  "The universe brought two people together in Denver.",
  "However, fate forced them apart soon after.",
  "Soon after, they both found themselves in San Diego",
  "and they became friends and then roommates.",
  "Let's see what they looked like",
];

export default function First() {
  const router = useRouter();
  const [isInitialized, setIsInitialized] = useState(false);
  const [imageSrcs, setImageSrcs] = useState<string[]>([]);
  const [completed, setCompleted] = useState(false);
  const [charIdx, setCharIdx] = useState(0);

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState<string>('');
  const [canAdvance, setCanAdvance] = useState(false);

  useEffect(() => {
    setCanAdvance(false);
    var i = 0
  
    // seed first call and store interval (to clear later)
    var interval = setInterval(function() {
      // each loop, call passed in function
      setDisplayedText(text[currentTextIndex].slice(0, i));
      // delegate(once[i]);
      
        // increment, and if we're past array, clear interval
      if (i++ >= text[currentTextIndex].length) {
        clearInterval(interval);
        setCanAdvance(true);
      }
    }, TYPEWRITE_DELAY_MILLIS);

  }, [currentTextIndex]);

  const handleNavigate = () => {
    router.push('/chapter-1');
  }

  const handleAdvanceText = () => {
    if (canAdvance && currentTextIndex < text.length - 1) {
      setCurrentTextIndex(currentTextIndex + 1);
    }
  }

  return (
    <AnimatePresence>
      <motion.main
        className="p-4 min-h-screen flex justify-center items-center gap-16"
        onClick={handleAdvanceText}
        // initial={{ opacity: 0, x: 1000 }}
        // animate={{ opacity: 1, x: 0 }}
        // exit={{ opacity: 0 }}
        // transition={{ duration: 0.7 }}
      >
        {/* <AnimatedText
          text={text[currentTextIndex]}
        /> */}
        <p>{displayedText}</p>
      </motion.main>
    </AnimatePresence>
  );
}
