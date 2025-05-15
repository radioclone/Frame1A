async function connectWallet() {
  // Check if MetaMask (or another Ethereum provider) is installed
  if (typeof window.ethereum !== 'undefined') {
    console.log("🔌 MetaMask detected, requesting connection...");

    try {
      // Request account access from MetaMask
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      // Use the first account
      const walletAddress = accounts[0];
      console.log("✅ Wallet connected:", walletAddress);

      // Display connected status
      document.getElementById("wallet-status").textContent =
        `🦊 Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`;
    } catch (error) {
      console.error("❌ Wallet connection failed:", error);
      document.getElementById("wallet-status").textContent = "❌ Connection failed";
    }

  } else {
    // MetaMask not installed
    console.warn("🛑 MetaMask not detected.");
    alert("Please install MetaMask to connect your wallet.");
  }
}
