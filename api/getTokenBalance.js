import { Connection, PublicKey } from '@solana/web3.js';
import { Token } from '@solana/spl-token';

export default async function handler(req, res) {
    const address = req.body.address;
    const connection = new Connection('https://api.mainnet-beta.solana.com');
    const tokenMintAddress = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');
    try {
        const token = new Token(connection, tokenMintAddress);
        const publicKey = new PublicKey(address);
        const accountInfo = await token.getAccountInfo(publicKey);
        if (accountInfo && accountInfo.amount) {
            const balance = accountInfo.amount.toString();
            console.log(balance)
            return res.json({ balance });
        } else {
            return res.status(404).json({ error: 'Token account not found or has zero balance' });
        }
    } catch (error) {
        console.error('Error fetching token balance:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
