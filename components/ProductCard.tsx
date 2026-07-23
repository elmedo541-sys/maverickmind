import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/formatPrice";

type ProductCardProps = {
  id: number;
  productName: string;
  price: number | string;
  image: string | null;
  categoryName?: string | null;
  brandName?: string | null;
  quantity?: number;
  featured?: boolean;
};

export default function ProductCard({
  id,
  productName,
  price,
  image,
  categoryName,
  brandName,
  quantity,
  featured,
}: ProductCardProps) {
  const showLowStock = typeof quantity === "number" && quantity > 0 && quantity <= 5;
  const showOutOfStock = typeof quantity === "number" && quantity === 0;

  return (
    <Link
      href={`/products/${id}`}
      className="block bg-white rounded-lg shadow hover:shadow-lg transition-all duration-300 overflow-hidden transform hover:-translate-y-1 group"
    >
      <div className="relative w-full h-44 bg-gray-100 overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={productName}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            No image
          </div>
        )}
        {featured && (
          <span className="absolute top-2 left-2 bg-blue-600 text-white text-[11px] font-medium px-2 py-1 rounded">
            Featured
          </span>
        )}
        {showOutOfStock && (
          <span className="absolute top-2 right-2 bg-gray-700 text-white text-[11px] font-medium px-2 py-1 rounded">
            Out of stock
          </span>
        )}
        {showLowStock && (
          <span className="absolute top-2 right-2 bg-amber-500 text-white text-[11px] font-medium px-2 py-1 rounded">
            {quantity} left
          </span>
        )}
      </div>
      <div className="p-4">
        {(categoryName || brandName) && (
          <p className="text-xs text-gray-500 mb-1">
            {categoryName}
            {categoryName && brandName ? " · " : ""}
            {brandName}
          </p>
        )}
        <h3 className="font-semibold text-navy line-clamp-2">{productName}</h3>
        <div className="flex items-center justify-between mt-1">
          <p className="text-blue-700 font-bold">₱{formatPrice(price)}</p>
          <span className="text-xs text-gray-400 group-hover:text-blue-700 transition">
            View &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
}