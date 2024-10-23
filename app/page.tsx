"use client";

import { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";

import Notiflix from "notiflix";
import { sendBtcTransaction, BitcoinNetworkType, SignTransactionOptions, signTransaction } from 'sats-connect'

import { validate, Network } from 'bitcoin-address-validation';

import WalletContext from "./contexts/WalletContext";
import { NEXT_PUBLIC_API_KEY, NEXT_PUBLIC_BACKEND, NEXT_PUBLIC_ORDINAL_URL, NEXT_PUBLIC_TESTNET, TEST_MODE, WalletTypes } from "./utils/utils";
import { IErr, IRuneBalance } from "./utils/_type";
import { fetchRuneBalance, generatePsbt, transfer } from "./controller";
import axios from "axios";
import { Button, Input, Tab, Link, Card, CardBody, Tabs } from "@nextui-org/react";
import OrdinalComponent from "./components/OrdinalComponent";
import { preCreateRaffle, createRaffle } from "./hooks/use-raffle";
import Image from "next/image";
import Checked from "@/app/assets/check.svg";
import RaffleComponent from "./components/RaffleComponent";
import HistoryRaffleComponent from "./components/HistoryRaffleComponent";

const network = TEST_MODE ? Network.testnet : Network.mainnet;

export default function Page() {

  type keyType = {
    buyerPaymentAddress: string;
    buyerOrdinalAddress: string;
    buyerOrdinalPubkey: string;
    btcAmount: number;
    runeAmount: number;
  };

  const [inscriptions, setinscriptions] = useState<any[]>([])
  const [raffles, setRaffles] = useState<any[]>([])
  const [historyRaffles, setHistoryRaffles] = useState<any[]>([])
  const [selectedinscription, setSelectedinscription] = useState<any>(null)
  const [selected, setSelected] = useState("playing");
  const [ticketPrice, setTicketPrice] = useState("");
  const [ticketAmount, setTicketAmount] = useState("");
  const [ticketDeadline, setTicketDeadline] = useState("");
  const [cur, setCur] = useState(0);

  const {
    walletType,
    ordinalAddress,
    ordinalPublicKey,
    paymentAddress,
    paymentPublicKey,
  } = useContext(WalletContext);

  const isConnected = Boolean(ordinalAddress);
  const getInscriptions = async () => {
    let config = {
      method: "get",
      url: `${NEXT_PUBLIC_TESTNET}/v1/indexer/address/${ordinalAddress}/inscription-data`,
      headers: {
        Authorization: `Bearer ${NEXT_PUBLIC_API_KEY}`,
      },
    };

    const inscriptions = await axios.request(config);
    setinscriptions(inscriptions.data.data.inscription);
  };
  const getRaffles = async () => {
    // const res = await axios.get(`${NEXT_PUBLIC_BACKEND}/api/raffle/get-raffles`);
    const res = await axios.get("http://localhost:9000/api/raffle/get-raffles");
    console.log("kkkk", res.data.raffles, res.data.currentTime);
    setRaffles(res.data.raffles);
    setCur(res.data.currentTime);

  }
  const getHistory = async () => {
    const res = await axios.get("http://localhost:9000/api/raffle/get-raffle-history");
    console.log("kkkk", res.data.raffles);
    setHistoryRaffles(res.data.raffles);
  }
  const handleCrate = async () => {
    if (selectedinscription) {
      console.log(selectedinscription)
      const resp = await preCreateRaffle(
        selectedinscription?.inscriptionId,
        paymentAddress,
        paymentPublicKey,
        ordinalPublicKey,
        walletType
      );
      let signedPSBT;
      switch (walletType) {
        case WalletTypes.UNISAT:
          const currentWindow: any = window;
          const unisat: any = currentWindow?.unisat;
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
                  address: ordinalAddress,
                  signingIndexes: [0, 1],
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
            publicKey: ordinalPublicKey,
            hex: resp.psbtHex,
            network: "testnet",

            signAtIndex: [0, 1],
          };
          const result = await (window as any).btc?.request("signPsbt", requestParams);
          signedPSBT = (result as any).result.hex;
      }

      console.log("we are here", signedPSBT);

      const response = await createRaffle({
        ticketPrice: Number(ticketPrice),
        ticketAmounts: Number(ticketAmount),
        endTime: 60 * Number(ticketDeadline),
        ordinalInscription: selectedinscription?.inscriptionId,
        creatorOrdinalAddress: ordinalAddress,
        creatorPaymentAddress: paymentAddress,
        psbt: resp.psbtHex,
        signedPSBT,
        walletType,
      });
      console.log(response);
      Notiflix.Notify.success("inscription Created");
    } else {
      Notiflix.Notify.failure("Please Select inscription");
    }
  }
  const handleClick = (inscription: any) => {
    if (selectedinscription === inscription) {
      setSelectedinscription(null);
      // alert("1")
    } else {
      // alert("2")
      setSelectedinscription(inscription);
    }
  };
  useEffect(() => {
    getRaffles()
    getHistory()
    ordinalAddress && getInscriptions();
    setSelectedinscription(null);
  }, [ordinalAddress])
  return (
    <div className="p-2">
      {isConnected ? <></> : (
        <div className="flex flex-col gap-2 justify-center items-center text-white">
          Plz connect wallet first
        </div>
      )}
      {isConnected && (
        <div className=" mt-14 ">
          <div className="flex flex-col items-center justify-between pt-4">
            <div className="flex  gap-10 text-center text-white">
              <div className="flex flex-col w-full">
                <Card className="max-w-full w-[700px] h-[680px] bg-[#362544]">
                  <CardBody>
                    <Tabs
                      fullWidth
                      color="secondary"
                      size="lg"
                      aria-label="Tabs form"
                      selectedKey={selected}
                      // @ts-ignore
                      onSelectionChange={setSelected}
                      variant="light"
                      className="border-b-1 border-solid border-[#785296] text-white"
                    >

                      <Tab key="playing" title="Public Raffle" >
                        <div className="flex flex-col gap-4 mt-3">
                          <div className="grid grid-cols-2 gap-3">
                            {
                              raffles?.map((raffle, index) => {
                                return (
                                  <RaffleComponent raffle={{ raffle, cur }} key={index}></RaffleComponent>
                                )
                              })
                            }
                          </div>
                        </div>
                      </Tab>
                      <Tab key="history" title="History">
                        <div className="flex flex-col gap-4 mt-3">
                          <div className="grid grid-row-2 gap-4">
                            {
                              historyRaffles?.map((raffle, index) => (
                                <HistoryRaffleComponent raffle={raffle} key={index}></HistoryRaffleComponent>
                              ))
                            }
                          </div>
                        </div>
                      </Tab>
                      <Tab key="create" title="Create inscription">
                        <div className="flex flex-col gap-4 ">
                          <h1 className="mt-2 text-white text-large ">Select your Ordinal </h1>
                          <div className="grid grid-cols-3 gap-4 mb-3 h-[220px]" >
                            {inscriptions ? inscriptions.map((inscription, index) => {
                              const checked = selectedinscription === inscription;
                              return (
                                <div onClick={() => handleClick(inscription)} key={index} className="relative p-2">
                                  <OrdinalComponent ordinal={inscription} ></OrdinalComponent>
                                  {checked && (
                                    <div className="absolute top-0 left-0 z-10 w-full h-full rounded-lg">
                                      <div className="w-full h-full bg-slate-800 opacity-50 rounded-lg"></div>
                                      <Image
                                        className="absolute -top-2 -right-2"
                                        src={Checked}
                                        width={20}
                                        height={20}
                                        alt="inscription"
                                      />
                                    </div>
                                  )}
                                </div>
                              )
                            }
                            )
                              : <p>No Inscription</p>}
                          </div>
                          <Input isRequired label="Ticket price" placeholder="Enter Ticket price" type="number" name="price" onChange={(e) => setTicketPrice(e.target.value)} />
                          <Input isRequired label="Number of tickets" placeholder="Enter Number of tickets" type="number" name="amount" onChange={(e) => setTicketAmount(e.target.value)} />
                          <Input
                            isRequired
                            label="Time"
                            placeholder="Enter Time"
                            type="number"
                            name="time"
                            onChange={(e) => { setTicketDeadline(e.target.value); console.log(ticketDeadline) }}
                          />
                          <p className="text-center text-small">
                          </p>
                          <div className="flex gap-2 justify-center">
                            <Button fullWidth color="success" variant="bordered" onClick={() => handleCrate()}>
                              Create
                            </Button>
                          </div>
                        </div>
                      </Tab>
                    </Tabs>
                  </CardBody>
                </Card>
              </div>

            </div>
          </div>

        </div>
      )
      }
    </div >
  );
}
