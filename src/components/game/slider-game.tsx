"use client";

import Image, { StaticImageData } from "next/image";
import { useEffect, useState } from "react";

import shuffle, { isCompleted, switchCells } from "@/utils/shuffle";

import kearnyVilla00 from "../../../public/chapter-1/game/kearny-villa-0-0.png";
import kearnyVilla01 from "../../../public/chapter-1/game/kearny-villa-0-1.png";
import kearnyVilla02 from "../../../public/chapter-1/game/kearny-villa-0-2.png";
import kearnyVilla03 from "../../../public/chapter-1/game/kearny-villa-0-3.png";
import kearnyVilla10 from "../../../public/chapter-1/game/kearny-villa-1-0.png";
import kearnyVilla11 from "../../../public/chapter-1/game/kearny-villa-1-1.png";
import kearnyVilla12 from "../../../public/chapter-1/game/kearny-villa-1-2.png";
import kearnyVilla13 from "../../../public/chapter-1/game/kearny-villa-1-3.png";
import kearnyVilla20 from "../../../public/chapter-1/game/kearny-villa-2-0.png";
import kearnyVilla21 from "../../../public/chapter-1/game/kearny-villa-2-1.png";
import kearnyVilla22 from "../../../public/chapter-1/game/kearny-villa-2-2.png";
import kearnyVilla23 from "../../../public/chapter-1/game/kearny-villa-2-3.png";

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
  const [imageSrcs, setImageSrcs] = useState<{ src: StaticImageData | null; alt: string }[]>([]);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const imageArray: { src: StaticImageData | null; alt: string }[] = [
      {
        src: kearnyVilla00,
        alt: "1",
      },
      {
        src: kearnyVilla01,
        alt: "2",
      },
      {
        src: kearnyVilla02,
        alt: "3",
      },
      {
        src: kearnyVilla03,
        alt: "4",
      },
      {
        src: kearnyVilla10,
        alt: "5",
      },
      {
        src: kearnyVilla11,
        alt: "6",
      },
      {
        src: kearnyVilla12,
        alt: "7",
      },
      {
        src: kearnyVilla13,
        alt: "8",
      },
      {
        src: kearnyVilla20,
        alt: "9",
      },
      {
        src: kearnyVilla21,
        alt: "10",
      },
      {
        src: kearnyVilla22,
        alt: "11",
      },
      {
        src: kearnyVilla23,
        alt: "12",
      },
    ];

    imageArray.pop();
    imageArray.push({
      src: null,
      alt: "",
    });

    const randomSort = shuffle(imageArray, numCols);
    setIsInitialized(true);
    setImageSrcs(randomSort);
  }, [imageExtension, imagePrefix, numCols, numRows]);

  useEffect(() => {
    if (isInitialized) {
      const c = isCompleted(imageSrcs);
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
          if (!imageSrc.src) {
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
              src={imageSrc.src}
              alt={imageSrc.alt}
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
