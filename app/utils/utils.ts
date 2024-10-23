export enum WalletTypes {
    UNISAT = "Unisat",
    XVERSE = "Xverse",
    LEATHER = "Leather",
    HIRO = "Hiro",
    OKX = "Okx",
    MAGICEDEN = "Magic eden"
}

export const SIGN_MESSAGE = 'Welcome to RuneX!';
export const TEST_MODE = true;
export type Account = {
    address: string;
    publicKey: string;
    purpose: Purpose;
};
export type Purpose = 'payment' | 'ordinals';

export const NEXT_PUBLIC_API_KEY = "90d62a80dfefd1deabad8bed9c003850fa84daed716f73096d2982acadb23319"
export const NEXT_PUBLIC_MAINNET = "https://open-api.unisat.io"
export const NEXT_PUBLIC_TESTNET = "https://open-api-testnet.unisat.io"
export const NEXT_PUBLIC_ORDINAL_URL = "https://testnet-explorer.ordinalsbot.com/content"
export const NEXT_PUBLIC_BACKEND = "http://localhost:9000"
export const NEXT_PUBLIC_MEMPOOL_URL = "https://ordinalgenesis.mempool.space/"