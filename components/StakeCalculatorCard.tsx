import { useState, useMemo } from "react";
import { Card, CardDescription, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function StakeCalculatorCard() {
  const [stakedInputAmount, setStakedInputAmount] = useState('')

  const TBILLS_LOCKED = 10000000; // 10 million
  const YIELDS_REDIRECTED_TO_RESTAKERS = 0.2; // 4.32%
  const YIELD_DISTRIBUTION_PERCENTAGE = 0.20; // 20%
  const CURRENT_STAKED_ETH = 32;
  // const ETH_PRICE = 2500; // Current ETH price

  const yearlyYield = useMemo(() => {
    const additionalStakedAmount = parseFloat(stakedInputAmount);
    if (isNaN(additionalStakedAmount) || additionalStakedAmount === 0) return 0;

    const ETH_PRICE = 2500; // Assuming current ETH price, you may want to fetch this dynamically
    const TBILL_APY = 0.0432; // 4.32% APY for tBill
    const PROPORTION_REDIRECTED = 0.2; // 20% redirected to restakers

    const totalYield = 10000000 * TBILL_APY * PROPORTION_REDIRECTED;
    const totalStakedETH = CURRENT_STAKED_ETH + additionalStakedAmount;
    const userShare = additionalStakedAmount / totalStakedETH;

    const userYield = totalYield * userShare;
    const userStakeValue = additionalStakedAmount * ETH_PRICE;

    return (userYield / userStakeValue) * 100; // Convert to percentage APY
  }, [stakedInputAmount]);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Current Restake APR</CardTitle>
        <CardDescription>As a restaker you can calculate how much yield you restakers would earn at current values</CardDescription>
      </CardHeader>
      <CardContent>

        <div className="space-y-2">
          <div className="flex justify-between w-full">
            <span>Amount of ETH currently staked:</span>
            <span className="font-bold">{CURRENT_STAKED_ETH} ETH</span>
          </div>
          <div className="flex justify-between w-full">
            <span>Yield redirected to restakers:</span>
            <span className="font-bold">{(YIELDS_REDIRECTED_TO_RESTAKERS * 100).toFixed(2)}%</span>
          </div>
          <div className="space-y-2">
            <Label htmlFor="stakeAmount">Amount of stEth to restake:</Label>
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
          <span>APR:</span>
          <span className="font-bold">{yearlyYield.toFixed(2)}%</span>
        </div>
        {/* <div className="flex justify-between w-full">
          <span>Estimated yearly ETH rewards:</span>
          <span className="font-bold">{(yearlyYield / ETH_PRICE).toFixed(4)} ETH</span>
        </div> */}
      </CardFooter>
    </Card>
  );
}