import { useReadContract } from 'wagmi'
import egusdContracts from '@/contracts/egusd'

export function useGetEgUSDTotalSupply() {
  const { data, error, isLoading } = useReadContract({
    address: egusdContracts.egUsd.address,
    abi: egusdContracts.egUsd.abi,
    functionName: 'totalSupply',
  })

  const formattedAmount = data ? (Number(data) / 1e6).toFixed(2) : '0'

  return {
    amount: formattedAmount,
    isLoading,
    isError: !!error,
  }
}