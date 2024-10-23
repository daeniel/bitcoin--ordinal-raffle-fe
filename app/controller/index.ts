export const fetchRuneBalance = async (ordinalAddress: string) => {
    try {
        console.log("fetchRuneBalance in controller ==> ", ordinalAddress)
        const response = await fetch(`/api/fetchRuneBalance`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ordinalAddress
            }),
        });
        if (response.status == 200) {
            const data = await response.json();
            console.log("response in controller ==> ", data);
            return data;
        } else {
            return undefined;
        }
    } catch (error) {
        return undefined
    }
};

export const generatePsbt = async () => {
    try {
        console.log("fetchRuneBalance in controller ==> ")
        const response = await fetch(`/api/pre-Transfer`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({}),
        });
        if (response.status == 200) {
            const data = await response.json();
            console.log("response in controller ==> ", data);
            return data;
        } else {
            return undefined;
        }
    } catch (error) {
        console.log("error ==> ", error);
    }
}

export const transfer = async (psbt: string, signedPsbt: string, walletType: string) => {
    try {
        console.log("fetchRuneBalance in controller ==> ")
        const response = await fetch(`/api/transfer`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                psbt, signedPsbt, walletType
            }),
        });
        if (response.status == 200) {
            const data = await response.json();
            console.log("response in controller ==> ", data);
            return data;
        } else {
            return undefined;
        }
    } catch (error) {
        console.log("error ==> ", error);
    }
}