"use client";

import { useRef, useState } from "react";
import Image from "next/image";

export default function Logo({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const max = 18;
    setTilt({
      x: (0.5 - py) * max,
      y: (px - 0.5) * max,
    });
  }

  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 });
  }

  return (
    <span className={`flex items-center ${className}`}>
      <div style={{ perspective: "500px" }} className="animate-[logoPop_0.7s_ease-out_both]">
        <div
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transition: "transform 150ms ease-out",
            transformStyle: "preserve-3d",
          }}
          className="relative w-11 h-11"
        >
          <Image
            src="/logo.png"
            alt="Maverick Minds, Inc."
            fill
            priority
            quality={100}
            className="object-contain drop-shadow-lg rounded-md"
          />
        </div>
      </div>
      <span className="text-xl font-bold tracking-wide ml-3">
        MAVERICK MINDS, INC.
      </span>
    </span>
  );
}