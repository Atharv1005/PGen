import { ethers } from "ethers";

export const connectWallet = async (): Promise<string | null> => {

  try {

    if (!window.ethereum) {

      alert("MetaMask not installed");

      return null;

    }

    const provider = new ethers.BrowserProvider(window.ethereum);

    const accounts = await provider.send("eth_requestAccounts", []);

    const address = accounts[0];

    return address;

  } catch (error) {

    console.error(error);

    return null;

  }

};