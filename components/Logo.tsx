import Image from "next/image";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`group flex min-w-0 items-center ${className}`}>
      <span className="relative shrink-0">
        <span className="nav-logo-aura absolute inset-0 rounded-xl bg-blue-400/20 blur-md" />

        <span className="nav-logo-motion relative block h-9 w-9 overflow-hidden rounded-[10px] ring-1 ring-white/10 transition duration-300 group-hover:ring-blue-300/40 sm:h-10 sm:w-10">
          <Image
            src="/logo.png"
            alt="Maverick Minds, Inc."
            fill
            priority
            quality={100}
            sizes="40px"
            draggable={false}
            className="select-none object-cover scale-[1.14]"
          />
        </span>
      </span>

      <span className="ml-2.5 truncate text-[13px] font-extrabold tracking-[0.02em] text-white transition-colors duration-300 group-hover:text-blue-100 min-[380px]:text-sm sm:ml-3 sm:text-base lg:text-lg">
        MAVERICK MINDS, INC.
      </span>
    </span>
  );
}
