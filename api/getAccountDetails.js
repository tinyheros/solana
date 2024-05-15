import { Connection, PublicKey } from '@solana/web3.js'


export default async function handler(req, res) {
    const connection = new Connection('https://api.mainnet-beta.solana.com');
    try {
        const lamports = await connection.getBalance(new PublicKey(req.body.address));
        const solBalance = lamports / Math.pow(10, 9);
        console.log(solBalance)
        return solBalance;
    } catch (error) {
        console.error('Error fetching SOL balance:', error);
        throw error;
    }
  }