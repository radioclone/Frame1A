// Lens + Audio + Wallet Connect + Fade Logic

const overlay = document.querySelector("#overlay");
const card = document.querySelector("#card1");
const cardContent = card.querySelector(".card-content");
const hoverSound = document.getElementById("hover-sound");
const clickSound = document.getElementById("click-sound");

// Get the Sync tEE-doGG button and audio elements
const syncButton = document.querySelector(".pill-btn");
const hoverVo1 = document.getElementById("hover-vo1");
const clickVo2 = document.getElementById("click-vo2");

// 🔓 Unlock audio playback on first user interaction
function unlockAudio() {
  // List of audio elements to unlock
  const audioElements = [hoverSound, clickSound, hoverVo1, clickVo2];

  // Play and pause each audio element to unlock them
  audioElements.forEach((audio) => {
    if (audio) {
      audio.play().then(() => audio.pause()).catch((err) => {
        console.warn("Audio unlock failed:", err);
      });
    }
  });

  // Remove the event listeners after unlocking
  document.removeEventListener("click", unlockAudio);
  document.removeEventListener("keydown", unlockAudio);
}

// Add event listeners for user interaction
document.addEventListener("click", unlockAudio);
document.addEventListener("keydown", unlockAudio);

// Mouse movement lens effect + hover sound
card.addEventListener("mousemove", (e) => {
  const rect = card.getBoundingClientRect();
  const mouseX = ((e.clientX - rect.left) / card.offsetWidth) * 100;
  const mouseY = ((e.clientY - rect.top) / card.offsetHeight) * 100;
  const distance = Math.min(Math.sqrt(Math.pow(mouseX - 50, 2) + Math.pow(mouseY - 50, 2)), 50);

  document.documentElement.style.setProperty("--circle-size", `${distance}%`);
  document.documentElement.style.setProperty("--x", `${mouseX}%`);
  document.documentElement.style.setProperty("--y", `${mouseY}%`);
  gsap.to(overlay, { opacity: 1 });

  if (hoverSound.paused) {
    hoverSound.currentTime = 0;
    hoverSound.play();
  }
});

// Fade out content on hover
card.addEventListener("mouseenter", () => {
  gsap.to(cardContent, { opacity: 0, duration: 0.3 });
});

// Reset on lens leave
overlay.addEventListener("mouseleave", () => {
  document.documentElement.style.setProperty("--circle-size", "0%");
  gsap.to(overlay, { opacity: 0 });
  gsap.to(cardContent, { opacity: 1, duration: 0.3 });
});

// Click to trigger sound and full lens
card.addEventListener("click", () => {
  document.documentElement.style.setProperty("--circle-size", "100%");
  clickSound.currentTime = 0;
  clickSound.play();
});

// ✅ Wallet Connect
async function connectWallet() {
  if (typeof window.ethereum !== "undefined") {
    console.log("🔌 MetaMask detected, requesting connection...");

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const walletAddress = accounts[0];
      console.log("✅ Wallet connected:", walletAddress);

      document.getElementById("wallet-status").textContent = `🦊 Connected: ${walletAddress.slice(
        0,
        6
      )}...${walletAddress.slice(-4)}`;
    } catch (error) {
      console.error("❌ Wallet connection failed:", error);
      document.getElementById("wallet-status").textContent = "❌ Connection failed";
    }
  } else {
    console.warn("🛑 MetaMask not detected.");
    alert("Please install MetaMask to connect your wallet.");
  }
}

// 🎵 Add hover and click triggers for Sync tEE-doGG button

// Play Vo1 on hover
syncButton.addEventListener("mouseenter", () => {
  if (hoverVo1) {
    hoverVo1.currentTime = 0; // Rewind to the start
    hoverVo1.play(); // Play the hover sound
  }
});

// Play Vo2 on click
syncButton.addEventListener("click", () => {
  if (clickVo2) {
    clickVo2.currentTime = 0; // Rewind to the start
    clickVo2.play(); // Play the click sound
  }
});