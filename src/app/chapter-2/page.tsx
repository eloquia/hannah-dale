"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Map from '@/components/map/map';
import Link from 'next/link';
import Modal from '../image/page';

const data = [
  {
    id: 0,
    imageSrc: '/chapter-2/germany.jpg',
    imageAlt: 'germany',
    x: 0,
    y: 0,
  },
];

type SearchParamProps = {
  searchParams: Record<string, string> | null | undefined;
};

export default function Chapter2({ searchParams }: SearchParamProps) {
  const show = searchParams?.show;
  const [imageSrc, setImageSrc] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const router = useRouter();
  const [lng, setLng] = useState(-117.120830);
  const [lat, setLat] = useState(32.760840);

  useEffect(() => {
    setImageSrc('/chapter-2/germany.jpg');
    setImageAlt('germany');
  }, []);

  const handleMapClick = () => {
    router.push('/map');
  }

  const handleGetLngLat = (lng: number, lat: number) => {
    console.log(lng, lat);
  }

  return (
    <>
      <div className="">
        <Map getLngLat={handleGetLngLat} lng={lng} lat={lat} />
        <div className="chapter-2-actions flex justify-between p-4">
          <Link href="/chapter-2?show=true">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
          </Link>
          <button className="btn btn-primary" onClick={handleMapClick}>Submit</button>
        </div>
      </div>

      {show && <Modal imageSrc={imageSrc} imageAlt={imageAlt} />}
    </>

    // <div className='p-8 relative'>
    //   <div className="flex justify-center mb-4">
    //     <p className='text-xl'>Where was this?</p>
    //   </div>

    //     <Image
    //       src={imageSrc}
    //       alt={imageAlt}
    //       style={{
    //         width: '100%',
    //         height: 'auto',
    //       }}
    //       sizes="90vw"
    //       width={500}
    //       height={300}
    //     />

    //   <button className="btn btn-circle absolute bottom-4 right-4" onClick={handleMapClick}>
    //     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
    //       <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
    //     </svg>
    //   </button>
    // </div>
  )
}