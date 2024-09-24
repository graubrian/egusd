import { useState } from 'react';
import { useWriteContract } from 'wagmi';
import { parseUnits } from 'viem';
import usdcContracts from '@/contracts/usdc';
import egusdContracts from '@/contracts/egusd';

export function useMintEgUSD() {
  const [isLoading, setIsLoading] = useState(false);

  const { writeContractAsync } = useWriteContract();

  const handleMint = async (amountToMint: string): Promise<boolean> => {
    setIsLoading(true);
    const parsedAmount = parseUnits(amountToMint, 6);
    try {
      // First, approve the egUSD contract to spend USDC
      await writeContractAsync({
        address: usdcContracts.usdc.address,
        abi: usdcContracts.usdc.abi,
        functionName: 'approve',
        args: [egusdContracts.egUsd.address, parsedAmount],
      });

      // Then, mint egUSD
      await writeContractAsync({
        address: egusdContracts.egUsd.address,
        abi: egusdContracts.egUsd.abi,
        functionName: 'mint',
        args: [parsedAmount],
      });
      return true;
    } catch (error) {
      console.error('Failed to mint:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { handleMint, isLoading };
}