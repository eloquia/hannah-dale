"use client";

import Link from "next/link";
import Image from 'next/image';
import randomQuery from "@/utils/queries";

type ImageModalProps = {
  imageSrc: string
  imageAlt: string
}

export default function ImageClueModal(props: ImageModalProps) {
  const { imageSrc, imageAlt } = props

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="p-8 border w-96 shadow-lg rounded-md bg-white">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900">{randomQuery()}</h3>
          <div className="mt-2 px-7 py-3">
            <Image
              src={imageSrc}
              alt={imageAlt}
              style={{
                width: '100%',
                height: 'auto',
              }}
              sizes="90vw"
              width={500}
              height={300}
            />
          </div>
          <div className="flex justify-center mt-4">

            <Link
              href="/chapter-2"
              className="px-4 py-2 bg-[#01F9C6] text-gray-900 text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Close
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
}
