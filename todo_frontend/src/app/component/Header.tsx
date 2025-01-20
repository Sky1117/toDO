import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import web3 from "../utils/web3";

const Header = () => {
  const router = useRouter();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    const checkWalletConnection = async () => {
      try {
        const accounts = await web3.eth.getAccounts();
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        }
      } catch (error) {
        console.error("Failed to fetch wallet accounts:", error);
      }
    };

    checkWalletConnection();
  }, []);

  const handleConnectWallet = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
      } else {
        alert(
          "MetaMask is not installed. Please install it to use this feature."
        );
      }
    } catch (error) {
      console.error("Wallet connection failed:", error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setWalletAddress(null);
    router.push("/login");
  };

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold cursor-pointer">
          <Link href="/">toDo</Link>
        </h1>
        <nav className="flex gap-4 items-center">
          {walletAddress ? (
            <span className="bg-green-500 px-4 py-2 rounded text-sm md:text-base">
              WalletAddress Connected
            </span>
          ) : (
            <button
              onClick={handleConnectWallet}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Connect Wallet
            </button>
          )}
          <button
            onClick={handleLogout}
            className="hover:underline text-white font-semibold"
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
