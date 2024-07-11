"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import shuffle, { isCompleted, switchCells } from "@/utils/shuffle";

export type SliderGameProps = {
  imagePrefix: string;
  imageExtension: string;
  numCols: number;
  numRows: number;
  imageHeight: number;
  imageWidth: number;
  onCompleted: () => void,
}

export default function SliderGame(props: SliderGameProps) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [imageSrcs, setImageSrcs] = useState<string[]>([]);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const imageArray = [];

    for (let y = 0; y < props.numRows; y++) {
      for (let x = 0; x < props.numCols; x++) {
        const imageSrc = `${props.imagePrefix}-${x}-${y}.${props.imageExtension}`;
        imageArray.push(imageSrc);
      }
    }

    imageArray.pop();
    imageArray.push('');

    const randomSort = shuffle(imageArray, props.numCols);
    setIsInitialized(true);
    setImageSrcs(randomSort);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      const c = isCompleted(imageSrcs, props.numCols);
      if (c) {
        setCompleted(true);
      } 
    }
  }, [imageSrcs]);

  useEffect(() => {
    if (completed) {
      props.onCompleted();
    }
  }, [completed]);

  const handleClick = (idx: number) => {
    if (completed) {
      return;
    }
    const imageSrcsCopy = [...imageSrcs];
    const updated = switchCells(imageSrcsCopy, props.numCols, idx);
    setImageSrcs(updated);
  };

  if (!imageSrcs || imageSrcs.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="inline-grid grid-cols-3 gap-0">
      {
        Array.from(Array.from(Array(imageSrcs.length).keys()).keys()).map(idx => {
          const imageSrc = imageSrcs[idx]
          if (!imageSrc) {
            // return a gray image block
            return (
              <div
                key={`image-${idx}`}
                className={`h-[${props.imageHeight}] w-[${props.imageWidth}] bg-gray-300`}
              />
            );
          };
          return (
            <Image
              key={`image-${idx}`}
              src={imageSrc}
              alt=""
              width={props.imageWidth}
              height={props.imageHeight}
              onClick={() => handleClick(idx)}
            />
          );
        })
      }
    </div>
  );
}
