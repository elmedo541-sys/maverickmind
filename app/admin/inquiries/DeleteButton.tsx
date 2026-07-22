"use client";

import { useTransition } from "react";
import { deleteInquiry } from "./actions";

export default function DeleteButton({ id }: { id: number }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (confirm("Delete this inquiry?")) {
          startTransition(() => deleteInquiry(id));
        }
      }}
      className="text-red-600 hover:underline disabled:opacity-50"
    >
      {pending ? "Deleting..." : "Delete"}
    </button>
  );
}
