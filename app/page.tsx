"use client"
import { useGetTotalValueLockedTBILL } from '@/hooks/useGetTotalValueLockedTBILL';
import { useGetEgUSDTotalSupply } from '@/hooks/useGetEgUSDTotalSupply';
import { Skeleton } from "@/components/ui/skeleton";
import { StakeCalculatorCard } from '@/components/StakeCalculatorCard';

export default function Home() {
  const { amount: tBILLAmount, isLoading: tBILLLockedIsLoading, isError: tBILLIsError } = useGetTotalValueLockedTBILL();
  const { amount: egUSDAmount, isLoading: egUSDIsLoading, isError: egUSDIsError } = useGetEgUSDTotalSupply();

  return (
    <main className='flex-grow flex flex-col'>
      {/* New section with title and paragraph */}
      <section className="bg-gray-100 py-16 px-8 text-center">
        <h1 className="text-5xl font-extrabold my-8">Yield Distribution Infrastructure for the future of the digital economy</h1>
        <p className="text-lg text-gray-700">
        The Eager Protocol is a Yield Distribution protocol that functions as on-chain insurance, providing decentralized fallback protection for various yield-bearing assets in case of insolvency or failure.
        </p>
        <p className="text-lg text-blue-700 italic">
        egUSD is the 1st product built on top of Eager: A pioneering hybrid stablecoin designed to offer unmatched stability by blending the strengths of both centralized and decentralized assets
        </p>
      </section>

      {/* Existing section with financial data and calculator */}
      <div className="flex-grow flex flex-col md:flex-row">
        <div className="flex-grow flex items-center bg-gray-100 p-4 sm:p-8 md:w-1/2">
          <div className="w-full max-w-xl">
            <div className="space-y-8">
              <div>
                {tBILLLockedIsLoading ? (
                  <Skeleton className="h-16 w-48 mb-2" />
                ) : tBILLIsError ? (
                  <p className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-2 text-red-500">Error fetching data</p>
                ) : (
                  <p className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-2">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(tBILLAmount))}
                  </p>
                )}
                <h2 className="text-base sm:text-lg text-gray-600">TBILLs TVL</h2>
              </div>
              <div>
                {egUSDIsLoading ? (
                  <Skeleton className="h-16 w-48 mb-2" />
                ) : egUSDIsError ? (
                  <p className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-2 text-red-500">Error fetching data</p>
                ) : (
                  <p className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-2">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(egUSDAmount))}
                  </p>
                )}
                <h2 className="text-base sm:text-lg text-gray-600">egUSD Supply</h2>
              </div>
              <div>
                <p className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-2">
                  {new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Number("32"))}
                </p>
                <h2 className="text-base sm:text-lg text-gray-600">ETH Restaked</h2>
              </div>
              <div>
                <p className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-2">
                  {new Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(4.32 / 100)}
                </p>
                <h2 className="text-base sm:text-lg text-gray-600">egUSD APY</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-grow flex items-center justify-center bg-gray-100 p-4 sm:p-8 md:w-1/2">
          <StakeCalculatorCard />
        </div>
      </div>
    </main>
  );
}
