export const preBuyTickets = async ({
  buyerPayPubkey,
  buyerOrdinalAddress,
  buyerOrdinalPubkey,
  ticketCounts,
  _id,
  walletType,
}: {
  buyerPayPubkey: string;
  buyerOrdinalAddress: string;
  buyerOrdinalPubkey: string;
  ticketCounts: number;
  _id: string;
  walletType: string;
}) => {
  console.log("fetching faffles");
  const response = await fetch(`/api/preBuyTickets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      buyerPayPubkey,
      buyerOrdinalAddress,
      buyerOrdinalPubkey,
      ticketCounts,
      _id,
      walletType,
    }),
  });
  console.log(response);
  if (response.status == 200) {
    const data = await response.json();
    return data;
  } else {
    return undefined;
  }
};

export const buyTickets = async ({
  _id,
  buyerOrdinalAddress,
  psbt,
  signedPSBT,
  ticketCounts,
  walletType,
}: {
  _id: string;
  buyerOrdinalAddress: string;
  psbt: string;
  signedPSBT: string;
  ticketCounts: number;
  walletType: string;
}) => {
  console.log("fetching faffles");
  const response = await fetch(`/api/buyTickets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      _id,
      buyerOrdinalAddress,
      psbt,
      signedPSBT,
      ticketCounts,
      walletType,
    }),
  });
  console.log(response);
  if (response.status == 200) {
    const data = await response.json();
    return data;
  } else {
    return undefined;
  }
};
