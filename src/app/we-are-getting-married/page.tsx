"use client";

import React from 'react'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

import image from '../../../public/chapter-3/ring.jpeg';

export default function Page() {
  const { width, height } = useWindowSize()
  const canvasRef = React.useRef(null)

  React.useEffect(() => {
    if (canvasRef.current) {
      // canvas.current.
    }
  }, [canvasRef])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Confetti
        ref={canvasRef}
        width={width}
        height={height}
      />
      <div className='absolute flex justify-content items-center'>
        <img
          className="mask mask-heart"
          style={{
            backgroundImage: `url(${image.src})`
          }}
        />
      </div>
    </main>
  )
}