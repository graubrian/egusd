"use client"
import { useGetTotalValueLockedTBILL } from '@/hooks/useGetTotalValueLockedTBILL';
import { useGetEgUSDTotalSupply } from '@/hooks/useGetEgUSDTotalSupply';
import { Skeleton } from "@/components/ui/skeleton";
import { useEgUSDBalance } from '@/hooks/useEgUSDBalance';

export default function Home() {
  const { amount: tBILLAmount, isLoading: tBILLLockedIsLoading, isError } = useGetTotalValueLockedTBILL();
  const { amount: egUSDAmount, isLoading: egUSDIsLoading, isError: egUSDIsError } = useGetEgUSDTotalSupply();
  const { amount: egUSDBalance, isLoading: egUSDBalanceIsLoading, isError: egUSDBalanceIsError } = useEgUSDBalance();

  return (
    <main className='flex-grow flex md:flex-row flex-col'>
      <div className="flex-grow flex items-center bg-gray-100 p-4 sm:p-8">
        <div className="w-full max-w-xl">
          <div className="space-y-8">
            <div>
              {tBILLLockedIsLoading ? (
                <Skeleton className="h-16 w-48 mb-2" />
              ) : isError ? (
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
          </div>
        </div>
      </div>
      <div className="flex-grow flex items-center bg-gray-100 p-4 sm:p-8">
        <div className="w-full max-w-xl">
          <div className="space-y-8">
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
    </main>
  );
}
