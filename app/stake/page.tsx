"use client"

import { StakeCalculatorCard } from "@/components/StakeCalculatorCard";

export default function Stake() {
  return (
    <div className="flex flex-col flex-grow">
      <div className="flex-grow flex flex-col items-center justify-center bg-gray-100 px-4 py-8">
        <StakeCalculatorCard />
      </div>
    </div>
  );
}