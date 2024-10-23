"use client"
import React, { useRef, useState, useEffect, useContext } from "react";
import { IRuneBalance } from "../utils/_type";
import { Button, Card, Link, Select, SelectItem } from "@nextui-org/react";
import Notiflix from "notiflix";
import { Image } from "@nextui-org/react";

import {
    BitcoinNetworkType,
    RpcErrorCode,
    signTransaction,
    SignTransactionOptions,
} from "sats-connect";
import Wallet from "sats-connect"
import { NEXT_PUBLIC_ORDINAL_URL, WalletTypes } from "../utils/utils";
import axios from "axios";
import { blob } from "stream/consumers";
import { preBuyTickets, buyTickets } from "../hooks/use-ticket";
import WalletContext from "../contexts/WalletContext";

const RaffleComponent = (props: any) => {
    const [time, setTime] = useState(props.raffle.raffle.endTime - props.raffle.cur);
    const {
        walletType,
        ordinalAddress,
        ordinalPublicKey,
        paymentAddress,
        paymentPublicKey,
    } = useContext(WalletContext);
    const buyTicket = async () => {
        const tCounts = Number(1);
        const currentWindow: any = window;
        const unisat: any = currentWindow?.unisat;
        const buyerPayPubkey = paymentPublicKey;
        const buyerOrdinalPubkey = ordinalPublicKey;
        const buyerOrdinalAddress = ordinalAddress;
        console.log(buyerPayPubkey, buyerOrdinalPubkey, walletType);
        if (props.raffle.raffle && tCounts > 0) {
            console.log(props.raffle.raffle, tCounts);
            const resp = await preBuyTickets({
                buyerPayPubkey,
                buyerOrdinalAddress,
                buyerOrdinalPubkey,
                ticketCounts: tCounts,
                _id: props.raffle.raffle._id,
                walletType,
            });
            console.log(resp);
            if (resp.psbtHex) {
                let signedPSBT;
                switch (walletType) {
                    case WalletTypes.UNISAT:
                        signedPSBT = await unisat.signPsbt(resp.psbtHex);
                        break;
                    case WalletTypes.XVERSE:
                        const signPsbtOptions: SignTransactionOptions = {
                            payload: {
                                network: {
                                    type: BitcoinNetworkType.Testnet,
                                },
                                message: "Sign Transaction",
                                psbtBase64: resp.psbtBase64,
                                broadcast: false,
                                inputsToSign: [
                                    {
                                        address: paymentAddress,
                                        signingIndexes: resp.buyerPaymentsignIndexes,
                                    },
                                ],
                            },
                            onFinish: (response: any) => {
                                console.log(response);
                                signedPSBT = response.psbtBase64;
                            },
                            onCancel: () => alert("Canceled"),
                        };

                        await signTransaction(signPsbtOptions);
                        break;
                    case WalletTypes.HIRO:
                        const requestParams = {
                            publicKey: paymentPublicKey,
                            hex: resp.psbtHex,
                            network: "testnet",

                            signAtIndex: resp.buyerPaymentsignIndexes,
                        };
                        //@ignore ts
                        const result = await (window as any).btc?.request("signPsbt", requestParams);
                        signedPSBT = (result as any).result.hex;
                }
                const response = await buyTickets({
                    _id: props.raffle.raffle._id,
                    buyerOrdinalAddress,
                    psbt: resp.psbtHex,
                    signedPSBT,
                    ticketCounts: tCounts,
                    walletType,
                });
                console.log(response);
            }
        }

    }
    const custom = (str: string) => {

        return str.slice(0, 10) + "..." + str.slice(str.length - 10, str.length);
    }



    useEffect(() => {
        const interval = setInterval(() => {
            setTime(time - 1000)
        }, 1000);
        return () => clearInterval(interval);
    }, [time])

    return (
        <div className="bg-[#512E6D] border-3 rounded-2xl overflow-hidden border-[#362544] border-solid hover:border-[#8257E5]">
            <img
                className="w-full h-[329px]"
                src={`${NEXT_PUBLIC_ORDINAL_URL}/${props.raffle.raffle.ordinalInscription}`}
            />
            <div className=" p-3">
                <p className="text-[#826ABF] font-medium">NFT Id</p>
                <p className="text-[#82C61A]">{custom(props.raffle.raffle.ordinalInscription)}</p>
                <p className="text-[#826ABF] font-medium">End Time</p>
                <p className="text-[#82C61A] text-xl font-medium">After {time ? (Math.floor(time / (24 * 60 * 60000)) + "d : " + Math.floor((time % (24 * 60 * 60000)) / (60 * 60000)) + "h : " + Math.floor(((time % (24 * 60 * 60000)) % (60 * 60000)) / (60000)) + "m : " + Math.floor((((time % (24 * 60 * 60000)) % (60 * 60000)) % (60000)) / 1000) + "s") : "Finished Raffle"}</p>
                <div className="flex justify-between">
                    <p className="text-[#826ABF] font-medium">Tickets Remaining</p>
                    <p className="text-[#826ABF] font-medium">Ticket Price</p>
                </div>
                <div className="flex justify-between">
                    <p className="text-[#82C61A] text-xl font-medium">{props.raffle.raffle.ticketAmounts - props.raffle.raffle.ticketList.length}/{props.raffle.raffle.ticketAmounts}</p>
                    <p className="text-[#82C61A] text-xl font-medium">{props.raffle.raffle.ticketPrice} $</p>
                </div>
                <div className="flex justify-center">

                    <Button color="success" variant="bordered" onClick={buyTicket}>Buy Ticket</Button>
                </div>
            </div>
        </div>
    )
}

export default RaffleComponent;