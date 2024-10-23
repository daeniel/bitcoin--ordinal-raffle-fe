export const fetchRaffleHistory = async (ordinalAddress: string) => {
  console.log("fetching history faffles", ordinalAddress);
  const response = await fetch(`/api/getRaffleHistory`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ordinalAddress,
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

export const fetchRaffles = async () => {
  console.log("fetching faffles");
  const response = await fetch(`/api/raffle`);
  console.log(response);
  if (response.status == 200) {
    const data = await response.json();
    return data;
  } else {
    return undefined;
  }
};

export const preCreateRaffle = async (
  inscriptionId: string,
  paymentAddress: string,
  paymentPublicKey: string,
  ordinalPublicKey: string,
  walletType: string
) => {
  console.log("fetching faffles");
  const response = await fetch(`/api/raffle`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      inscriptionId,
      paymentAddress,
      paymentPublicKey,
      ordinalPublicKey,
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

export const createRaffle = async ({
  ticketPrice,
  ticketAmounts,
  endTime,
  ordinalInscription,
  creatorOrdinalAddress,
  creatorPaymentAddress,
  psbt,
  signedPSBT,
  walletType,
}: {
  ticketPrice: number;
  ticketAmounts: number;
  endTime: number;
  ordinalInscription: string;
  creatorOrdinalAddress: string;
  creatorPaymentAddress: string;
  psbt: string;
  signedPSBT: string;
  walletType: string;
}) => {
  console.log("fetching faffles");
  const response = await fetch(`/api/createRaffle`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
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
  });
  console.log(response);
  if (response.status == 200) {
    const data = await response.json();
    return data;
  } else {
    return undefined;
  }
};
