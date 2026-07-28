"use client";

import { useTransition } from "react";
import { toggleVisible } from "./actions";

export default function VisibilityButton({
  id,
  visible,
}: {
  id: number;
  visible: boolean;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => startTransition(() => toggleVisible(id))}
      title={visible ? "Hide from website" : "Show on website"}
      className={`text-xs font-semibold px-2 py-1 rounded-full disabled:opacity-50 ${
        visible
          ? "bg-green-100 text-green-700 hover:bg-green-200"
          : "bg-gray-200 text-gray-600 hover:bg-gray-300"
      }`}
    >
      {visible ? "Visible" : "Hidden"}
    </button>
  );
}
