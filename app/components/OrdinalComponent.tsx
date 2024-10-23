"use client"
import React, { useRef, useState, useEffect } from "react";
import { IRuneBalance } from "../utils/_type";
import { Button, Link, Select, SelectItem } from "@nextui-org/react";
import Notiflix from "notiflix";
import { Image } from "@nextui-org/react";

import {
    BitcoinNetworkType,
    RpcErrorCode,
} from "sats-connect";
import Wallet from "sats-connect"
import { NEXT_PUBLIC_ORDINAL_URL, WalletTypes } from "../utils/utils";
import axios from "axios";
import { blob } from "stream/consumers";

const OrdinalComponent = (props: any) => {

    return (
        <Image
            alt="Card background"
            className="object-cover rounded-xl "
            width={200}
            height={200}
            src={`${NEXT_PUBLIC_ORDINAL_URL}/${props.ordinal.inscriptionId}`}
        />
    )
}

export default OrdinalComponent;