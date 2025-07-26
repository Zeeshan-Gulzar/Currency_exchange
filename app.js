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
    let amountDiv = document.querySelector(".amount");
    let amountInput = amountDiv.querySelector("input");
    let amount = amountInput.value;
    console.log(amount);
    const apiUrl = "https://v6.exchangerate-api.com/v6/c1895ba7c2e64ad0aae9f07f/pair";
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const newApi = `${proxyUrl}${apiUrl}/${currencyCode1}/${currencyCode}`;
    let msg = document.querySelector(".msg");
    fetch(newApi, { headers: { 'Origin': 'http://127.0.0.1:3000', 'X-Requested-With': 'XMLHttpRequest' } })
        .then(response => response.json())
        .then(data => {
            let rate = data.conversion_rate;
            let exchange = amount * rate;
            let formattedExchange=exchange.toFixed(2);
            msg.innerText = `${amount} ${currencyCode1} = ${formattedExchange} ${currencyCode}`;
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            msg.innerText = "Error fetching data.";
        });
});

function updateExchangeRate() {
    let msg = document.querySelector(".msg");
    const apiUrl = "https://v6.exchangerate-api.com/v6/c1895ba7c2e64ad0aae9f07f/pair";
    const proxyUrl = "https://api.allorigins.win/raw?url=";
    const newApi = `${proxyUrl}${apiUrl}/${currencyCode1}/${currencyCode}`;
    fetch(newApi, { headers: { 'Origin': 'http://127.0.0.1:3000', 'X-Requested-With': 'XMLHttpRequest' } })
        .then(response => response.json())
        .then(data => {
            let unformattedRate = data.conversion_rate;
            let rate = unformattedRate.toFixed(2);
            msg.innerText = `1 ${currencyCode1} = ${rate} ${currencyCode}`;
        })
        .catch(error => {
            msg.innerText = "Error fetching data.";
            console.error("Error fetching data:", error);
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