import { NEXT_PUBLIC_API_KEY, NEXT_PUBLIC_TESTNET } from "@/app/utils/utils";
import { NextRequest } from "next/server";

// Fetch a inscriptions using wallet address
export async function GET(
  _request: NextRequest,
  { params }: { params: { slug: string } },
) {
  const slug = params.slug;

  try {
    const axios = require("axios");

    let config = {
      method: "get",
      url: `${NEXT_PUBLIC_TESTNET}/v1/indexer/address/${slug}/inscription-data`,
      headers: {
        Authorization: `Bearer ${NEXT_PUBLIC_API_KEY}`,
      },
    };

    const inscriptions = await axios.request(config);

    return Response.json(inscriptions.data);
  } catch (e) {
    console.log(e);
    return Response.json({ message: "Error in request" }, { status: 400 });
  }
}
