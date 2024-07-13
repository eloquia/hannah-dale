"use client";

import { useEffect, useState } from "react";

import shuffle, { isCompleted, switchCells } from "@/utils/shuffle";
import SliderGame from "@/components/game/slider-game";
import { useRouter } from 'next/navigation';
import AnimatedText from "@/components/ui/animated-text";
import { AnimatePresence, motion } from "framer-motion";

const IMAGE_WIDTH = 180;
const IMAGE_HEIGHT = 37;

const X_INDICES = 3;
const Y_INDICES = 4;

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

  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    // add germany-x-y.png images randomly to the array
    const imageArray = [];

    for (let y = 0; y < Y_INDICES; y++) {
      for (let x = 0; x < X_INDICES; x++) {
        const imageSrc = `/chapter-1/test/germany-${x}-${y}.png`;
        imageArray.push(imageSrc);
      }
    }

    imageArray.pop();
    imageArray.push('');

    const randomSort = shuffle(imageArray, X_INDICES);
    setIsInitialized(true);
    setImageSrcs(randomSort);
  }, []);

  const handleCompleted = () => {
    setCompleted(true);
  }

  const handleNavigate = () => {
    router.push('/chapter-2');
  }

  // if (!imageSrcs || imageSrcs.length === 0) {
  //   return <div>Loading...</div>;
  // }

  const handleAdvanceText = () => {
    if (currentTextIndex < text.length - 1) {
      setCurrentTextIndex(currentTextIndex + 1);
    }
  }

  return (
    <AnimatePresence>
      <motion.main
        className="p-4 flex min-h-screen flex-col gap-16"
        onClick={handleAdvanceText}
        initial={{ opacity: 0, x: 1000 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7 }}
      >
        <AnimatedText
          text={text[currentTextIndex]}
        />
      </motion.main>
    </AnimatePresence>
    // <main className="p-4 flex min-h-screen flex-col items-center gap-4">
    //   <p className="mb-8 text-xl text-center">Complete the Image to Unlock the Memory!</p>
    //   <SliderGame
    //     imagePrefix="/chapter-1/test/germany"
    //     // imagePrefix="/chapter-1/game/kearny-villa"
    //     imageExtension="png"
    //     numCols={X_INDICES}
    //     numRows={Y_INDICES}
    //     imageHeight={IMAGE_HEIGHT}
    //     imageWidth={IMAGE_WIDTH}
    //     onCompleted={handleCompleted}
    //   />

    //   {completed && <button onClick={handleNavigate}>Next</button>}
    // </main>
  );
}
