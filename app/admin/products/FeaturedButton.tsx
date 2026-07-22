"use client";

import { useTransition } from "react";
import { toggleFeatured } from "./actions";

export default function FeaturedButton({
  id,
  featured,
}: {
  id: number;
  featured: boolean;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => startTransition(() => toggleFeatured(id))}
      title={featured ? "Remove from homepage" : "Feature on homepage"}
      className={`text-lg leading-none disabled:opacity-50 ${
        featured ? "text-yellow-500" : "text-gray-300 hover:text-gray-400"
      }`}
    >
      {featured ? "★" : "☆"}
    </button>
  );
}