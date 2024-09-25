import Link from 'next/link';
import { ConnectButton } from "@rainbow-me/rainbowkit";

export function Navbar() {
  return (
    <header className="bg-black text-white py-2 px-4 flex justify-between items-center">
      <nav>
        <ul className="flex space-x-4">
          <li><Link href="/" className="hover:text-gray-300">Stats</Link></li>
          <li><Link href="/mint" className="hover:text-gray-300">Mint</Link></li>
          <li><Link href="/redeem" className="hover:text-gray-300">Redeem</Link></li>
          <li><Link href="/stake" className="hover:text-gray-300">Stake</Link></li>
          <li><Link href="/utils" className="hover:text-gray-300">Utils</Link></li>
          <li><Link href="/whitepaper" className="hover:text-gray-300">Whitepaper</Link></li>
        </ul>
      </nav>
      <ConnectButton label="Connect" accountStatus="address" showBalance={false}/>
    </header>
  );
}