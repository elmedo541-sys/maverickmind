import Link from "next/link";
import Image from "next/image";

type ProductCardProps = {
  id: number;
  productName: string;
  image: string | null;
  categoryName?: string | null;
  brandName?: string | null;
  featured?: boolean;
};

export default function ProductCard({
  id,
  productName,
  image,
  categoryName,
  brandName,
  featured,
}: ProductCardProps) {
  return (
    <Link
      href={`/products/${id}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#f6f7fb]">
        {image ? (
          <Image
            src={image}
            alt={productName}
            fill
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-gray-400">
            No image
          </div>
        )}

        {featured && (
          <span className="absolute left-3 top-3 rounded-full bg-blue-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
            Featured
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {(categoryName || brandName) && (
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
            {categoryName}
            {categoryName && brandName ? " · " : ""}
            {brandName}
          </p>
        )}

        <h3 className="line-clamp-2 text-sm font-bold leading-5 text-navy sm:text-base">
          {productName}
        </h3>

        <div className="mt-auto flex items-center justify-between pt-5">
          <span className="text-xs font-semibold text-blue-700">View details</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-700 transition group-hover:bg-blue-600 group-hover:text-white">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
