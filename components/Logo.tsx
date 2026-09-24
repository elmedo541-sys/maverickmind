"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function Logo({ className = "" }: { className?: string }) {
  const floatRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const element = floatRef.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const animation = element.animate(
      [
        { transform: "translateY(0px)" },
        { transform: "translateY(-2px)" },
        { transform: "translateY(0px)" },
      ],
      {
        duration: 3200,
        iterations: Infinity,
        easing: "ease-in-out",
      }
    );

    return () => animation.cancel();
  }, []);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const element = tiltRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const maxTilt = 8;

    setTilt({
      x: (0.5 - y) * maxTilt,
      y: (x - 0.5) * maxTilt,
    });
  }

  function resetLogo() {
    setHovered(false);
    setTilt({ x: 0, y: 0 });
  }

  return (
    <span className={`group flex items-center ${className}`}>
      <div ref={floatRef} className="shrink-0">
        <div style={{ perspective: "600px" }}>
          <div
            ref={tiltRef}
            onMouseEnter={() => setHovered(true)}
            onMouseMove={handleMouseMove}
            onMouseLeave={resetLogo}
            className="relative h-10 w-10 overflow-hidden rounded-[11px] sm:h-11 sm:w-11"
            style={{
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hovered ? 1.05 : 1})`,
              transition: "transform 160ms ease-out, filter 200ms ease",
              transformStyle: "preserve-3d",
              filter: hovered
                ? "drop-shadow(0 8px 12px rgba(0, 168, 255, 0.25))"
                : "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.18))",
            }}
          >
            <Image
              src="/logo.png"
              alt="Maverick Minds, Inc."
              fill
              priority
              quality={100}
              sizes="44px"
              draggable={false}
              className="select-none object-cover scale-[1.06]"
            />

            <span className="pointer-events-none absolute inset-0 rounded-[11px] ring-1 ring-white/10 transition duration-300 group-hover:ring-blue-300/30" />
          </div>
        </div>
      </div>

      <span className="ml-2 text-base font-bold tracking-wide text-white transition-colors duration-300 group-hover:text-blue-100 sm:ml-3 sm:text-lg md:text-xl">
        MAVERICK MINDS, INC.
      </span>
    </span>
  );
}
