/* <!-- ====="use client";
import React from "react";
import SingleBrand from "./SingleBrand";
import brandData from "./brandData";

const Brands = () => {
  return (
    <>
      {/* <!-- ===== Clients Start }
      <section className="border border-x-0 border-y-stroke bg-alabaster py-11 dark:border-y-strokedark dark:bg-black">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="grid grid-cols-3 items-center justify-center gap-7.5 md:grid-cols-6 lg:gap-12.5 xl:gap-29">
            {brandData.map((brand, key) => (
              <SingleBrand brand={brand} key={key} />
            ))}
          </div>
        </div>
      </section>
      {/* <!-- ===== Clients End }
    </>
  );
};

export default Brands;
===== --> */

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const countries = [

  { code: '🇺🇸', label: 'USA', enabled: true, path: '/usa' },
  { code: '🇪🇸', label: 'España', enabled: false },
  { code: '🇨🇦', label: 'Canadá', enabled: false },
  { code: '🇬🇧', label: 'Reino Unido', enabled: false },
  { code: '🇫🇷', label: 'Francia', enabled: false },
  { code: '🇮🇹', label: 'Italia', enabled: false },
];

export default function FlagEmojiSelector() {
  const router = useRouter();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleClick = (country: any) => {
    if (country.enabled && country.path) {
      router.push(country.path);
    }
  };

  return (
    <div className="w-full px-4 py-4 relative">
      <div className="flex justify-between items-center w-full max-w-6xl mx-auto">
        {countries.map((country, index) => (
          <div
            key={index}
            className="relative flex flex-col items-center"
            onMouseEnter={() => !country.enabled && setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <button
              title={country.label}
              disabled={!country.enabled}
              onClick={() => handleClick(country)}
              className={`text-7xl p-4 rounded-full transition-transform shadow-lg
                ${country.enabled 
                  ? 'bg-white hover:scale-110 cursor-pointer' 
                  : 'bg-gray-200 opacity-40 cursor-not-allowed'}`}
            >
              {country.code}
            </button>

            {/* Tooltip "Próximamente" */}
            {!country.enabled && hoveredIndex === index && (
              <div className="absolute top-full mt-2 px-3 py-1 text-sm bg-gray-800 text-white rounded shadow-md">
                Próximamente
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
