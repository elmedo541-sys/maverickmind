"use client";

import { useTransition } from "react";
import { deleteSlide } from "./actions";

export default function DeleteButton({ id }: { id: number }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (confirm("Delete this slide? This cannot be undone.")) {
          startTransition(() => deleteSlide(id));
        }
      }}
      className="text-red-600 hover:underline disabled:opacity-50"
    >
      {pending ? "Deleting..." : "Delete"}
    </button>
  );
}