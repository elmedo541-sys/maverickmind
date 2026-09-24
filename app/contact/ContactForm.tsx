"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useState } from "react";
import { sendMessage, type ContactState } from "./actions";

const initialState: ContactState = { success: false, error: "" };

const fieldClassName =
  "w-full min-h-12 rounded-xl border border-gray-200 bg-[#f8f9fb] px-4 py-3 text-base text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-100 sm:text-sm";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-sm transition active:scale-[0.99] hover:bg-blue-500 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
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
      <div className="rounded-2xl border border-green-200 bg-green-50 p-5 text-sm font-medium text-green-800 animate-fade-in-up" role="status">
        Your message has been sent. We&apos;ll get back to you as soon as we can.
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      {state.error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700" role="alert">
          {state.error}
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-semibold text-navy">
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            required
            autoComplete="name"
            placeholder="Your full name"
            className={fieldClassName}
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-semibold text-navy">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            required
            autoComplete="email"
            inputMode="email"
            placeholder="you@example.com"
            className={fieldClassName}
          />
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="preferred_contact" className="mb-2 block text-sm font-semibold text-navy">
            Preferred contact method
          </label>
          <select
            id="preferred_contact"
            name="preferred_contact"
            value={preferredContact}
            onChange={(event) => setPreferredContact(event.target.value)}
            className={fieldClassName}
          >
            <option value="Email">Email</option>
            <option value="Viber">Viber</option>
            <option value="Messenger">Messenger</option>
          </select>
        </div>

        {preferredContact !== "Email" ? (
          <div>
            <label htmlFor="contact_detail" className="mb-2 block text-sm font-semibold text-navy">
              {preferredContact === "Viber" ? "Viber Number" : "Messenger Username or Link"}
            </label>
            <input
              id="contact_detail"
              type="text"
              name="contact_detail"
              required
              inputMode={preferredContact === "Viber" ? "tel" : "url"}
              autoComplete={preferredContact === "Viber" ? "tel" : "off"}
              placeholder={preferredContact === "Viber" ? "e.g. 09171234567" : "e.g. m.me/yourname"}
              className={fieldClassName}
            />
          </div>
        ) : (
          <div className="hidden md:block" aria-hidden="true" />
        )}
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-semibold text-navy">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={7}
          placeholder="Product, model, quantity or project requirement..."
          className={`${fieldClassName} min-h-40 resize-y`}
        />
      </div>

      <div className="flex flex-col gap-4 border-t border-gray-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-lg text-xs leading-5 text-gray-500">
          Include a working email, Viber number or Messenger account so we can reply to your inquiry.
        </p>
        <SubmitButton />
      </div>
    </form>
  );
}
