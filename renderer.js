const priceElement = document.getElementById('price');
const showDecimals = false; 
let lastPrice = null;

async function fetchPrice() {
    try {
        const proxyUrl = 'https://api.allorigins.win/get?url='; 
        const apiUrl = 'https://contract.mexc.com/api/v1/contract/index_price/BTC_USDT';
        const response = await fetch(`${proxyUrl}${encodeURIComponent(apiUrl)}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const mexcData = JSON.parse(data.contents);

        let price = parseFloat(mexcData.data[0].p); 
        if (!showDecimals) {
            price = Math.floor(price);
        }

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
        console.error('Error fetching price:', error);
        priceElement.textContent = 'Error fetching price';
    }
}

fetchPrice();
setInterval(fetchPrice, 200); // Or adjust as needed
