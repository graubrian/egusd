import { useState, useMemo, useEffect } from "react";
import { Card, CardDescription, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { fetchEthPrice } from "@/utils/api";

// Constants
const YIELDS_REDIRECTED_TO_RESTAKERS = 0.2; // 20%
const YIELD_DISTRIBUTION_PERCENTAGE = 0.20; // 20%
const BUIDL_YIELD = 0.0432;

export function StakeCalculatorCard() {
  const [stakedInputAmount, setStakedInputAmount] = useState('')
  const [egUSDSupplyInputAmount, setegUSDSupplyInputAmount] = useState('')
  const [ethPrice, setEthPrice] = useState(0);

  useEffect(() => {
    fetchEthPrice().then(setEthPrice);
  }, []);

  const yieldDistributedToRestakers = useMemo(() => {
    const egUSDSupply = parseFloat(egUSDSupplyInputAmount);

    if(isNaN(egUSDSupply)) {
      return 0;
    }

    return ((egUSDSupply * BUIDL_YIELD * YIELD_DISTRIBUTION_PERCENTAGE));
  }, [egUSDSupplyInputAmount]);

  const apr = useMemo(() => {
    const egUSDSupply = parseFloat(egUSDSupplyInputAmount);
    const stakedETH = parseFloat(stakedInputAmount);
    
    if (isNaN(egUSDSupply) || isNaN(stakedETH) || stakedETH === 0 || ethPrice === 0) {
      return 0;
    }

    const stakedAmountInUSD = stakedETH * ethPrice;
    return ((egUSDSupply * BUIDL_YIELD * YIELD_DISTRIBUTION_PERCENTAGE) / stakedAmountInUSD) * 100;
  }, [egUSDSupplyInputAmount, stakedInputAmount, ethPrice]);

  const formatNumber = (num: any) => {
    return num.toLocaleString('en-US', { maximumFractionDigits: 2 });
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Calculate Restake APR</CardTitle>
        <CardDescription>As a restaker you can calculate how much yield your restake would earn at current values</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="space-y-2">
            <Label htmlFor="egUSDSupply">egUSD supply:</Label>
            <Input
              id="egUSDSupply"
              type="number"
              placeholder="Enter amount"
              value={egUSDSupplyInputAmount}
              onChange={(e) => setegUSDSupplyInputAmount(e.target.value)}
              min="0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="stakeAmount">ETH restaked:</Label>
            <Input
              id="stakeAmount"
              type="number"
              placeholder="Enter amount"
              value={stakedInputAmount}
              onChange={(e) => setStakedInputAmount(e.target.value)}
              min="0"
            />
          </div>
          <div className="flex justify-between w-full">
            <span>Underlying TBILL yield:</span>
            <span className="font-bold">{BUIDL_YIELD * 100}%</span>
          </div>
          <div className="flex justify-between w-full">
            <span>% distributed to restakers:</span>
            <span className="font-bold">{(YIELDS_REDIRECTED_TO_RESTAKERS * 100).toFixed(2)}%</span>
          </div>
          <div className="flex justify-between w-full">
            <span>$ distributed to restakers:</span>
            <span className="font-bold">${formatNumber(yieldDistributedToRestakers)}</span>
          </div>
          <div className="flex justify-between w-full">
          <span className="text-xs text-gray-500">Net dollars (includes a 10% operator fee)</span>
          </div>
        </div>
      </CardContent>
      <div className="border-t border-gray-200 mb-4"></div>
      <CardFooter className="flex flex-col items-start space-y-2">
        <div className="flex justify-between w-full">
          <span>APR:</span>
          <span className="font-bold">{formatNumber(apr)}%</span>
        </div>
      </CardFooter>
    </Card>
  );
}