"use client";

import { useWallet } from "@/context/WalletContext";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
    <main className="min-h-screen flex items-center justify-center bg-black px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <Card className="p-6 shadow-xl border border-muted">
          <CardContent className="space-y-6">
            <h1 className="text-2xl font-bold text-center">Solana Wallet</h1>

            {!wallet && (
              <Button onClick={handleConnect} className="w-full">
                Connect Wallet
              </Button>
            )}

            {wallet && (
              <div className="space-y-4">
                <div className="text-xs text-muted-foreground">
                  <h2 className="mb-1 font-bold text-black">Public Key:</h2>
                  <p className="font-mono break-words">{wallet.publicKey()}</p>
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  Airdrop 1 SOL
                </Button>

                <Button
                  onClick={disconnect}
                  className="w-full"
                  variant="destructive"
                >
                  Disconnect
                </Button>

                {status && (
                  <motion.p
                    className="text-sm text-center text-muted-foreground"
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
