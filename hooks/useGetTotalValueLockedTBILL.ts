import { useReadContract } from 'wagmi'
import egusdContracts from '@/contracts/egusd'
import { formatEther } from 'viem'

export function useGetTotalValueLockedTBILL() {
  const { data, error, isLoading } = useReadContract({
    address: egusdContracts.egUsd.address,
    abi: egusdContracts.egUsd.abi,
    functionName: 'getTotalValueLockedTBILL',
  })

  const formattedAmount = data ? (Number(data) / 1e6).toFixed(2) : '0'

  return {
    amount: formattedAmount,
    isLoading,
    isError: !!error,
  }
}