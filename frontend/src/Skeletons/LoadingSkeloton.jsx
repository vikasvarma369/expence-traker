export const LoadingSkeleton = () => {
  return (
    <div className="max-w-screen mx-auto min-h-screen flex justify-center items-center ">
    <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg animate-pulse">
      {/* Heading */}
      <div className="h-8 bg-gray-700 rounded mb-6"></div>
      <div className="h-4 bg-gray-700 rounded mb-4 w-2/3 mx-auto"></div>

      {/* Input Fields */}
      <div className="space-y-4">
        <div className="h-12 bg-gray-700 rounded"></div>
        <div className="h-12 bg-gray-700 rounded"></div>
      </div>

      {/* Button */}
      <div className="mt-6 h-10 bg-gray-700 rounded"></div>

      {/* Footer */}
      <div className="mt-4 h-4 bg-gray-700 rounded w-1/2 mx-auto"></div>
    </div>
  </div>
  );
};
