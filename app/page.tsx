"use client";

import { useWallet } from "@/context/WalletContext";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Zap } from "lucide-react";

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
    setStatus(`✅ Airdrop success! Sig: ${sig.slice(0, 6)}...`);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-black px-4 relative overflow-hidden">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-md z-10"
      >
        <Card className="p-6 bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-xl">

          <CardContent className="space-y-6">
            {/* Icon */}
            <Zap className="w-8 h-8 text-purple-500 mx-auto" />

            {/* Heading */}
            <h1 className="text-2xl font-bold text-center text-white">Solana Wallet</h1>

            {/* Not Connected */}
            {!wallet && (
              <button
                onClick={handleConnect}
                className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-500 text-white rounded-md shadow-lg transition-all cursor-pointer"
              >
                Connect Wallet
              </button>
            )}

            {/* Connected View */}
            {wallet && (
              <div className="space-y-4">
                {/* Public Key */}
                <div className="text-xs text-white">
                  <h2 className="mb-1 font-bold">Public Key:</h2>
                  <p className="font-mono break-words text-purple-300">
                    {wallet.publicKey()}
                  </p>
                </div>

                {/* Airdrop Button */}
                <button
                  onClick={handleAirdrop}
                  className="w-full py-2 px-4 bg-green-600 hover:bg-green-500 text-white rounded-md shadow-md transition-all cursor-pointer"
                >
                  Airdrop 1 SOL
                </button>

                {/* Disconnect Button */}
                <button
                  onClick={disconnect}
                  className="w-full py-2 px-4 bg-red-600 hover:bg-red-500 text-white rounded-md shadow-md transition-all cursor-pointer"
                >
                  Disconnect
                </button>

                {/* Status */}
                {status && (
                  <motion.p
                    className="text-sm text-center text-white/70"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {status}
                  </motion.p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </main>
  );
}
