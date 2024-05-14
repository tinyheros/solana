import type { VercelRequest, VercelResponse } from '@vercel/node'

export default function handler(req: VercelRequest, res: VercelResponse) {




  return res.json({
    nfts: `All the NFTs for this app`,
  })
}