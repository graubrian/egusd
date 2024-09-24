"use client"

import { MintCard } from "@/components/MintCard";

export default function Mint() {
  return (
    <div className="flex flex-col flex-grow">
      <div className="flex-grow flex flex-col items-center justify-center bg-gray-100 px-4 py-8">
        <MintCard />
      </div>
    </div>
  );
}