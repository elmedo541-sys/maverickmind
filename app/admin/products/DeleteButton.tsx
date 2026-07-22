"use client";

import { useTransition } from "react";
import { deleteProduct } from "./actions";

export default function DeleteButton({ id }: { id: number }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (confirm("Delete this product? This cannot be undone.")) {
          startTransition(() => deleteProduct(id));
        }
      }}
      className="text-red-600 hover:underline disabled:opacity-50"
    >
      {pending ? "Deleting..." : "Delete"}
    </button>
  );
}
