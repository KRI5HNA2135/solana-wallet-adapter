"use client";

import { useWallet } from "../context/WalletContext";
import { useState } from "react";

export default function Home() {
  const { wallet, connect } = useWallet();
  const [status, setStatus] = useState("");

  const handleConnect = () => {
    connect();
  };

  const handleAirdrop = async () => {
    if (!wallet) return;
    setStatus("Airdropping...");
    const sig = await wallet.airdrop();
    setStatus("Airdrop success! Signature: " + sig.slice(0, 8) + "...");
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4 bg-black">
      <button
        onClick={handleConnect}
        className="px-5 py-2 bg-purple-600 text-white rounded"
      >
        Connect Wallet
      </button>

      {wallet && (
        <>
          <p>Wallet Address: {wallet.publicKey()}</p>
          <button
            onClick={handleAirdrop}
            className="px-5 py-2 bg-green-600 text-white rounded"
          >
            Airdrop 1 SOL
          </button>
          <p>{status}</p>
        </>
      )}
    </main>
  );
}

