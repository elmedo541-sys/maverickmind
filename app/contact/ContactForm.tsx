"use client";

import { useFormState, useFormStatus } from "react-dom";
import { sendMessage, type ContactState } from "./actions";

const initialState: ContactState = { success: false, error: "" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-navy text-white px-6 py-3 rounded font-semibold hover:bg-navyLight disabled:opacity-60"
    >
      {pending ? "Sending..." : "Send Message"}
    </button>
  );
}

export default function ContactForm() {
  const [state, formAction] = useFormState(sendMessage, initialState);

  if (state.success) {
    return (
      <div className="bg-green-50 border border-green-200 text-green-800 rounded p-4">
        Thanks! Your message has been sent. We&apos;ll get back to you soon.
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      {state.error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded p-3 text-sm">
          {state.error}
        </div>
      )}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          type="text"
          name="name"
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          name="email"
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Message
        </label>
        <textarea
          name="message"
          required
          rows={5}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <SubmitButton />
    </form>
  );
}
