"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProductGallery({
  images,
  productName,
}: {
  images: string[];
  productName: string;
}) {
  const [active, setActive] = useState(0);

  if (images.length === 0) {
    return (
      <div className="relative w-full h-80 bg-white rounded-lg shadow-sm flex items-center justify-center text-gray-400">
        No image available
      </div>
    );
  }

  return (
    <div>
      <div className="relative w-full h-80 bg-white rounded-lg shadow-sm">
        <Image
          src={images[active]}
          alt={productName}
          fill
          className="object-contain p-4"
        />
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 mt-3 flex-wrap">
          {images.map((url, i) => (
            <button
              key={url}
              type="button"
              onClick={() => setActive(i)}
              className={`relative w-16 h-16 rounded border-2 overflow-hidden ${
                i === active ? "border-navy" : "border-transparent"
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