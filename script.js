// Connect Wallet
function connectWallet() {
    document.getElementById("wallet-address").innerHTML = "Connected: 0x123...456";
}

// Deposit MREC
function depositMREC() {
    let amount = document.getElementById("deposit-amount").value;
    alert(`✅ Deposited ${amount} MREC successfully!`);
}

// Claim Mars Land
function claimLand() {
    const regions = ["Red Dunes", "Crimson Valley", "Celestial Plateau", "Olympus Crater"];
    const randomRegion = regions[Math.floor(Math.random() * regions.length)];
    document.getElementById("land-message").innerHTML = `✅ You now own: <strong>${randomRegion}</strong>`;
}

// Fetch Mars Weather Data (Mock API)
function fetchMarsWeather() {
    document.getElementById("mars-weather").innerHTML = "🌡️ Temperature: -80°C | Wind Speed: 20 m/s | Radiation: High";
}

// Mars Governance Voting System
let votes = 0;
function voteForLaw() {
    votes += 1;
    document.getElementById("vote-count").innerHTML = `Votes: ${votes}`;
}

// Load Mars Data
window.onload = fetchMarsWeather;
