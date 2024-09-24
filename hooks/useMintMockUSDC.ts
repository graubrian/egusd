import { useState } from 'react';
import { useWriteContract } from 'wagmi';
import { parseUnits } from 'viem';
import usdcContracts from '@/contracts/usdc';

export function useMintMockUSDC() {
  const [isLoading, setIsLoading] = useState(false);

  const { writeContractAsync } = useWriteContract();

  const handleMint = async (amountToMint: string): Promise<boolean> => {
    setIsLoading(true);
    const parsedAmount = parseUnits(amountToMint, 6);
    try {
      // Then, mint mockUSDC
      await writeContractAsync({
        address: usdcContracts.usdc.address,
        abi: usdcContracts.usdc.abi,
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