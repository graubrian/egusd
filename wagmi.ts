import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { holesky } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains: [
    holesky,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [
      {
        id: 31337,
        name: 'Local',
        network: 'localhost',
        nativeCurrency: {
          decimals: 18,
          name: 'Ether',
          symbol: 'ETH',
        },
        rpcUrls: {
          default: { http: ['http://localhost:8545'] },
          public: { http: ['http://localhost:8545'] },
        },
      }
    ] : [])
  ],
  ssr: true
});