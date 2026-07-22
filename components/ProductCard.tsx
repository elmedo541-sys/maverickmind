import Link from "next/link";
import Image from "next/image";

type ProductCardProps = {
  id: number;
  productName: string;
  price: number | string;
  image: string | null;
  categoryName?: string | null;
};

export default function ProductCard({
  id,
  productName,
  price,
  image,
  categoryName,
}: ProductCardProps) {
  return (
    <Link
      href={`/products/${id}`}
      className="block bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden"
    >
      <div className="relative w-full h-44 bg-gray-100">
        {image ? (
          <Image src={image} alt={productName} fill className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            No image
          </div>
        )}
      </div>
      <div className="p-4">
        {categoryName && (
          <p className="text-xs text-gray-500 mb-1">{categoryName}</p>
        )}
        <h3 className="font-semibold text-navy">{productName}</h3>
        <p className="text-blue-700 font-bold mt-1">₱{Number(price).toFixed(2)}</p>
      </div>
    </Link>
  );
}
