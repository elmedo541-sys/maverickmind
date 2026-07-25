export default function Loading() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 animate-pulse">
      <div className="h-4 w-32 bg-gray-200 rounded mb-6" />
      <div className="grid md:grid-cols-2 gap-10">
        <div className="h-80 bg-gray-200 rounded-lg" />
        <div className="space-y-4">
          <div className="h-7 w-2/3 bg-gray-200 rounded" />
          <div className="h-4 w-1/3 bg-gray-200 rounded" />
          <div className="h-8 w-1/4 bg-gray-200 rounded" />
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-2/3 bg-gray-200 rounded" />
          <div className="h-11 w-48 bg-gray-200 rounded mt-6" />
        </div>
      </div>
    </div>
  );
}