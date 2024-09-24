import { useAccount, useReadContract } from 'wagmi';
import { formatUnits } from 'viem';
import egusdContracts from '@/contracts/egusd'

export function useEgUSDBalance() {
  const { address } = useAccount();

  const { data, error, isLoading } = useReadContract({
    address: egusdContracts.egUsd.address,
    abi: egusdContracts.egUsd.abi,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  });

  const formattedAmount = data ? (Number(data) / 1e6).toFixed(2) : '0';

  return { 
    amount: formattedAmount, 
    isLoading, 
    isError: !!error
  };
}