// Scroll-trigger logic for table animation
const cryptoTable = document.getElementById('crypto-table');
window.addEventListener('scroll', () => {
  const sectionPosition = cryptoTable.getBoundingClientRect().top;
  const screenPosition = window.innerHeight / 1.2;

  if (sectionPosition < screenPosition) {
    cryptoTable.classList.add('active');
  }
});

// Static cryptocurrency data including BCoin and other popular coins
const staticData = [
  {
    rank: 1,
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 100037, // Example price for Bitcoin
    high_24h: 104089,
    low_24h: 99089
  },
  {
    rank: 2,
    name: 'Ethereum',
    symbol: 'ETH',
    price: 3996, // Example price for Ethereum
    high_24h: 4025,
    low_24h: 3959
  },
  
  {
    rank: 3, // Rank for XRP
    name: 'XRP',
    symbol: 'XRP',
    price: 2.56, // Your custom coin price
    high_24h: 2.62,
    low_24h: 2.46
  },
  {
    rank: 4,
    name: 'Dogecoin',
    symbol: 'DOGE',
    price: 0.48419709, // Example price for Dogecoin
    high_24h: 0.48419709,
    low_24h: 0.44690711
  },
 {
    rank: 120,
    name: 'BCoin',
    symbol: 'BCN',
    price: 0.459, // Example price for BTN
    high_24h: 0.497,
    low_24h: 0.409
  },
];

// Fetch data from CoinGecko API and merge it with static data
const fetchCryptoData = async () => {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
    );
    const data = await response.json();

    // Merge real-time data with static data
    const combinedData = [...staticData, ...data];
    populateCryptoTable(combinedData);
  } catch (error) {
    console.error('Error fetching crypto data:', error);
  }
};

// Populate table with fetched data
const populateCryptoTable = (data) => {
  const tbody = document.querySelector('#crypto-table table tbody');
  tbody.innerHTML = ''; // Clear any existing rows

  data.forEach((crypto) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${crypto.rank}</td>
      <td>${crypto.name}</td>
      <td>${crypto.symbol.toUpperCase()}</td>
      <td>$${crypto.price.toLocaleString()}</td>
      <td>$${crypto.high_24h.toLocaleString()}</td>
      <td>$${crypto.low_24h.toLocaleString()}</td>
    `;
    tbody.appendChild(row);
  });
};

// Initialize the script
document.addEventListener('DOMContentLoaded', () => {
  fetchCryptoData(); // Fetch and populate the crypto data
});

// Update the BCoin price dynamically (this is a mockup for live data)
document.addEventListener('DOMContentLoaded', () => {
  const bcoinPrice = document.getElementById('bcoin-price-value');
  const priceFluctuation = document.getElementById('price-fluctuation');

  setInterval(() => {
    const price = (Math.random() * (0.5 - 0.4) + 0.4).toFixed(3); // Random price between $0.4 and $0.5
    bcoinPrice.textContent = `$${price}`;

    const fluctuation = (Math.random() * 6 - 3).toFixed(1); // Random fluctuation between -3% to 3%
    priceFluctuation.textContent = `24h Change: ${fluctuation}%`;

    // Change color based on positive or negative fluctuation
    if (fluctuation > 0) {
      priceFluctuation.style.color = '#00b400'; // Green for positive
    } else {
      priceFluctuation.style.color = '#ff0000'; // Red for negative
    }
  }, 3000); // Updates every 3 seconds
});

// Investment Calculator Logic
document.getElementById('calculate-btn').addEventListener('click', () => {
  const investmentAmount = document.getElementById('investment-amount').value;
  if (investmentAmount && !isNaN(investmentAmount)) {
    const bcoinPrice = 0.459; // Static BCoin price for demonstration
    const amountOfBcoin = (investmentAmount / bcoinPrice).toFixed(4);
    document.getElementById('result').textContent = `You can buy ${amountOfBcoin} BCoin for $${investmentAmount}.`;
  } else {
    document.getElementById('result').textContent = 'Please enter a valid amount.';
  }
});

// Mobile menu toggle script (if you plan to use a hamburger menu)
document.querySelector('.btn-menu .icon').addEventListener('click', () => {
  const nav = document.querySelector('header nav');
  nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
});
