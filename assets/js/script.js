$(document).ready(function () {
  $(`.carousel.carousel-slider`).carousel({
    duration: 200,
    fullWidth: true,
    indicators: true,
  });
  setInterval(function () {
    $(`.carousel.carousel-slider`).carousel(`next`);
  }, 5000);
});

let newCurrency = `EUR`; // placeholder
let currencyConverterApi = `http://www.geoplugin.net/json.gp?base_currency=${newCurrency}`;

fetch(currencyConverterApi)
  .then((response) => response.json())
  .then(function (data) {
    console.log(data);
    console.log(data.geoplugin_currencyConverter);
    console.log(`1 USD = ${data.geoplugin_currencyConverter} euros`);
  });

let key = `zyAk0vwUuaz2iWvaUGfsN9GfdQyi5dFO`;
let secret = `tqQXPFGGfGiXw4kH`;
let token;

fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
  body: `grant_type=client_credentials&client_id=${key}&client_secret=${secret}`,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  method: 'POST',
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data.access_token);
    token = data.access_token;
    localStorage.setItem(`ApiToken`, token);
  });

// api for destination content
// token = localStorage.getItem(`ApiToken`);
// let amadeusApi = `https://test.api.amadeus.com/v1/shopping/activities?latitude=41.397158&longitude=2.160873&radius=1`;
// // fetch(amadeusApi)
// //   .then((response) => response.json())
// //   .then((data) => {
// //     console.log(data);
// //   });
