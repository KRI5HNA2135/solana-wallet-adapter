"use client";

import { useWallet } from "../context/WalletContext";
import { useState } from "react";

export default function Home() {
  const { wallet, connect, disconnect } = useWallet();
  const [status, setStatus] = useState("");

  const handleConnect = () => {
    connect();
    setStatus("Wallet connected ✅");
  };

  const handleAirdrop = async () => {
    if (!wallet) return;
    setStatus("Requesting airdrop...");
    const sig = await wallet.airdrop();
    setStatus(`✅ Airdrop successful! Sig: ${sig.slice(0, 8)}...`);
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-400 to-purple-900 text-white px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl space-y-6 border border-white/20">
        <h1 className="text-2xl font-bold text-center text-white">⚡ Solana Dev Wallet</h1>

        {!wallet && (
          <button
            onClick={handleConnect}
            className="w-full py-2 px-4 bg-gray-900 hover:bg-purple-700 rounded-lg transition-all text-white font-semibold"
          >
            Connect Wallet
          </button>
        )}

        {wallet && (
          <div className="space-y-4">
            <div className="bg-white/10 p-4 rounded-lg break-words text-sm border border-white/20">
              <p className="text-xs text-gray-200 mb-1">Public Key:</p>
              <p className="font-mono">{wallet.publicKey()}</p>
            </div>

            <button
              onClick={handleAirdrop}
              className="w-full py-2 px-4 bg-green-500 hover:bg-green-600 rounded-lg transition-all text-white font-semibold"
            >
              Airdrop 1 SOL
            </button>

            <button
              onClick={disconnect}
              className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 rounded-lg transition-all text-white font-semibold"
            >
              Disconnect
            </button>

            <p className="text-sm text-gray-200 text-center">{status}</p>
          </div>
        )}
      </div>
    </main>
  );
}
