"use client";

import { useState, useTransition } from "react";
import { renameCategory, deleteCategory, mergeCategory } from "./actions";

type Category = { id: number; categoryName: string; productCount: number };

export default function CategoryRow({
  category,
  allCategories,
}: {
  category: Category;
  allCategories: Category[];
}) {
  const [name, setName] = useState(category.categoryName);
  const [mergeTarget, setMergeTarget] = useState("");
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  const otherCategories = allCategories.filter((c) => c.id !== category.id);

  function handleRename() {
    setError("");
    startTransition(async () => {
      const result = await renameCategory(category.id, name);
      if (result.error) setError(result.error);
    });
  }

  function handleDelete() {
    if (!confirm(`Delete "${category.categoryName}"? This cannot be undone.`)) return;
    setError("");
    startTransition(async () => {
      const result = await deleteCategory(category.id);
      if (result.error) setError(result.error);
    });
  }

  function handleMerge() {
    if (!mergeTarget) return;
    const targetName =
      otherCategories.find((c) => String(c.id) === mergeTarget)?.categoryName ||
      "another category";
    if (
      !confirm(
        `Move all ${category.productCount} product(s) from "${category.categoryName}" into "${targetName}", then delete "${category.categoryName}"?`
      )
    )
      return;
    setError("");
    startTransition(async () => {
      const result = await mergeCategory(category.id, Number(mergeTarget));
      if (result.error) setError(result.error);
    });
  }

  return (
    <tr className="border-t align-top">
      <td className="px-4 py-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded px-2 py-1 text-sm w-full max-w-xs"
          />
          {name !== category.categoryName && (
            <button
              type="button"
              disabled={pending}
              onClick={handleRename}
              className="text-xs bg-navy text-white px-2 py-1 rounded disabled:opacity-50 whitespace-nowrap"
            >
              Save
            </button>
          )}
        </div>
        {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
      </td>
      <td className="px-4 py-3 text-gray-600">{category.productCount}</td>
      <td className="px-4 py-3">
        {otherCategories.length > 0 && (
          <div className="flex gap-2">
            <select
              value={mergeTarget}
              onChange={(e) => setMergeTarget(e.target.value)}
              className="border rounded px-2 py-1 text-sm"
            >
              <option value="">Merge into...</option>
              {otherCategories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.categoryName}
                </option>
              ))}
            </select>
            <button
              type="button"
              disabled={pending || !mergeTarget}
              onClick={handleMerge}
              className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded disabled:opacity-50 whitespace-nowrap"
            >
              Merge
            </button>
          </div>
        )}
      </td>
      <td className="px-4 py-3 text-right">
        <button
          type="button"
          disabled={pending}
          onClick={handleDelete}
          className="text-red-600 hover:underline text-sm disabled:opacity-50"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}