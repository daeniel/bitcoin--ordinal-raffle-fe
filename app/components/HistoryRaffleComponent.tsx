"use client"
import React, { useRef, useState, useEffect, useContext } from "react";
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

const HistoryRaffleComponent = (props: any) => {

    const custom = (str: string) => {
        return str.slice(0, 10) + "..." + str.slice(str.length - 10, str.length);
    }
    return (
        <div className="flex  bg-[#512E6D] border-3 rounded-2xl overflow-hidden border-[#362544] border-solid hover:border-[#8257E5]">
            <img
                className="w-[182px] h-[182px] block"
                src={`${NEXT_PUBLIC_ORDINAL_URL}/${props.raffle.ordinalInscription}`}
            />
            <div className=" p-3 max-w-full">
                <p className="text-[#826ABF] font-medium">NFT Id</p>
                <p className="text-[#82C61A] " >{custom(props.raffle.ordinalInscription)}</p>

                <p className="text-[#826ABF] font-medium text-medium">Tickets Selled</p>
                <p className="text-[#82C61A] text-lg font-medium">{props.raffle.ticketList.length}/{props.raffle.ticketAmounts}</p>
                <p className="text-[#826ABF] font-medium">Winner</p>
                <p className="text-[#82C61A] text-xl font-medium">{props.raffle.ticketList.length ? custom(props.raffle.winner) : "No Winner"}</p>

                <div className="flex justify-center">
                </div>
            </div>
        </div>
    )
}

export default HistoryRaffleComponent;