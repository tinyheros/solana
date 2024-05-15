import { Connection, PublicKey } from '@solana/web3.js'


export default async function handler(req, res) {
    const connection = new Connection('https://api.mainnet-beta.solana.com');
    const lamports = await connection.getBalance(new PublicKey(req.body.address));
    const solBalance = lamports / Math.pow(10, 9);
    console.log(solBalance)
    return res.status(200).json({solBalance})
}