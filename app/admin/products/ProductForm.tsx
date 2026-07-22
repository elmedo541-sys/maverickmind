"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useState, useRef, useEffect } from "react";
import type { ProductFormState } from "./actions";

type Category = { id: number; categoryName: string };
type Brand = { id: number; brandName: string };

type Props = {
  categories: Category[];
  brands: Brand[];
  action: (prevState: ProductFormState, formData: FormData) => Promise<ProductFormState>;
  mode: "create" | "edit";
  defaultValues?: {
    productName?: string;
    modelNumber?: string;
    categoryId?: number | null;
    categoryName?: string;
    brandId?: number | null;
    brandName?: string;
    price?: string;
    quantity?: number;
    description?: string;
    images?: string[];
    featured?: boolean;
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
        ? "Add Product"
        : "Save Changes"}
    </button>
  );
}

const initialState: ProductFormState = { error: "" };

export default function ProductForm({
  categories,
  brands,
  action,
  mode,
  defaultValues,
}: Props) {
  const [state, formAction] = useFormState(action, initialState);

  const [keptUrls, setKeptUrls] = useState<string[]>(defaultValues?.images ?? []);
  const [removedUrls, setRemovedUrls] = useState<string[]>([]);
  const [stagedFiles, setStagedFiles] = useState<File[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!fileInputRef.current) return;
    const dataTransfer = new DataTransfer();
    stagedFiles.forEach((file) => dataTransfer.items.add(file));
    fileInputRef.current.files = dataTransfer.files;
  }, [stagedFiles]);

  function handleFilesChosen(e: React.ChangeEvent<HTMLInputElement>) {
    const picked = Array.from(e.target.files || []);
    if (picked.length === 0) return;
    setStagedFiles((prev) => [...prev, ...picked]);
  }

  function removeKept(url: string) {
    setKeptUrls((prev) => prev.filter((u) => u !== url));
    setRemovedUrls((prev) => [...prev, url]);
  }

  function removeStaged(index: number) {
    setStagedFiles((prev) => prev.filter((_, i) => i !== index));
  }

  const totalPhotoCount = keptUrls.length + stagedFiles.length;

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
          Product Name
        </label>
        <input
          type="text"
          name="product_name"
          required
          defaultValue={defaultValues?.productName}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Model
        </label>
        <input
          type="text"
          name="model_number"
          placeholder="e.g. FA-2200X"
          defaultValue={defaultValues?.modelNumber}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {mode === "create" ? (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <input
              type="text"
              name="category_name"
              list="category-suggestions"
              placeholder="e.g. Fire Alarm Panels"
              defaultValue={defaultValues?.categoryName}
              autoComplete="off"
              className="w-full border rounded px-3 py-2"
            />
            <datalist id="category-suggestions">
              {categories.map((c) => (
                <option key={c.id} value={c.categoryName} />
              ))}
            </datalist>
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              name="category_id"
              defaultValue={defaultValues?.categoryId ?? ""}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.categoryName}
                </option>
              ))}
            </select>
          </div>
        )}

        {mode === "create" ? (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Brand
            </label>
            <input
              type="text"
              name="brand_name"
              list="brand-suggestions"
              placeholder="e.g. Bosch"
              defaultValue={defaultValues?.brandName}
              autoComplete="off"
              className="w-full border rounded px-3 py-2"
            />
            <datalist id="brand-suggestions">
              {brands.map((b) => (
                <option key={b.id} value={b.brandName} />
              ))}
            </datalist>
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Brand
            </label>
            <select
              name="brand_id"
              defaultValue={defaultValues?.brandId ?? ""}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select brand</option>
              {brands.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.brandName}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price (₱)
          </label>
          <input
            type="number"
            name="price"
            step="0.01"
            min="0"
            required
            defaultValue={defaultValues?.price}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quantity
          </label>
          <input
            type="number"
            name="quantity"
            min="0"
            defaultValue={defaultValues?.quantity ?? 0}
            className="w-full border rounded px-3 py-2"
          />
        </div>
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

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="featured"
          name="featured"
          defaultChecked={defaultValues?.featured}
          className="w-4 h-4"
        />
        <label htmlFor="featured" className="text-sm font-medium text-gray-700">
          Feature this product on the homepage
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Photos {totalPhotoCount > 0 && `(${totalPhotoCount})`}
        </label>

        {totalPhotoCount > 0 && (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-3">
            {keptUrls.map((url, i) => (
              <div key={url} className="relative">
                <span className="absolute top-1 left-1 bg-navy text-white text-xs px-1.5 py-0.5 rounded z-10">
                  {i + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeKept(url)}
                  className="absolute top-1 right-1 bg-red-600 text-white text-xs w-5 h-5 rounded-full z-10 leading-none"
                  title="Delete this photo"
                >
                  ×
                </button>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt={`Photo ${i + 1}`}
                  className="w-full h-24 object-cover rounded border"
                />
              </div>
            ))}
            {stagedFiles.map((file, i) => {
              const previewUrl = URL.createObjectURL(file);
              const number = keptUrls.length + i + 1;
              return (
                <div key={`${file.name}-${i}`} className="relative">
                  <span className="absolute top-1 left-1 bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded z-10">
                    {number} new
                  </span>
                  <button
                    type="button"
                    onClick={() => removeStaged(i)}
                    className="absolute top-1 right-1 bg-red-600 text-white text-xs w-5 h-5 rounded-full z-10 leading-none"
                    title="Remove this photo"
                  >
                    ×
                  </button>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={previewUrl}
                    alt={`New photo ${number}`}
                    className="w-full h-24 object-cover rounded border"
                  />
                </div>
              );
            })}
          </div>
        )}

        {removedUrls.map((url) => (
          <input key={url} type="hidden" name="remove_images" value={url} />
        ))}

        <input
          ref={fileInputRef}
          type="file"
          name="images"
          accept=".jpg,.jpeg,.png,.webp"
          multiple
          onChange={handleFilesChosen}
          className="w-full border rounded px-3 py-2 bg-white"
        />
        <p className="text-xs text-gray-500 mt-1">
          Add photos any time — click the file picker again to add more. Click
          the × on a photo to delete it. To replace a photo, delete it and
          add a new one.
        </p>
      </div>

      <SubmitButton mode={mode} />
    </form>
  );
}