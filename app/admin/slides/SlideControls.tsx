"use client";

import { useTransition } from "react";
import { moveSlide, toggleSlideActive } from "./actions";

export function MoveButtons({
  id,
  isFirst,
  isLast,
}: {
  id: number;
  isFirst: boolean;
  isLast: boolean;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex flex-col gap-0.5">
      <button
        type="button"
        disabled={pending || isFirst}
        onClick={() => startTransition(() => moveSlide(id, "up"))}
        className="text-gray-500 hover:text-navy disabled:opacity-30 leading-none"
        title="Move up"
      >
        ▲
      </button>
      <button
        type="button"
        disabled={pending || isLast}
        onClick={() => startTransition(() => moveSlide(id, "down"))}
        className="text-gray-500 hover:text-navy disabled:opacity-30 leading-none"
        title="Move down"
      >
        ▼
      </button>
    </div>
  );
}

export function ActiveToggle({ id, active }: { id: number; active: boolean }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => startTransition(() => toggleSlideActive(id))}
      className={`text-xs font-medium px-2 py-1 rounded disabled:opacity-50 ${
        active
          ? "bg-green-100 text-green-700 hover:bg-green-200"
          : "bg-gray-100 text-gray-500 hover:bg-gray-200"
      }`}
    >
      {active ? "Active" : "Hidden"}
    </button>
  );
}