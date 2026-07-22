export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2 ${className}`}>
      <svg width="28" height="28" viewBox="0 0 34 34" fill="none" aria-hidden="true">
        <path
          d="M17 3 L28 7 L28 15 C28 22 23 27 17 30 C11 27 6 22 6 15 L6 7 Z"
          fill="#4f9dff"
        />
        <path
          d="M11 16 L15 20 L23 11"
          stroke="#0b1f3a"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      <span className="text-xl font-bold tracking-wide">MaverickMind</span>
    </span>
  );
}