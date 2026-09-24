"use client";

import { useRef, useState } from "react";
import Image from "next/image";

export default function ProductGallery({
  images,
  productName,
}: {
  images: string[];
  productName: string;
}) {
  const [active, setActive] = useState(0);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const frameRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const element = frameRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const maxTilt = 6;

    setTilt({
      rotateY: (x - 0.5) * maxTilt * 2,
      rotateX: (0.5 - y) * maxTilt * 2,
    });
    setGlare({ x: x * 100, y: y * 100, opacity: 0.2 });
  }

  function handleMouseLeave() {
    setTilt({ rotateX: 0, rotateY: 0 });
    setGlare((current) => ({ ...current, opacity: 0 }));
  }

  if (images.length === 0) {
    return (
      <div className="flex min-h-80 w-full items-center justify-center rounded-2xl border border-gray-200 bg-white text-sm text-gray-400 shadow-sm">
        No image available
      </div>
    );
  }

  return (
    <div>
      <div style={{ perspective: "1000px" }}>
        <div
          ref={frameRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
            transition: "transform 150ms ease-out",
            transformStyle: "preserve-3d",
          }}
          className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
        >
          <Image
            src={images[active]}
            alt={productName}
            fill
            className="object-contain p-5 sm:p-8"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}) 0%, rgba(255,255,255,0) 60%)`,
              transition: "opacity 150ms ease-out",
            }}
          />
        </div>
      </div>

      {images.length > 1 && (
        <div className="mt-4 flex flex-wrap gap-2.5">
          {images.map((url, index) => (
            <button
              key={`${url}-${index}`}
              type="button"
              onClick={() => setActive(index)}
              className={`relative h-16 w-16 overflow-hidden rounded-xl border-2 bg-white transition sm:h-20 sm:w-20 ${
                index === active
                  ? "border-blue-600 shadow-sm"
                  : "border-transparent hover:border-gray-300"
              }`}
              aria-label={`View ${productName} image ${index + 1}`}
            >
              <Image
                src={url}
                alt={`${productName} photo ${index + 1}`}
                fill
                className="object-contain p-1.5"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
