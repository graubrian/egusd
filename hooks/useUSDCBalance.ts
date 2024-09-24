import { useAccount, useReadContract } from 'wagmi';
import usdcContracts from '@/contracts/usdc';

export function useUSDCBalance() {
  const { address } = useAccount();

  const { data, error, isLoading } = useReadContract({
    address: usdcContracts.usdc.address,
    abi: usdcContracts.usdc.abi,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  });

  const formattedAmount = data ? (Number(data) / 1e6).toFixed(2) : '0'

  return { 
    amount: formattedAmount,
    isLoading,
    isError: !!error,
  };
}