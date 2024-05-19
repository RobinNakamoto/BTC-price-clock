const priceElement = document.getElementById('price');

// Customizable settings
const showDecimals = false; // Change to true if you want to show decimals

let lastPrice = null;

async function fetchPrice() {
    try {
        const response = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=BTCFDUSD');
        const data = await response.json();
        let price = parseFloat(data.price);

        if (!showDecimals) {
            price = Math.floor(price);
        }

        // Format the price with commas
        const formattedPrice = price.toLocaleString();

        // Set price color to white
        priceElement.style.color = 'white';

        priceElement.textContent = formattedPrice;
        lastPrice = price;

    } catch (error) {
        priceElement.textContent = 'Error fetching price';
        console.error('Error fetching price:', error);
    }
}

// Initial fetch and interval setup
fetchPrice();
setInterval(fetchPrice, 200); // Fetch price every 200 milliseconds