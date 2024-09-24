import { useState } from "react";
import { Card, CardDescription, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useUSDCBalance } from "@/hooks/useUSDCBalance";
import { useEgUSDBalance } from "@/hooks/useEgUSDBalance";
import { useRedeemUSD } from "@/hooks/useRedeemEgUSD copy";

export function RedeemCard() {
  const [egUSDInputAmount, setEgUSDInputAmount] = useState('')
  const { amount: egUSDBalance, isLoading: isBalanceLoading, isError: balanceError } = useEgUSDBalance();
  const { handleRedeem, isLoading: isMintLoading } = useRedeemUSD();
  const { toast } = useToast();

  const handleSwap = async () => {
    try {
      const success = await handleRedeem(egUSDInputAmount);
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
        <CardTitle>Redeem egUSD</CardTitle>
        <CardDescription>Exchange your egUSD for USDC</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label htmlFor="usdcBalance">egUSD Balance:</Label>
            {isBalanceLoading ? (
              <span>Loading...</span>
            ) : balanceError ? (
              <span>Error fetching balance</span>
            ) : (
              <span>${egUSDBalance}</span>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="egUSDAmount">Amount to redeem:</Label>
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
          disabled={isMintLoading || !egUSDInputAmount || egUSDInputAmount == '0' || isBalanceLoading || !!balanceError || !egUSDBalance}
        >
          {isMintLoading ? 'Redeeming...' : 'Redeem'}
        </Button>
      </CardFooter>
    </Card>
  );
}