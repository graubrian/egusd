import { useState } from 'react';
import { useWriteContract } from 'wagmi';
import { parseUnits } from 'viem';
import usdcContracts from '@/contracts/usdc';
import egusdContracts from '@/contracts/egusd';

export function useRedeemUSD() {
  const [isLoading, setIsLoading] = useState(false);

  const { writeContractAsync } = useWriteContract();

  const handleRedeem = async (amountToMint: string): Promise<boolean> => {
    setIsLoading(true);
    const parsedAmount = parseUnits(amountToMint, 6);
    try {
      // Redeem egUSD
      await writeContractAsync({
        address: egusdContracts.egUsd.address,
        abi: egusdContracts.egUsd.abi,
        functionName: 'redeem',
        args: [parsedAmount],
      });
      return true;
    } catch (error) {
      console.error('Failed to redeem:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { handleRedeem, isLoading };
}