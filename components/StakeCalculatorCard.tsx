import { useState, useMemo } from "react";
import { Card, CardDescription, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function StakeCalculatorCard() {
  const [stakedInputAmount, setStakedInputAmount] = useState('')

  const APY = 0.0086; // 0.86%

  const yearlyYield = useMemo(() => {
    const amount = parseFloat(stakedInputAmount);
    return isNaN(amount) ? 0 : amount * APY;
  }, [stakedInputAmount]);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Calculate restaking yield</CardTitle>
        <CardDescription>As a restaker you can calculate how much yield will you earn at current values</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="stakeAmount">ETH amount to stake:</Label>
            <Input
              id="stakeAmount"
              type="number"
              placeholder="Enter amount"
              value={stakedInputAmount}
              onChange={(e) => setStakedInputAmount(e.target.value)}
              min="0"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start space-y-2">
        <div className="flex justify-between w-full">
          <span>Current APY:</span>
          <span className="font-bold">{(APY * 100).toFixed(2)}%</span>
        </div>
        <div className="flex justify-between w-full">
          <span>Estimated yearly yield:</span>
          <span className="font-bold">{yearlyYield.toFixed(4)} ETH</span>
        </div>
      </CardFooter>
    </Card>
  );
}