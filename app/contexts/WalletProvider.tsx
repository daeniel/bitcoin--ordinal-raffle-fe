import React, { ReactNode, useState } from "react";
import WalletContext from "./WalletContext";

const WalletProvider = ({ children }: { children: ReactNode }) => {
    const [walletType, setWalletType] = useState("");
    const [paymentAddress, setPaymentAddress] = useState("");
    const [paymentPublicKey, setPaymentPublicKey] = useState("");
    const [ordinalAddress, setOrdinalAddress] = useState("");
    const [ordinalPublicKey, setOrdinalPublicKey] = useState("");

    const logout = () => {
        setPaymentAddress("");
        setWalletType("");
        setPaymentPublicKey("");
        setOrdinalAddress("");
        setOrdinalPublicKey("");
    };

    return (
        <WalletContext.Provider
            value={{
                walletType,
                paymentPublicKey,
                paymentAddress,
                ordinalAddress,
                ordinalPublicKey,
                unisat: {},
                logout,
                setWalletType,
                setPaymentAddress,
                setPaymentPublicKey,
                setOrdinalAddress,
                setOrdinalPublicKey,
            }}
        >
            {children}
        </WalletContext.Provider>
    );
};

export default WalletProvider;
