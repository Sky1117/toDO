import Web3 from "web3";

let web3: Web3;

if (
  typeof window !== "undefined" &&
  typeof (window as any).ethereum !== "undefined"
) {
  web3 = new Web3((window as any).ethereum);

  (window as any).ethereum
    .request({ method: "eth_requestAccounts" })
    .catch((error: any) => {
      console.error("User denied account access:", error);
    });
} else {
  const fallbackUrl = "http://localhost:8545";
  web3 = new Web3(new Web3.providers.HttpProvider(fallbackUrl));
  console.warn(
    "MetaMask not detected. Falling back to local provider at:",
    fallbackUrl
  );
}

export default web3;
