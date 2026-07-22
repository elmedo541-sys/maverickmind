"use client";

import { useFormState, useFormStatus } from "react-dom";
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
    brandId?: number | null;
    brandName?: string;
    price?: string;
    quantity?: number;
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

        {mode === "create" ? (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Brand
            </label>
            <input
              type="text"
              name="brand_name"
              placeholder="e.g. Bosch"
              defaultValue={defaultValues?.brandName}
              className="w-full border rounded px-3 py-2"
            />
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
