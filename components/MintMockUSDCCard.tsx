import { useState } from "react";
import { Card, CardDescription, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useUSDCBalance } from "@/hooks/useUSDCBalance";
import { useMintMockUSDC } from "@/hooks/useMintMockUSDC";

export function MintMockUSDCCard() {
  const [mockUSDCInputAmount, setMockUSDCInputAmount] = useState('')
  const { amount: usdcBalance, isLoading: isBalanceLoading, isError: balanceError } = useUSDCBalance();
  const { handleMint, isLoading: isMintLoading } = useMintMockUSDC();
  const { toast } = useToast();

  const handleMinting = async () => {
    try {
      const success = await handleMint(mockUSDCInputAmount);
      if (success) {
        toast({
          title: "Mint Successful",
          description: "Your MockUSDC has been minted successfully.",
        });
      } else {
        toast({
          title: "Mint Failed",
          description: "There was an error minting your MockUSDC.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error during mint:', error);
      toast({
        title: "Mint Error",
        description: "An unexpected error occurred during the mint.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Issue USDC</CardTitle>
        <CardDescription>Get mock USDC in order to able to exchange it for egUSD</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label htmlFor="usdcBalance">USDC Balance:</Label>
            {isBalanceLoading ? (
              <span>Loading...</span>
            ) : balanceError ? (
              <span>Error fetching balance</span>
            ) : (
              <span>${usdcBalance}</span>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="usdcAmount">Amount of USDC:</Label>
            <Input
              id="usdcAmount"
              type="number"
              placeholder="Enter amount"
              value={mockUSDCInputAmount}
              onChange={(e) => setMockUSDCInputAmount(e.target.value)}
              min="0"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={handleMinting}
          disabled={isMintLoading || !mockUSDCInputAmount || mockUSDCInputAmount == '0' || isBalanceLoading || !!balanceError || !usdcBalance}
        >
          {isMintLoading ? 'Minting...' : 'Mint'}
        </Button>
      </CardFooter>
    </Card>
  );
}