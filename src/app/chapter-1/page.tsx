"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import shuffle, { isCompleted, switchCells } from "@/utils/shuffle";

const IMAGE_WIDTH = 180;
const IMAGE_HEIGHT = 37;

const X_INDICES = 3;
const Y_INDICES = 4;

const PLACE_HOLDER_IMAGE = "/chapter-1/test/placeholder.png";

export default function First() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [imageSrcs, setImageSrcs] = useState<string[]>([]);
  const [completed, setCompleted] = useState(false);

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
    imageArray.push('');;

    const randomSort = shuffle(imageArray, X_INDICES);
    setIsInitialized(true);
    setImageSrcs(randomSort);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      const c = isCompleted(imageSrcs, X_INDICES);
      if (c) {
        setCompleted(true);
      } 
    }
  }, [imageSrcs]);

  useEffect(() => {
    if (completed) {
      alert("You win!");
    }
  }, [completed]);

  const handleClick = (idx: number) => {
    if (completed) {
      return;
    }
    const imageSrcsCopy = [...imageSrcs];
    const updated = switchCells(imageSrcsCopy, X_INDICES, idx);
    setImageSrcs(updated);
  };

  if (!imageSrcs || imageSrcs.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <div className="inline-grid grid-cols-3 gap-0">
        {
          Array.from(Array.from(Array(imageSrcs.length).keys()).keys()).map(idx => {
            const imageSrc = imageSrcs[idx]
            if (!imageSrc) {
              // return a gray image block
              return (
                <div
                  key={`image-${idx}`}
                  className={`h-[${IMAGE_HEIGHT}] w-[${IMAGE_WIDTH}] bg-gray-300`}
                />
              );
            };
            return (
              <Image
                key={`image-${idx}`}
                src={imageSrc}
                alt=""
                width={IMAGE_WIDTH}
                height={IMAGE_HEIGHT}
                onClick={() => handleClick(idx)}
              />
            );
          })
        }
      </div>
    </main>
  );
}
