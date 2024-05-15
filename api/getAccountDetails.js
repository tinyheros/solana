import { Connection, PublicKey } from '@solana/web3.js'


export default async function handler(req, res) {
    const connection = new Connection('https://api.mainnet-beta.solana.com');
    const lamports = await connection.getBalance(new PublicKey("2vU4z8MBhekmvR2LRrJ3ZKNZRXZtwHvuNe2esEG44YCE"));
    const solBalance = lamports / Math.pow(10, 9);
    console.log(solBalance)
    res.json({address: req.body.address, solBalance})
}