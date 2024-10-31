document.addEventListener("DOMContentLoaded", () => {
    const amountInput = document.getElementById("amount");
    const result = document.getElementById("result");
    const convertButton = document.getElementById("convertButton");

    const fromCurrencyInput = document.getElementById("fromCurrencyInput");
    const toCurrencyInput = document.getElementById("toCurrencyInput");
    const fromCurrencyList = document.getElementById("fromCurrencyList");
    const toCurrencyList = document.getElementById("toCurrencyList");

    const currencyList = {
        "BDT": "BD",
		"USD": "US",
        "EUR": "EU",
        "JPY": "JP",
        "GBP": "GB",
        "AUD": "AU",
        "CAD": "CA",
        "CHF": "CH",
        "CNY": "CN",
        "INR": "IN",
        "RUB": "RU",
        "BRL": "BR",
		"BRL": "BR",
        // Add more currencies as needed
    };

    function createAutocomplete(inputElement, listElement) {
        inputElement.addEventListener("input", function () {
            const searchValue = this.value.toUpperCase();
            listElement.innerHTML = "";

            Object.keys(currencyList).forEach(currencyCode => {
                if (currencyCode.includes(searchValue)) {
                    const item = document.createElement("div");
                    item.innerHTML = `
                        <img src="https://flagcdn.com/24x18/${currencyList[currencyCode].toLowerCase()}.png" alt="${currencyCode}">
                        <span>${currencyCode}</span>
                    `;
                    item.addEventListener("click", function () {
                        inputElement.value = currencyCode;
                        listElement.innerHTML = "";
                    });
                    listElement.appendChild(item);
                }
            });
        });

        // Close dropdown if clicking outside
        document.addEventListener("click", function (e) {
            if (e.target !== inputElement) {
                listElement.innerHTML = "";
            }
        });
    }

    createAutocomplete(fromCurrencyInput, fromCurrencyList);
    createAutocomplete(toCurrencyInput, toCurrencyList);

    // Fetch exchange rate and display result
    function fetchExchangeRate(from, to, amount) {
        fetch(`https://api.exchangerate-api.com/v4/latest/${from}`)
            .then(response => response.json())
            .then(data => {
                const rate = data.rates[to];
                if (rate) {
                    const convertedAmount = (rate * amount).toFixed(2);
                    result.textContent = `${convertedAmount} ${to}`;
                } else {
                    result.textContent = "Conversion rate not available.";
                }
            })
            .catch(error => {
                result.textContent = "Error fetching data.";
                console.error("Error:", error);
            });
    }

    // Convert button event
    convertButton.addEventListener("click", () => {
        const amount = parseFloat(amountInput.value);
        const from = fromCurrencyInput.value;
        const to = toCurrencyInput.value;

        if (isNaN(amount)) {
            alert("Please enter a valid amount.");
            return;
        }

        fetchExchangeRate(from, to, amount);
    });
});
