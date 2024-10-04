"use client"

import Link from 'next/link';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-black text-white py-2 px-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="mr-4">
            <Image src="/logo.svg" alt="Logo" width={60} height={60} /> {/* Increased size */}
          </Link>
          <button
            className="md:hidden mr-2 h-full flex items-center"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <nav className={`${isOpen ? 'block' : 'hidden'} md:block`}>
            <ul className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0">
              <li><Link href="/" className="hover:text-gray-300">Stats</Link></li>
              <li><Link href="/mint" className="hover:text-gray-300">Mint</Link></li>
              <li><Link href="/redeem" className="hover:text-gray-300">Redeem</Link></li>
              <li><a href="https://riquelmista.notion.site/Eager-Protocol-Whitepaper-Draft-1040d179251580da9dd5e8e2f4eef98a?pvs=4" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">Whitepaper</a></li>
            </ul>
          </nav>
        </div>
        <div className={`${isOpen ? 'hidden' : 'block'} md:block`}>
          <ConnectButton label="Connect" accountStatus="address" showBalance={false}/>
        </div>
      </div>
    </header>
  );
}