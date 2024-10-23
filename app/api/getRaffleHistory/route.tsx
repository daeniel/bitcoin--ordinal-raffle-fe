import { NEXT_PUBLIC_BACKEND } from "@/app/utils/utils";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const axios = require("axios");
    const { ordinalAddress } = await request.json();

    console.log("we are here", ordinalAddress);

    let config = {
      method: "get",
      url: `${NEXT_PUBLIC_BACKEND}/api/raffle/get-raffle-history/${ordinalAddress}`,
    };

    const response = await axios.request(config);
    console.log(response);

    return Response.json(response.data);
  } catch (e) {
    console.log(e);
    return Response.json({ message: "Error in request" }, { status: 400 });
  }
}
