"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import MapGame from '@/components/map/map';
import Link from 'next/link';
import getDistance from 'geolib/es/getDistance';
import { showToast } from '@/components/toast/show-toast';
import { randomGoodGuessText } from '@/utils/good-guess';
import { MapGameImage } from '@/models/map.models';
import { BALBOA_NIGHTS, CANCUN, CARLSBAD, COACHELLA, DECORAH, DENVER, ENSENADA, GETTY, GRIFFITH_OBSERVATORY, IOWA_STATE_FAIR, JOSHUA_TREE, LA_JOLLA_SWING, MADRID, MISSION_BEACH, PILATES, SALZBURG, SANTA_BARBARA, TORREY_PINES, UNIVERSAL_STUDIOS, WIEN } from '@/utils/map.constants';
import ImageClueModal from '@/components/image.modal';
import { StaticImageData } from 'next/image';

import placeholderImage from '../../../public/next.svg';

const text = [
  "After they learned they had much in common",
  "It was only fate they found themselves",
  "falling for each other",
  "Let's discover their journey"
]

const otherText = [
  "Let's look at memories they shared",
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
    console.log(datum)
    console.log(guessLng, guessLat, datum.lng, datum.lat)
    const distanceInMeters = getDistance(
      { latitude: guessLat, longitude: guessLng },
      { latitude: data[memoryIdx].lat, longitude: data[memoryIdx].lng },
      data[memoryIdx].errorThresholdMeters,
    );

    console.log(distanceInMeters)

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

  return (
    <>
      <div className="">
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
      </div>

      {show && <ImageClueModal imageSrc={imageSrc} imageAlt={imageAlt} />}
    </>
  )
}
