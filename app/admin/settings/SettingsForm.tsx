"use client";

import { useFormState, useFormStatus } from "react-dom";
import { updateContactLinks, type SettingsFormState } from "./actions";

const initialState: SettingsFormState = { error: "" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-navy text-white px-5 py-2 rounded font-semibold hover:bg-navyLight disabled:opacity-60"
    >
      {pending ? "Saving..." : "Save"}
    </button>
  );
}

export default function SettingsForm({
  defaultValues,
}: {
  defaultValues: {
    contactEmail?: string | null;
    messengerUrl?: string | null;
    viberUrl?: string | null;
  };
}) {
  const [state, formAction] = useFormState(updateContactLinks, initialState);

  return (
    <form
      action={formAction}
      className="space-y-4 max-w-lg bg-white rounded-lg shadow-sm p-6"
    >
      {state.error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded p-3 text-sm">
          {state.error}
        </div>
      )}
      {state.success && (
        <div className="bg-green-50 border border-green-200 text-green-800 rounded p-3 text-sm">
          {state.success}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Gmail / Email Address
        </label>
        <input
          type="email"
          name="contact_email"
          defaultValue={defaultValues.contactEmail ?? ""}
          placeholder="maverickminds24@gmail.com"
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Messenger Link
        </label>
        <input
          type="text"
          name="messenger_url"
          defaultValue={defaultValues.messengerUrl ?? ""}
          placeholder="https://m.me/yourpage"
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Viber Link
        </label>
        <input
          type="text"
          name="viber_url"
          defaultValue={defaultValues.viberUrl ?? ""}
          placeholder="viber://chat?number=%2B639985834659"
          className="w-full border rounded px-3 py-2"
        />
        <p className="text-xs text-gray-500 mt-1">
          Use a link like viber://chat?number=%2B63XXXXXXXXXX — include the
          country code, no spaces or dashes.
        </p>
      </div>

      <SubmitButton />
    </form>
  );
}