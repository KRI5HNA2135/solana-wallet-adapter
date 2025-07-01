import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  clusterApiUrl,
  ConfirmOptions,
  sendAndConfirmTransaction,
} from "@solana/web3.js";

export class CustomWallet {
  keypair: Keypair;
  connection: Connection;

  constructor() {
    this.keypair = Keypair.generate(); // Random wallet banavte
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
  const { blockhash, lastValidBlockHeight } = await this.connection.getLatestBlockhash("finalized");

  const sig = await this.connection.requestAirdrop(
    this.keypair.publicKey,
    LAMPORTS_PER_SOL
  );

  await this.connection.confirmTransaction({
    signature: sig,
    blockhash,
    lastValidBlockHeight,
  });

  return sig;
}



}
