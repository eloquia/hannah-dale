"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import MapGame from '@/components/map/map';
import Link from 'next/link';
import getDistance from 'geolib/es/getDistance';
import { showToast } from '@/components/toast/show-toast';
import { randomGoodGuessText } from '@/utils/good-guess';
import { MapGameImage } from '@/models/map.models';
import ImageClueModal from '@/components/image.modal';
import { StaticImageData } from 'next/image';

import placeholderImage from '../../../public/next.svg';
import { motion } from 'framer-motion';
import { TYPEWRITE_DELAY_MILLIS } from '@/constants/timer';

import balboaNights from "../../../public/chapter-2/balboa-nights.jpg";
import santaBarbara from "../../../public/chapter-2/santa-barbara.jpg";
import torreyPines from "../../../public/chapter-2/torrey-pines.jpg";
import ensenada from "../../../public/chapter-2/ensenada.jpeg";
import carlsbad from "../../../public/chapter-2/carlsbad.jpeg";
import coachella from "../../../public/chapter-2/coachella.jpeg";
import universalStudios from "../../../public/chapter-2/universal-studios.jpeg";
import griffithObservatory from "../../../public/chapter-2/griffith-observatory.jpeg";
import iowaStateFair from "../../../public/chapter-2/iowa-state-fair.jpeg";
import pilates from "../../../public/chapter-2/pilates.jpeg";
import salzburg from "../../../public/chapter-2/salzburg.jpeg";
import wien from "../../../public/chapter-2/wien.jpeg";
import madrid from "../../../public/chapter-2/madrid.png";
import cancun from "../../../public/chapter-2/cancun.jpeg";
import getty from "../../../public/chapter-2/getty.png";
import denver from "../../../public/chapter-2/denver.jpeg";
import missionBeach from "../../../public/chapter-2/mission-beach.jpeg";
import decorah from "../../../public/chapter-2/decorah.jpeg";
import laJollaSwing from "../../../public/chapter-2/la-jolla-swing.png";
import joshuaTree from "../../../public/chapter-2/joshua-tree.jpeg";

const RADIUS_OF_ERROR = 0;

// Map Game
const BALBOA_NIGHTS: MapGameImage = {
  imageSrc: balboaNights,
  imageAlt: 'Balboa Nights',
  lng: -117.151532,
  lat: 32.731822,
  errorThresholdMeters: 3000,
  clue: 'Balboa Nights',
}
const SANTA_BARBARA: MapGameImage = {
  imageSrc: santaBarbara,
  imageAlt: 'Santa Barbara',
  lng: -119.700720,
  lat: 34.420230,
  errorThresholdMeters: 2000,
  clue: 'Santa Barbara',
};
const TORREY_PINES: MapGameImage = {
  imageSrc: torreyPines,
  imageAlt: 'Torrey Pines',
  lng: -117.259454,
  lat: 32.925258,
  errorThresholdMeters: 1500,
  clue: 'Torrey Pines',
};
const ENSENADA: MapGameImage = {
  imageSrc: ensenada,
  imageAlt: 'Ensenada',
  lng: -116.656659,
  lat: 31.863149,
  errorThresholdMeters: 1000,
  clue: 'Ensenada',
};
const CARLSBAD: MapGameImage = {
  imageSrc: carlsbad,
  imageAlt: 'Carlsbad',
  lng: -117.348768,
  lat: 33.159341,
  errorThresholdMeters: 3000,
  clue: 'Carlsbad',
};
const COACHELLA: MapGameImage = {
  imageSrc: coachella,
  imageAlt: 'Coachella',
  lng: -116.246035,
  lat: 33.679378,
  errorThresholdMeters: 10000,
  clue: 'Coachella',
};
const UNIVERSAL_STUDIOS: MapGameImage = {
  imageSrc: universalStudios,
  imageAlt: 'Universal Studios',
  lng: -118.353280,
  lat: 34.137786,
  errorThresholdMeters: 5000,
  clue: 'Universal Studios',
};
const GRIFFITH_OBSERVATORY: MapGameImage = {
  imageSrc: griffithObservatory,
  imageAlt: 'Griffith Observatory',
  lng: -118.300392,
  lat: 34.118435,
  errorThresholdMeters: 2000,
  clue: 'Griffith Observatory',
};
const IOWA_STATE_FAIR: MapGameImage = {
  imageSrc: iowaStateFair,
  imageAlt: 'Iowa State Fair',
  lng: -93.553262,
  lat: 41.597433,
  errorThresholdMeters: 300,
  clue: 'Iowa State Fair',
};
const PILATES: MapGameImage = {
  imageSrc: pilates,
  imageAlt: 'Pilates',
  lng: -117.152412,
  lat: 32.768940,
  errorThresholdMeters: 100,
  clue: 'Pilates',
};
const SALZBURG: MapGameImage = {
  imageSrc: salzburg,
  imageAlt: 'Salzburg',
  lng: 13.0263306,
  lat: 47.8019550,
  errorThresholdMeters: 3000,
  clue: 'Salzburg',
};
const WIEN: MapGameImage = {
  imageSrc: wien,
  imageAlt: 'Wien',
  lng: 16.377753,
  lat: 48.208593,
  errorThresholdMeters: 1000,
  clue: 'Wien',
};
const MADRID: MapGameImage = {
  imageSrc: madrid,
  imageAlt: 'Madrid',
  lng: -3.7010750,
  lat: 40.4146050,
  errorThresholdMeters: 1000,
  clue: 'Madrid',
};
const CANCUN: MapGameImage = {
  imageSrc: cancun,
  imageAlt: 'Cancun',
  lng: -86.818384,
  lat: 21.274930,
  errorThresholdMeters: 1500,
  clue: 'Cancun',
};
const GETTY: MapGameImage = {
  imageSrc: getty,
  imageAlt: 'Getty',
  lng: -118.4738000,
  lat: 	34.0766972,
  errorThresholdMeters: 1000,
  clue: 'Getty',
};
const DENVER: MapGameImage = {
  imageSrc: denver,
  imageAlt: 'Denver',
  lng: -105.015147,
  lat: 39.740212,
  errorThresholdMeters: 1000,
  clue: 'Denver',
};
const MISSION_BEACH: MapGameImage = {  
  imageSrc: missionBeach,
  imageAlt: 'Mission Beach',
  lng: -117.2532500,
  lat: 32.7615967,
  errorThresholdMeters: 500,
  clue: 'Mission Beach',
};
const DECORAH: MapGameImage = {
  imageSrc: decorah,
  imageAlt: 'Decorah',
  lng: -91.7956783,
  lat: 43.2898250,
  errorThresholdMeters: 500,
  clue: 'Decorah',
};
const LA_JOLLA_SWING: MapGameImage = {
  imageSrc: laJollaSwing,
  imageAlt: 'La Jolla Swing',
  lng: -117.247958,
  lat: 32.864789,
  errorThresholdMeters: 300,
  clue: 'La Jolla Swing',
};
const JOSHUA_TREE: MapGameImage = {
  imageSrc: joshuaTree,
  imageAlt: 'Joshua Tree',
  lng: -116.1868050,
  lat: 34.0326694,
  errorThresholdMeters: 20000,
  clue: 'Joshua Tree',
};

const text = [
  "After they learned they had much in common",
  "It was only destiny they found themselves",
  "falling for each other",
  "Let's piece together the memories they shared",
]

const data: MapGameImage[] = [
  BALBOA_NIGHTS,
  SANTA_BARBARA,
  TORREY_PINES,
  ENSENADA,
  CARLSBAD,
  COACHELLA,
  UNIVERSAL_STUDIOS,
  GRIFFITH_OBSERVATORY,
  IOWA_STATE_FAIR,
  PILATES,
  SALZBURG,
  WIEN,
  MADRID,
  CANCUN,
  GETTY,
  DENVER,
  MISSION_BEACH,
  DECORAH,
  LA_JOLLA_SWING,
  JOSHUA_TREE,
];

const defaultOptions = {
  shouldPreventDefault: true,
  delay: 500,
};

type SearchParamProps = {
  searchParams: Record<string, string> | null | undefined;
};

export default function Chapter2({
  searchParams
}: {
  searchParams: Record<string, string> | null | undefined;
}) {
  const show = searchParams?.show;
  const [imageSrc, setImageSrc] = useState<StaticImageData>(placeholderImage);
  const [imageAlt, setImageAlt] = useState('');
  const router = useRouter();
  const [initialLng, setLng] = useState(-117.120830);
  const [initialLat, setLat] = useState(32.760840);
  const [guessLng, setGuessLng] = useState(-117.120830);
  const [guessLat, setGuessLat] = useState(32.760840);
  const [memoryIdx, setMemoryIdx] = useState(0);

  const [ showGame, setShowGame ] = useState(false);

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
      
        // increment, and if we're past array, clear interval
      if (i++ >= text[currentTextIndex].length) {
        clearInterval(interval);
        setCanAdvance(true);
      }
    }, TYPEWRITE_DELAY_MILLIS);

  }, [currentTextIndex]);

  useEffect(() => {
    setImageSrc(data[memoryIdx].imageSrc);
    setImageAlt(data[memoryIdx].imageAlt);
  }, [memoryIdx]);

  const handleGetLngLat = (lng: number, lat: number) => {
    setGuessLng(lng);
    setGuessLat(lat);
  }

  const handleGuess = () => {
    const datum = data[memoryIdx];
    const distanceInMeters = getDistance(
      { latitude: guessLat, longitude: guessLng },
      { latitude: data[memoryIdx].lat, longitude: data[memoryIdx].lng },
      data[memoryIdx].errorThresholdMeters,
    );

    // compare guess lng and guess lat with data lng and lat
    if (distanceInMeters < data[memoryIdx].errorThresholdMeters) {
      showToast('success', randomGoodGuessText());
      if (memoryIdx === data.length - 1) {
        router.push('/chapter-3');
      } else {
        setMemoryIdx(memoryIdx + 1);
        router.push('/chapter-2?show=true');
      }
    } else {
      const actualDistance = distanceInMeters
      const expectedDistance = data[memoryIdx].errorThresholdMeters
      showToast('warning', `You need to be within ${expectedDistance} meters raidus but you were ${distanceInMeters} meters away`);
    }
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
    <>
      <main>
        {
          showGame
            ? <>
                <MapGame getLngLat={handleGetLngLat} initialLng={initialLng} initialLat={initialLat} />

                <div className="chapter-2-actions absolute bottom-10 w-full flex justify-between items-center h-16 p-4 bg-slate-150">
                  <Link href="/chapter-2?show=true" className="bg-[#01F9C6] rounded-full p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                  </Link>

                  <div className="px-3 py-1 text-xl bg-slate-200 opacity-80 rounded-lg">
                    <p className="text-gray-900">
                      {memoryIdx + 1} / {data.length}
                    </p>
                  </div>

                  <button className="px-4 py-2 bg-[#01F9C6] rounded-xl text-gray-900" onClick={handleGuess}>Guess</button>
                </div>
              </>
            : <motion.div
                className="p-4 min-h-screen flex justify-center items-center gap-16"
                onClick={handleAdvanceText}
              >
                <p className="text-center w-3/4 md:w-1/2">{displayedText}</p>
              </motion.div>
        }

      </main>
      {show && <ImageClueModal imageSrc={imageSrc} imageAlt={imageAlt} />}
    </>
  )
}
