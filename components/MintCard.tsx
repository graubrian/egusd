import { useState } from "react";
import { Card, CardDescription, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMintEgUSD } from "@/hooks/useMintEgUSD";
import { useToast } from "@/hooks/use-toast";
import { useUSDCBalance } from "@/hooks/useUSDCBalance";

export function MintCard() {
  const [egUSDInputAmount, setEgUSDInputAmount] = useState('')
  const { amount: usdcBalance, isLoading: isBalanceLoading, isError: balanceError } = useUSDCBalance();
  const { handleMint, isLoading: isMintLoading } = useMintEgUSD();
  const { toast } = useToast();

  const handleSwap = async () => {
    try {
      const success = await handleMint(egUSDInputAmount);
      if (success) {
        toast({
          title: "Swap Successful",
          description: "Your egUSD has been minted successfully.",
        });
      } else {
        toast({
          title: "Swap Failed",
          description: "There was an error minting your egUSD.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error during swap:', error);
      toast({
        title: "Swap Error",
        description: "An unexpected error occurred during the swap.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Issue egUSD</CardTitle>
        <CardDescription>Get yield bearing egUSD in exchange of USDC</CardDescription>
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
            <Label htmlFor="egUSDAmount">Amount of egUSD:</Label>
            <Input
              id="egUSDAmount"
              type="number"
              placeholder="Enter amount"
              value={egUSDInputAmount}
              onChange={(e) => setEgUSDInputAmount(e.target.value)}
              min="0"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={handleSwap}
          disabled={isMintLoading || !egUSDInputAmount || egUSDInputAmount == '0' || isBalanceLoading || !!balanceError || !usdcBalance}
        >
          {isMintLoading ? 'Swapping...' : 'Swap'}
        </Button>
      </CardFooter>
    </Card>
  );
}