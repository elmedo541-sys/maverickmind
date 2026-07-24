"use client";

import { useState, useRef } from "react";
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

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = frameRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width; // 0..1
    const y = (e.clientY - rect.top) / rect.height; // 0..1

    const maxTilt = 10; // degrees
    const rotateY = (x - 0.5) * maxTilt * 2;
    const rotateX = (0.5 - y) * maxTilt * 2;

    setTilt({ rotateX, rotateY });
    setGlare({ x: x * 100, y: y * 100, opacity: 0.25 });
  }

  function handleMouseLeave() {
    setTilt({ rotateX: 0, rotateY: 0 });
    setGlare((g) => ({ ...g, opacity: 0 }));
  }

  if (images.length === 0) {
    return (
      <div className="relative w-full h-80 bg-white rounded-lg shadow-sm flex items-center justify-center text-gray-400">
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
            transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale3d(1.03, 1.03, 1.03)`,
            transition: "transform 150ms ease-out",
            transformStyle: "preserve-3d",
          }}
          className="relative w-full h-80 bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <Image
            src={images[active]}
            alt={productName}
            fill
            className="object-contain p-4"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}) 0%, rgba(255,255,255,0) 60%)`,
              transition: "opacity 150ms ease-out",
            }}
          />
        </div>
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 mt-3 flex-wrap">
          {images.map((url, i) => (
            <button
              key={url}
              type="button"
              onClick={() => setActive(i)}
              className={`relative w-16 h-16 rounded border-2 overflow-hidden transition ${
                i === active ? "border-navy" : "border-transparent hover:border-gray-300"
              }`}
            >
              <Image
                src={url}
                alt={`${productName} photo ${i + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}