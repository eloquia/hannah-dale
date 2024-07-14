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
  const { imagePrefix, imageExtension, numCols, numRows, imageHeight, imageWidth, onCompleted } = props;
  const [isInitialized, setIsInitialized] = useState(false);
  const [imageSrcs, setImageSrcs] = useState<string[]>([]);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const imageArray = [];

    for (let y = 0; y < numRows; y++) {
      for (let x = 0; x < numCols; x++) {
        const imageSrc = `${imagePrefix}-${x}-${y}.${imageExtension}`;
        imageArray.push(imageSrc);
      }
    }

    imageArray.pop();
    imageArray.push('');

    const randomSort = shuffle(imageArray, numCols);
    setIsInitialized(true);
    setImageSrcs(randomSort);
  }, [imageExtension, imagePrefix, numCols, numRows]);

  useEffect(() => {
    if (isInitialized) {
      const c = isCompleted(imageSrcs, numCols);
      if (c) {
        setCompleted(true);
      } 
    }
  }, [imageSrcs, isInitialized, numCols]);

  useEffect(() => {
    if (completed) {
      onCompleted();
    }
  }, [completed, onCompleted]);

  const handleClick = (idx: number) => {
    if (completed) {
      return;
    }
    const imageSrcsCopy = [...imageSrcs];
    const updated = switchCells(imageSrcsCopy, numCols, idx);
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
              alt="TBD"
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
