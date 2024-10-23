import { NEXT_PUBLIC_BACKEND } from "@/app/utils/utils";
import { NextRequest } from "next/server";
import qs from "qs";

// Fetch a inscriptions using wallet address
export async function GET(_request: NextRequest) {
  try {
    const axios = require("axios");

    let config = {
      method: "get",
      url: `${NEXT_PUBLIC_BACKEND}/api/raffle/get-raffles`,
    };

    const response = await axios.request(config);
    console.log(response);

    return Response.json(response.data);
  } catch (e) {
    console.log(e);
    return Response.json({ message: "Error in request" }, { status: 400 });
  }
}

// Fetch a inscriptions using wallet address

export async function POST(request: NextRequest) {
  try {
    const { inscriptionId, paymentAddress, paymentPublicKey, ordinalPublicKey, walletType } =
      await request.json();
    const axios = require("axios");

    let config = {
      method: "post",
      url: `${NEXT_PUBLIC_BACKEND}/api/raffle/send-ordinal`,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: qs.stringify({
        walletType,
        ordinalInscription: inscriptionId,
        creatorPaymentAddress: paymentAddress,
        creatorPaymentPubkey: paymentPublicKey,
        creatorOrdinalPubkey: ordinalPublicKey,
      }),
    };
    console.log(config);
    const response = await axios.request(config);
    console.log(response);

    return Response.json(response.data);
  } catch (error) {
    console.error("Error creating user: ", error);
    return Response.json({ message: "Failed to create user" }, { status: 409 });
  }
}
