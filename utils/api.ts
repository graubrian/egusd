const API_KEY = 'CG-vMJCUfe7bZsRmapgu8Ebhwj8';

export async function fetchEthPrice(): Promise<number> {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd', {
      headers: {
        'accept': 'application/json',
        'x-cg-demo-api-key': API_KEY
      }
    });
    const data = await response.json();
    return data.ethereum.usd;
  } catch (error) {
    console.error('Error fetching ETH price:', error);
    return 2000; // Fallback price if API call fails
  }
}