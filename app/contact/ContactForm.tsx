"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useState } from "react";
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
  const [preferredContact, setPreferredContact] = useState("Email");

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
          How should we contact you back?
        </label>
        <select
          name="preferred_contact"
          value={preferredContact}
          onChange={(e) => setPreferredContact(e.target.value)}
          className="w-full border rounded px-3 py-2"
        >
          <option value="Email">Email</option>
          <option value="Viber">Viber</option>
          <option value="Messenger">Messenger</option>
        </select>
      </div>

      {preferredContact !== "Email" && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {preferredContact === "Viber"
              ? "Viber Number"
              : "Messenger Username or Link"}
          </label>
          <input
            type="text"
            name="contact_detail"
            required
            placeholder={
              preferredContact === "Viber"
                ? "e.g. 09171234567"
                : "e.g. m.me/yourname"
            }
            className="w-full border rounded px-3 py-2"
          />
        </div>
      )}

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