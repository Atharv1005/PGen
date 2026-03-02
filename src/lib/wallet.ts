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

export const sendCrypto = async (
  recipientAddress: string,
  amount: string
): Promise<string | null> => {

  try {

    if (!window.ethereum) {
      alert("MetaMask not installed");
      return null;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);

    const network = await provider.getNetwork();

    // Sepolia chain ID = 11155111
    if (network.chainId !== 11155111n) {
      alert("Please switch MetaMask to Sepolia Testnet");
      return null;
    }

    const signer = await provider.getSigner();

    const tx = await signer.sendTransaction({
      to: recipientAddress,
      value: ethers.parseEther(amount)
    });

    await tx.wait();

    return tx.hash;

  } catch (error) {
    console.error(error);
    return null;
  }
};