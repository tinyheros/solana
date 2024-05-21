import { Connection, PublicKey } from '@solana/web3.js';
import { getAssociatedTokenAddress } from '@solana/spl-token';
import Cors from 'micro-cors';

const cors = Cors();
const connection = new Connection('https://api.mainnet-beta.solana.com');

export default cors(async function handler(req, res) {
    try {
        const { address, tokenMintAddress } = req.body;

        if (!address || !tokenMintAddress) {
            return res.status(400).json({ error: 'Missing address or tokenMintAddress in request body' });
        }

        const walletAddress = new PublicKey(address);
        const mintAddress = new PublicKey(tokenMintAddress);
        const tokenAccountAddress = await getAssociatedTokenAddress(mintAddress, walletAddress);
        const tokenAccountInfo = await connection.getParsedAccountInfo(tokenAccountAddress);

        if (tokenAccountInfo.value === null) {
            return res.status(404).json({ error: 'Token account not found' });
        }

        const tokenBalance = tokenAccountInfo.value.data.parsed.info.tokenAmount.uiAmount;

        res.status(200).json({ tiny_balance: tokenBalance });
    } catch (error) {
        console.error('Error fetching token balance:', error);
        res.status(500).json({ error: 'Failed to fetch token balance' });
    }
});
