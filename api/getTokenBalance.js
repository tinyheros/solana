import { Connection, PublicKey } from '@solana/web3.js';
import { getAssociatedTokenAddress } from '@solana/spl-token';
import Cors from 'micro-cors';

const cors = Cors();
const connection = new Connection('https://api.mainnet-beta.solana.com');

export default cors(async function handler(req, res) {
    const walletAddress = new PublicKey(req.body.address);
    const tokenMintAddress = new PublicKey(req.body.token);
    const tokenAccountAddress = await getAssociatedTokenAddress(
        tokenMintAddress,
        walletAddress
    );
    const tokenAccountInfo = await connection.getParsedAccountInfo(tokenAccountAddress);
    const tinyBalance = tokenAccountInfo.value.data.parsed.info.tokenAmount.uiAmount;

    res.status(200).json({
        tiny_balance: tinyBalance,
        default_address: req.body.address,
    });
});