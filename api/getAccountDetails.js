import { Connection, PublicKey } from '@solana/web3.js'
import Cors from 'micro-cors';

const cors = Cors();

export default cors(async function handler(req, res) {
    console.log(req.body.address)
        const connection = new Connection('https://api.mainnet-beta.solana.com');
        const lamports = await connection.getBalance(new PublicKey(req.body.address));
        const solBalance = lamports / Math.pow(10, 9);
        res.status(200).json({
            balance: solBalance,
            address: req.body.address
        })
})