import { NEXT_PUBLIC_BACKEND } from "@/app/utils/utils";
import { NextRequest } from "next/server";
import qs from "qs";

// Fetch a inscriptions using wallet address
export async function GET(_request: NextRequest) {
  try {
    const axios = require("axios");

    let config = {
      method: "get",
      url: `${NEXT_PUBLIC_BACKEND}`,
      // headers: {
      //     'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`
      // }
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
    const {
      ticketPrice,
      ticketAmounts,
      endTime,
      ordinalInscription,
      creatorOrdinalAddress,
      creatorPaymentAddress,
      psbt,
      signedPSBT,
      walletType,
    } = await request.json();
    const axios = require("axios");

    let config = {
      method: "post",
      url: `${NEXT_PUBLIC_BACKEND}/api/raffle/send-ordinal-combine-push`,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: qs.stringify({
        walletType,
        ticketPrice,
        ticketAmounts,
        endTime,
        ordinalInscription,
        creatorOrdinalAddress,
        creatorPaymentAddress,
        psbt,
        signedPSBT,
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
