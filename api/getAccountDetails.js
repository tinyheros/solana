import { Connection, PublicKey } from '@solana/web3.js'
import Cors from 'micro-cors';

const cors = Cors();

export default cors(async function handler(req, res) {
    res.json({address: "fdfdfdfdfdfdf"})
})








// export default async function handler(req, res) {
//     const connection = new Connection('https://api.mainnet-beta.solana.com');
//     const lamports = await connection.getBalance(new PublicKey(res.body.address));
//     const solBalance = lamports / Math.pow(10, 9);
//     console.log(solBalance)
//     res.json({solBalance})
// }