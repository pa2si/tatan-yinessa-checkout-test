import Image from 'next/image';
import React from 'react';

const HomeLogo = () => {
  return (
    <div className="relative w-full max-w-lg">
      <div className="absolute inset-0 bg-purple-300 rounded-3xl rotate-6 transform "></div>
      <div className="absolute inset-0 bg-purple-400 rounded-3xl -rotate-6 transform "></div>
      <div className="relative bg-purple-200 rounded-3xl overflow-hidden ">
        <Image
          src="/a-fuego-tour-logo.webp"
          alt="Dance class in action"
          width={600}
          height={400}
          className="object-cover w-full h-full p-20   "
          priority
        />
      </div>
    </div>
  );
};

export default HomeLogo;
