"use client";

import React, { createContext, useContext, useState } from "react";
import { CustomWallet } from "../lib/wallet";

const WalletContext = createContext<any>(null);

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [wallet, setWallet] = useState<CustomWallet | null>(null);

  const connect = () => {
    const w = new CustomWallet();
    setWallet(w);
  };

  const disconnect = () => {
   setWallet(null); // disconnect houn jail
  }

  return (
    <WalletContext.Provider value={{ wallet, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
