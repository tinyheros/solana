import { Connection, PublicKey, web3 } from '@solana/web3.js'
import Cors from 'micro-cors';

const cors = Cors();

export default cors(async function handler(req, res) {
        const connection = new Connection('https://api.mainnet-beta.solana.com');

        //SOl balance
        const lamports = await connection.getBalance(new PublicKey(req.body.address));
        const solBalance = lamports / Math.pow(10, 9);


        //Tiny balance
        const walletAddress = new web3.PublicKey('2vU4z8MBhekmvR2LRrJ3ZKNZRXZtwHvuNe2esEG44YCE')
        const tokenMintAddress = new web3.PublicKey('D3u7mgroPcbTm62GabAZSLhDS98ybHD9APJLARcdTjXz');
        const tokenAccountAddress = await splToken.getAssociatedTokenAddress(
            tokenMintAddress,
            walletAddress
        );
        const tokenAccountInfo = await connection.getParsedAccountInfo(tokenAccountAddress);
        const tinyBalance = tokenAccountInfo.value.data.parsed.info.tokenAmount.uiAmount;

        res.status(200).json({
            sol_balance: solBalance,
            tiny_balance: tinyBalance,
            default_address: req.body.address
        })
})