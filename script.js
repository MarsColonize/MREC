/* Web3.js Integration & Presale Logic */
let web3;
let userAddress;

async function connectWallet() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            userAddress = accounts[0];
            document.getElementById('wallet-address').innerText = `Connected: ${userAddress}`;
        } catch (error) {
            console.error('User denied wallet connection');
        }
    } else {
        alert('Please install MetaMask to interact');
    }
}

async function buyMREC(paymentMethod) {
    const amount = document.getElementById('purchase-amount').value;
    if (!userAddress) {
        alert('Connect your wallet first!');
        return;
    }
    
    try {
        let transaction;
        if (paymentMethod === 'bnb') {
            transaction = await web3.eth.sendTransaction({
                from: userAddress,
                to: '0xYourPresaleContractAddress',
                value: web3.utils.toWei(amount, 'ether')
            });
        } else if (paymentMethod === 'usdt') {
            const usdtContract = new web3.eth.Contract(usdtAbi, '0xUSDTContractAddress');
            transaction = await usdtContract.methods.transfer('0xYourPresaleContractAddress', web3.utils.toWei(amount, 'mwei')).send({ from: userAddress });
        }
        document.getElementById('purchase-status').innerText = '✅ Purchase successful!';
    } catch (error) {
        console.error(error);
        document.getElementById('purchase-status').innerText = '❌ Transaction failed!';
    }
}

function generateReferralLink() {
    if (!userAddress) {
        alert('Connect your wallet first!');
        return;
    }
    const referralLink = `${window.location.origin}?ref=${userAddress}`;
    document.getElementById('referral-link').innerText = referralLink;
}

// Countdown Timer
function updateCountdown() {
    const presaleEnd = new Date('2025-12-31T23:59:59Z').getTime();
    const now = new Date().getTime();
    const timeLeft = presaleEnd - now;
    
    if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        document.getElementById('countdown').innerText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    } else {
        document.getElementById('countdown').innerText = 'Presale Ended';
    }
}
setInterval(updateCountdown, 1000);

// Fetch Market Data
async function fetchMarketPrice() {
    document.getElementById('market-price').innerText = 'Fetching latest data...';
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=mrec&vs_currencies=usd');
        const data = await response.json();
        document.getElementById('market-price').innerText = `MREC Price: $${data.mrec.usd}`;
    } catch (error) {
        console.error('Error fetching market data:', error);
    }
}
fetchMarketPrice();
setInterval(fetchMarketPrice, 30000);
