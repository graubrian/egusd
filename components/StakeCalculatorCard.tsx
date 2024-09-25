import { useState, useMemo } from "react";
import { Card, CardDescription, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function StakeCalculatorCard() {
  const [stakedInputAmount, setStakedInputAmount] = useState('')

  const TBILLS_LOCKED = 10000000; // 10 million
  const TBILLS_APY = 0.0432; // 4.32%
  const YIELD_DISTRIBUTION_PERCENTAGE = 0.20; // 20%
  const CURRENT_STAKED_ETH = 32;
  // const ETH_PRICE = 2500; // Current ETH price

  const yearlyYield = useMemo(() => {
    const additionalStakedAmount = parseFloat(stakedInputAmount);
    if (isNaN(additionalStakedAmount)) return 0;

    const totalYield = TBILLS_LOCKED * TBILLS_APY;
    const distributedYield = totalYield * YIELD_DISTRIBUTION_PERCENTAGE;
    const totalStakedETH = CURRENT_STAKED_ETH + additionalStakedAmount;
    const userShare = additionalStakedAmount / totalStakedETH;
    
    return distributedYield * userShare;
  }, [stakedInputAmount]);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Calculate restaking yield</CardTitle>
        <CardDescription>As a restaker you can calculate how much yield you will earn at current values</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="stakeAmount">Additional ETH amount to stake:</Label>
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
          <span>Current TBILLs APY:</span>
          <span className="font-bold">{(TBILLS_APY * 100).toFixed(2)}%</span>
        </div>
        <div className="flex justify-between w-full">
          <span>Current Total Staked ETH:</span>
          <span className="font-bold">{CURRENT_STAKED_ETH} ETH</span>
        </div>
        <div className="flex justify-between w-full">
          <span>Estimated yearly egUSD rewards:</span>
          <span className="font-bold">${yearlyYield.toFixed(2)}</span>
        </div>
        {/* <div className="flex justify-between w-full">
          <span>Estimated yearly ETH rewards:</span>
          <span className="font-bold">{(yearlyYield / ETH_PRICE).toFixed(4)} ETH</span>
        </div> */}
      </CardFooter>
    </Card>
  );
}