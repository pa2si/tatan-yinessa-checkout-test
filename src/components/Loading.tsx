import React from 'react';

const Loading = () => {
  return (
    <section className="text-center">
      <div className="mt-8 flex justify-center">
        <div className="flex items-center gap-2">
          <svg
            className="animate-spin h-8 w-8 text-purple-600"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          <span className="text-lg text-gray-600">Loading...</span>
        </div>
      </div>
    </section>
  );
};

export default Loading;