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
      className="touch-no-lift group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl active:scale-[0.99]"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#f6f7fb]">
        {image ? (
          <Image
            src={image}
            alt={productName}
            fill
            sizes="(max-width: 430px) 50vw, (max-width: 768px) 33vw, (max-width: 1280px) 25vw, 17vw"
            className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.04] sm:p-4"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center px-3 text-center text-xs text-gray-400 sm:text-sm">
            No image
          </div>
        )}

        {featured && (
          <span className="absolute left-2 top-2 rounded-full bg-blue-600 px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-white shadow-sm sm:left-3 sm:top-3 sm:px-2.5 sm:text-[10px]">
            Featured
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-3.5 sm:p-5">
        {(categoryName || brandName) && (
          <p className="mb-1.5 line-clamp-1 text-[10px] font-semibold uppercase tracking-wide text-gray-400 sm:mb-2 sm:text-[11px]">
            {categoryName}
            {categoryName && brandName ? " · " : ""}
            {brandName}
          </p>
        )}

        <h3 className="line-clamp-2 text-sm font-bold leading-5 text-navy sm:text-base sm:leading-6">
          {productName}
        </h3>

        <div className="mt-auto flex min-h-10 items-end justify-between gap-2 pt-3 sm:pt-5">
          <span className="text-[11px] font-semibold text-blue-700 sm:text-xs">View details</span>
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm text-blue-700 transition group-hover:bg-blue-600 group-hover:text-white" aria-hidden="true">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
