import { Connection, PublicKey } from '@solana/web3.js';
import { Token } from '@solana/spl-token';
import Cors from 'micro-cors';

const cors = Cors();

export default cors(async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { address } = req.body;

    if (!address) {
        return res.status(400).json({ error: 'Address is required' });
    }

    const tokenProgramId = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'; // Use the provided token program ID

    try {
        const connection = new Connection('https://api.mainnet-beta.solana.com');

        // Get SOL balance
        const solLamports = await connection.getBalance(new PublicKey(address));
        const solBalance = solLamports / Math.pow(10, 9);

        // Get SPL Token balance
        const token = new Token(connection, new PublicKey(tokenProgramId), null, []);
        const tokenAccount = await token.getAccountInfo(new PublicKey(address));
        const tokenBalance = tokenAccount ? tokenAccount.amount.toNumber() / Math.pow(10, 6) : 0;

        res.status(200).json({
            sol_balance: solBalance,
            tiny_balance: tokenBalance,
            default_address: address
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
