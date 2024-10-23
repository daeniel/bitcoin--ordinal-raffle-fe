import { NEXT_PUBLIC_BACKEND } from "@/app/utils/utils";
import { NextRequest } from "next/server";
import qs from "qs";

export async function POST(request: NextRequest) {
  try {
    const {
      buyerOrdinalAddress,
      ticketCounts,
      _id,
      psbt,
      signedPSBT,
      walletType,
    } = await request.json();
    const axios = require("axios");

    let config = {
      method: "post",
      url: `${NEXT_PUBLIC_BACKEND}/api/raffle/buy-tickets-combine-push`,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: qs.stringify({
        _id,
        buyerOrdinalAddress,
        psbt,
        signedPSBT,
        ticketCounts,
        walletType,
      }),
    };

    const response = await axios.request(config);

    return Response.json(response.data);
  } catch (error) {
    console.error("Error creating user: ", error);
    return Response.json({ message: "Failed to create user" }, { status: 409 });
  }
}
