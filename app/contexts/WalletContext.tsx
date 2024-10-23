import { createContext, useContext } from "react";

interface ContextType {
    walletType: string;
    paymentAddress: string;
    paymentPublicKey: string;
    ordinalAddress: string;
    ordinalPublicKey: string;
    unisat: any;
    logout: () => void;
    setWalletType: (walletType: string) => void;
    setPaymentAddress: (address: string) => void;
    setPaymentPublicKey: (publicKey: string) => void;
    setOrdinalAddress: (address: string) => void;
    setOrdinalPublicKey: (publicKey: string) => void;
}

const initialValue: ContextType = {
    walletType: "",
    paymentAddress: "",
    paymentPublicKey: "",
    ordinalAddress: "",
    ordinalPublicKey: "",
    unisat: {},
    logout: () => { },
    setWalletType: (walletType) => { },
    setPaymentAddress: (address) => { },
    setPaymentPublicKey: (publicKey) => { },
    setOrdinalAddress: (address) => { },
    setOrdinalPublicKey: (publicKey) => { },
};

const WalletContext = createContext(initialValue);

export const useWallet = () => {
    return useContext(WalletContext);
};

export default WalletContext;
