"use client";

import { useFormState, useFormStatus } from "react-dom";
import type { ServiceFormState } from "./actions";

type Props = {
  action: (prevState: ServiceFormState, formData: FormData) => Promise<ServiceFormState>;
  mode: "create" | "edit";
  defaultValues?: {
    serviceName?: string;
    description?: string;
    image?: string | null;
  };
};

function SubmitButton({ mode }: { mode: "create" | "edit" }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-navy text-white px-6 py-2 rounded font-semibold hover:bg-navyLight disabled:opacity-60"
    >
      {pending
        ? "Saving..."
        : mode === "create"
        ? "Add Service"
        : "Save Changes"}
    </button>
  );
}

const initialState: ServiceFormState = { error: "" };

export default function ServiceForm({ action, mode, defaultValues }: Props) {
  const [state, formAction] = useFormState(action, initialState);

  return (
    <form
      action={formAction}
      encType="multipart/form-data"
      className="bg-white rounded-lg shadow-sm p-6 max-w-2xl space-y-5"
    >
      {state.error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded p-3 text-sm">
          {state.error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Service Name
        </label>
        <input
          type="text"
          name="service_name"
          required
          defaultValue={defaultValues?.serviceName}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          name="description"
          required
          rows={5}
          defaultValue={defaultValues?.description}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Image {mode === "edit" && "(leave blank to keep current image)"}
        </label>
        {defaultValues?.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={defaultValues.image}
            alt="Current"
            className="w-24 h-24 object-cover rounded mb-2"
          />
        )}
        <input
          type="file"
          name="image"
          accept=".jpg,.jpeg,.png,.webp"
          className="w-full border rounded px-3 py-2 bg-white"
        />
      </div>

      <SubmitButton mode={mode} />
    </form>
  );
}
