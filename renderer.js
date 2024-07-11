const priceElement = document.getElementById('price');

// Customizable settings
const showDecimals = false;

let lastPrice = null;

async function fetchPrice() {
    try {
        const response = await fetch('https://contract.mexc.com/api/v1/contract/index_price/BTC_USDT');
        const data = await response.json();

        // Extract and process the price from the MEXC response
        let price = parseFloat(data.data[0].p); 
        if (!showDecimals) {
            price = Math.floor(price);
        }

        // Format price and update color
        const formattedPrice = price.toLocaleString();
        if (lastPrice !== null) {
            if (price > lastPrice) {
                priceElement.style.color = 'rgb(69, 151, 130)';
            } else if (price < lastPrice) {
                priceElement.style.color = 'rgb(223, 72, 76)';
            } else {
                priceElement.style.color = 'rgb(69, 151, 130)';
            }
        }
        
        priceElement.textContent = formattedPrice;
        lastPrice = price;
    } catch (error) {
        priceElement.textContent = 'Error fetching price';
        console.error('Error fetching price:', error);
    }
}

// Initial fetch and interval
fetchPrice();
setInterval(fetchPrice, 200);
