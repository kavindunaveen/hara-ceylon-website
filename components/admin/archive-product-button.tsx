"use client";

import { Archive } from "lucide-react";
import { softDeleteProduct } from "@/app/admin/products/actions";

export function ArchiveProductButton({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  return (
    <form action={softDeleteProduct} className="inline">
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        title="Archive"
        className="p-2 rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600"
        onClick={(e) => {
          if (!confirm(`Archive “${title}”? It will disappear from the shop.`)) {
            e.preventDefault();
          }
        }}
      >
        <Archive className="h-4 w-4" />
      </button>
    </form>
  );
}
