import { Connection, PublicKey } from '@solana/web3.js';
import { getAssociatedTokenAddress } from '@solana/spl-token';
import { programs } from '@metaplex/js';
import fetch from 'node-fetch';
import Cors from 'micro-cors';

const { metadata: { Metadata } } = programs;
const cors = Cors();
const connection = new Connection('https://api.mainnet-beta.solana.com');
const creatorAddress = '2vU4z8MBhekmvR2LRrJ3ZKNZRXZtwHvuNe2esEG44YCE';

export default cors(async function handler(req, res) {
    const walletAddress = new PublicKey(req.body.address);
    const lamports = await connection.getBalance(walletAddress);
    const solBalance = lamports / Math.pow(10, 9);
    const tokenMintAddress = new PublicKey('D3u7mgroPcbTm62GabAZSLhDS98ybHD9APJLARcdTjXz');
    const tokenAccountAddress = await getAssociatedTokenAddress(
        tokenMintAddress,
        walletAddress
    );
    const tokenAccountInfo = await connection.getParsedAccountInfo(tokenAccountAddress);
    const tinyBalance = tokenAccountInfo.value.data.parsed.info.tokenAmount.uiAmount;
    const nftCollection = await findNFTsCreatedBy(walletAddress.toString());
    res.status(200).json({
        sol_balance: solBalance,
        tiny_balance: tinyBalance,
        default_address: req.body.address,
        nft_collection: nftCollection
    });
});

async function findNFTsCreatedBy(walletAddress) {
    const walletPublicKey = new PublicKey(walletAddress);
    const creatorPublicKey = new PublicKey(creatorAddress);
    let nftCollection = [];

    try {
        const accounts = await connection.getParsedTokenAccountsByOwner(walletPublicKey, {
            programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA')
        });

        for (const { account } of accounts.value) {
            let tokenAmount = account.data.parsed.info.tokenAmount;

            if (tokenAmount.uiAmount === 1 && tokenAmount.decimals === 0) {
                const tokenMintAddress = new PublicKey(account.data.parsed.info.mint);
                const metadataAddress = await Metadata.getPDA(tokenMintAddress);

                const metadata = await Metadata.load(connection, metadataAddress);

                if (metadata.data.data.creators.some(creator => creator.address === creatorPublicKey.toString())) {
                    const uri = metadata.data.data.uri;
                    const response = await fetch(uri);
                    const uriMetadata = await response.json();
                    nftCollection.push({
                        mint: tokenMintAddress.toString(),
                        uriMetadata
                    });
                }
            }
        }
    } catch (error) {
        console.error('Failed to find NFTs:', error);
    }

    return nftCollection;
}
