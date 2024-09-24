"use client"

import { MintMockUSDCCard } from "@/components/MintMockUSDCCard";

export default function Utils() {
  return (
    <div className="flex flex-col flex-grow">
      <div className="flex-grow flex flex-col items-center justify-center bg-gray-100 px-4 py-8">
        <MintMockUSDCCard />
      </div>
    </div>
  );
}