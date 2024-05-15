import Cors from 'micro-cors';

const cors = Cors();

export default cors(async function handler(req, res) {
  return res.json({ message: "Solana API" });
});
