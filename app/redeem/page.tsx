"use client"

import { RedeemCard } from "@/components/RedeemCard";

export default function Redeem() {
  return (
    <div className="flex flex-col flex-grow">
      <div className="flex-grow flex flex-col items-center justify-center bg-gray-100 px-4 py-8">
        <RedeemCard />
      </div>
    </div>
  );
}