import { Connection, PublicKey, Token } from '@solana/web3.js';

export default async function handler(req, res) {
    // Get the address parameter from the request body
    const address = req.body.address;

    // Initialize Solana connection to the cluster
    const connection = new Connection('https://api.mainnet-beta.solana.com');

    // Define the token mint address
    const tokenMintAddress = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');

    try {
        // Fetch the token account balance
        const token = new Token(connection, tokenMintAddress);
        const publicKey = new PublicKey(address);
        const accountInfo = await token.getAccountInfo(publicKey);

        // Check if the account info exists and contains a balance property
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
