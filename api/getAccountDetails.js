import { Connection, PublicKey } from '@solana/web3.js';
import { getAssociatedTokenAddress } from '@solana/spl-token';
import Cors from 'micro-cors';

const cors = Cors();

export default cors(async function handler(req, res) {
    const connection = new Connection('https://api.mainnet-beta.solana.com');
    const walletAddress = new PublicKey(req.body.address);

    // Fetching SOL balance
    const lamports = await connection.getBalance(walletAddress);
    const solBalance = lamports / Math.pow(10, 9);

    // Address of the SPL token
    const tokenMintAddress = new PublicKey('D3u7mgroPcbTm62GabAZSLhDS98ybHD9APJLARcdTjXz');

    // Finding the associated token account
    const tokenAccountAddress = await getAssociatedTokenAddress(
        tokenMintAddress,
        walletAddress
    );

    // Fetching SPL token balance
    const tokenAccountInfo = await connection.getParsedAccountInfo(tokenAccountAddress);
    const tinyBalance = tokenAccountInfo.value.data.parsed.info.tokenAmount.uiAmount;

    // Respond with JSON data
    res.status(200).json({
        sol_balance: solBalance,
        tiny_balance: tinyBalance,
        default_address: req.body.address
    });
});
