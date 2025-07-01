import { Keypair, Connection, Transaction, SystemProgram } from "@solana/web3.js";

export class CustomWallet {
  keypair: Keypair;
  connection: Connection;

  constructor() {
    this.keypair = Keypair.generate(); // Random wallet banata hai
    this.connection = new Connection("https://api.devnet.solana.com", "confirmed");
  }

  publicKey() {
    return this.keypair.publicKey.toBase58(); // readable form
  }

  async getBalance() {
    const balance = await this.connection.getBalance(this.keypair.publicKey);
    return balance / 1e9; // lamports to SOL
  }

  async airdrop() {
    const sig = await this.connection.requestAirdrop(this.keypair.publicKey, 1e9);
    await this.connection.confirmTransaction(sig);
    return sig;
  }
}
