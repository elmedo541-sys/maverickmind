"use client";

import { useFormState, useFormStatus } from "react-dom";
import type { SlideFormState } from "./actions";

type Props = {
  action: (prevState: SlideFormState, formData: FormData) => Promise<SlideFormState>;
  mode: "create" | "edit";
  defaultValues?: {
    title?: string;
    subtitle?: string;
    linkUrl?: string;
    linkLabel?: string;
    active?: boolean;
    image?: string;
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
      {pending ? "Saving..." : mode === "create" ? "Add Slide" : "Save Changes"}
    </button>
  );
}

const initialState: SlideFormState = { error: "" };

export default function SlideForm({ action, mode, defaultValues }: Props) {
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
          Title (optional)
        </label>
        <input
          type="text"
          name="title"
          placeholder="e.g. New CCTV Camera Series"
          defaultValue={defaultValues?.title}
          className="w-full border rounded px-3 py-2"
        />
        <p className="text-xs text-gray-500 mt-1">
          Leave blank to show just the full image with no text overlay.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Subtitle (optional)
        </label>
        <input
          type="text"
          name="subtitle"
          placeholder="e.g. Full-color night vision, now in stock"
          defaultValue={defaultValues?.subtitle}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Button Link (optional)
          </label>
          <input
            type="text"
            name="link_url"
            placeholder="e.g. /products/5 or /contact"
            defaultValue={defaultValues?.linkUrl}
            className="w-full border rounded px-3 py-2"
          />
          <p className="text-xs text-gray-500 mt-1">
            Leave blank to show the slide with no button.
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Button Text (optional)
          </label>
          <input
            type="text"
            name="link_label"
            placeholder="e.g. View Product"
            defaultValue={defaultValues?.linkLabel}
            className="w-full border rounded px-3 py-2"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="active"
          name="active"
          defaultChecked={defaultValues?.active ?? true}
          className="w-4 h-4"
        />
        <label htmlFor="active" className="text-sm font-medium text-gray-700">
          Show this slide on the homepage
        </label>
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
            className="w-full max-w-sm h-32 object-cover rounded border mb-2"
          />
        )}
        <input
          type="file"
          name="image"
          accept=".jpg,.jpeg,.png,.webp"
          className="w-full border rounded px-3 py-2 bg-white"
        />
        <p className="text-xs text-gray-500 mt-1">
          Recommended: a wide banner photo, roughly 21:9 ratio (e.g. 1920×820px),
          so it fills the slideshow edge-to-edge without cropping important
          parts of the image.
        </p>
      </div>

      <SubmitButton mode={mode} />
    </form>
  );
}