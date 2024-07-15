"use client";

import { useEffect, useState } from "react";

import SliderGame from "@/components/game/slider-game";
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from "framer-motion";
import { TYPEWRITE_DELAY_MILLIS } from "@/constants/timer";

const IMAGE_WIDTH = 180;
const IMAGE_HEIGHT = 37;

const X_INDICES = 3;
const Y_INDICES = 4;

const text = [
  "Once upon a time...",
  "The universe brought two people together in Denver.",
  "Only to force them apart soon after.",
  "Regardless, they both found each other in San Diego",
  "and they became friends",
  "Let's see what they looked like!",
];

export default function First() {
  const router = useRouter();
  const [completed, setCompleted] = useState(false);

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState<string>('');
  const [canAdvance, setCanAdvance] = useState(false);

  const [ showGame, setShowGame ] = useState(false);

  useEffect(() => {
    setCanAdvance(false);
    var i = 0
  
    // seed first call and store interval (to clear later)
    var interval = setInterval(function() {
      // each loop, call passed in function
      setDisplayedText(text[currentTextIndex].slice(0, i));
      
        // increment, and if we're past array, clear interval
      if (i++ >= text[currentTextIndex].length) {
        clearInterval(interval);
        setCanAdvance(true);
      }
    }, TYPEWRITE_DELAY_MILLIS);

  }, [currentTextIndex]);

  const handleCompleted = () => {
    setCompleted(true);
  }

  const handleNavigate = () => {
    router.push('/chapter-2');
  }

  const handleAdvanceText = () => {
    if (canAdvance) {
      if (currentTextIndex < text.length - 1) {
        setCurrentTextIndex(currentTextIndex + 1);
      } else {
        setShowGame(true);
      }
    }
  }

  return (
    <AnimatePresence>
      {
        showGame
          ? <main className="p-4 flex h-screen flex-col items-center gap-4">
              <p className="mb-2 text-xl text-center">Complete the Image to Unlock the Memory!</p>
              <SliderGame
                imagePrefix="/chapter-1/game/kearny-villa"
                imageExtension="png"
                numCols={X_INDICES}
                numRows={Y_INDICES}
                imageHeight={IMAGE_HEIGHT}
                imageWidth={IMAGE_WIDTH}
                onCompleted={handleCompleted}
              />
              {
                completed && <div className="text-center mt-2">
                  <button
                    className="px-4 py-2 bg-[#01F9C6] text-gray-900 text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                    onClick={handleNavigate}
                  >
                    Next
                  </button>
                </div>
              }
            </main>
          : <motion.main
              className="p-4 min-h-screen flex justify-center items-center gap-16"
              onClick={handleAdvanceText}
            >
              <p className="text-center w-3/4 md:w-1/2">{displayedText}</p>
            </motion.main>
      }
    </AnimatePresence>
  );
}
