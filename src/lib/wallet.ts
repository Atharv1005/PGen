import { ethers } from "ethers";

export const connectWallet = async (): Promise<string> => {

  if (!window.ethereum) {
    throw new Error("METAMASK_NOT_INSTALLED");
  }

  const provider = new ethers.BrowserProvider(window.ethereum);

  const accounts = await provider.send("eth_requestAccounts", []);

  return accounts[0];

};

export const sendCrypto = async (
  recipientAddress: string,
  amount: string
): Promise<string> => {

  if (!window.ethereum) {
    throw new Error("METAMASK_NOT_INSTALLED");
  }

  const provider = new ethers.BrowserProvider(window.ethereum);

  const network = await provider.getNetwork();

  // Sepolia chainId
  if (network.chainId !== 11155111n) {
    throw new Error("WRONG_NETWORK");
  }

  const signer = await provider.getSigner();

  const tx = await signer.sendTransaction({
    to: recipientAddress,
    value: ethers.parseEther(amount)
  });

  await tx.wait();

  return tx.hash;

};