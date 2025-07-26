let countryCode = "PK";
let countryCode1 = "US";
let currencyCode = "PKR";
let currencyCode1 = "USD";
let selectElement = document.getElementById("to");
for (let key in countryList) {
    if (countryList.hasOwnProperty(key)) {
        let option = document.createElement("option");
        option.value = key;
        option.innerText = key;
        selectElement.appendChild(option);
    }
}
selectElement.addEventListener("change", function () {
    let selectedKey = selectElement.value;
    currencyCode = selectedKey;
    let img = document.querySelector("#imgTo");
    let imgSrc = img.src;
    imgSrc = imgSrc.replace(countryCode, countryList[selectedKey]);
    countryCode = countryList[selectedKey];
    img.src = imgSrc;
});

let selectElement1 = document.getElementById("from");
for (let key in countryList) {
    if (countryList.hasOwnProperty(key)) {
        let option = document.createElement("option");
        option.value = key;
        option.innerText = key;
        selectElement1.appendChild(option);
    }
}
selectElement1.addEventListener("change", function () {
    let selectedKey = selectElement1.value;
    currencyCode1 = selectedKey;
    let img = document.querySelector("#imgFrom");
    let imgSrc = img.src;
    imgSrc = imgSrc.replace(countryCode1, countryList[selectedKey]);
    countryCode1 = countryList[selectedKey];
    img.src = imgSrc;
});

let btn = document.querySelector("#submit");
btn.addEventListener("click", function (evnt) {
    evnt.preventDefault();

    let amount = document.querySelector(".amount input").value;
    let msg = document.querySelector(".msg");

    const fromCurrency = currencyCode1;
    const toCurrency = currencyCode;
    const apiKey = "c7ba0c0b1d34f10e18ecd63aeabe4754";

    const apiUrl = `https://api.exchangerate.host/convert?access_key=${apiKey}&from=${fromCurrency}&to=${toCurrency}&amount=${amount}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (!data.success) {
                msg.innerText = "Invalid API Key or data error.";
                return;
            }

            let formattedExchange = data.result.toFixed(2);
            msg.innerText = `${amount} ${fromCurrency} = ${formattedExchange} ${toCurrency}`;
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            msg.innerText = "Error fetching data.";
        });
});

function updateExchangeRate() {
    let msg = document.querySelector(".msg");
    const apiKey = "c7ba0c0b1d34f10e18ecd63aeabe4754";
    const fromCurrency = currencyCode1;
    const toCurrency = currencyCode;
    const apiUrl = `https://api.exchangerate.host/convert?access_key=${apiKey}&from=${fromCurrency}&to=${toCurrency}&amount=1`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (!data.success) {
                msg.innerText = "Unable to fetch live exchange rate.";
                return;
            }

            let rate = data.result.toFixed(2);
            msg.innerText = `1 ${fromCurrency} = ${rate} ${toCurrency}`;
        })
        .catch(error => {
            console.error("Fetch error:", error);
            msg.innerText = "Error fetching exchange rate.";
        });
}

// Call on page load
updateExchangeRate();

// Also call when selects change
selectElement.addEventListener("change", function () {
    let selectedKey = selectElement.value;
    currencyCode = selectedKey;
    let img = document.querySelector("#imgTo");
    img.src = `https://flagsapi.com/${countryList[selectedKey]}/shiny/64.png`;
    countryCode = countryList[selectedKey];
    updateExchangeRate();
});
selectElement1.addEventListener("change", function () {
    let selectedKey = selectElement1.value;
    currencyCode1 = selectedKey;
    let img = document.querySelector("#imgFrom");
    img.src = `https://flagsapi.com/${countryList[selectedKey]}/shiny/64.png`;
    countryCode1 = countryList[selectedKey];
    updateExchangeRate();
});