import Image from 'next/image';
import React from 'react';

const HomeLogoXL = () => {
  return (
    <>
      <Image
        src="/a-fuego-tour-logo.webp"
        alt="Dance class in action"
        width={600}
        height={400}
        className="object-cover w-full h-full"
        priority
      />
    </>
  );
};

export default HomeLogoXL;
