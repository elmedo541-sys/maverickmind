export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="bg-navy h-[420px] md:h-[480px]" />
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="h-7 w-48 bg-gray-200 rounded mb-6" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="w-full h-32 bg-gray-200" />
              <div className="p-3 space-y-2">
                <div className="h-3 w-2/3 bg-gray-200 rounded" />
                <div className="h-3 w-1/2 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}