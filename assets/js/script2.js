let searchLocation = localStorage.getItem(`Search Location`);
let geoFinderApi = `http://open.mapquestapi.com/geocoding/v1/address?key=M6cWf6SB2TBYZpZZyd6wL6kpI31d0emQ&location=${searchLocation}`;

$(`#city-name`).text(searchLocation);

const apiKey = 'd062b7cc2ea4bdcd13c368fce11ee8b1'; // Bri's APIkey
// const apiKey = '5569f0d8093687922f5c0ba190e02e6c'; // Olga's APIkey

function collectCityData() {
  const forecast = $('#city-name').text();
  let URL = `https://api.openweathermap.org/data/2.5/weather?q=${forecast}&units=imperial&appid=${apiKey}`;
  fetch(URL).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        renderForecast(forecast);
        // Create a card for today's forcast

        function renderForecast() {
          let stamp = data.dt;
          const when = new Date(stamp * 1000);
          const forcastdate = Intl.DateTimeFormat('en-US').format(when);
          const look = data.weather[0].icon;
          const temp = data.main.temp;
          const wind = data.wind.speed;
          const humidity = data.main.humidity;
          const card = `<div class="col s12 weather-box"></div>
        <h3>Weather:</h3>
        <div>
        <ul class="list-group list-group-flush">
        <li class="list-group-item date">${forcastdate}</li>
        <img class="list-group-item weather-icon" src="http://openweathermap.org/img/wn/${look}@2x.png" alt="">
        <li class="list-group-item temp">Temp: ${temp}&#8457</li>
        <li class="list-group-item wind">Wind: ${wind} MPH</li>
        <li class="list-group-item humidity">Humidity: ${humidity}%</li>
        </ul>
        </div>`;
          $('.forecast-container').prepend(card);
        }
      });
    }
  });
}

function getLatitudeLongitude() {
  fetch(geoFinderApi)
    .then((response) => response.json())
    .then((data) => {
      let lat = data.results[0].locations[0].latLng.lat;
      let lon = data.results[0].locations[0].latLng.lng;
      console.log(lat, lon);

      localStorage.setItem(`Longitude`, lon);
      localStorage.setItem(`Latitude`, lat);
    });
}

function displayHotelsAndRestaurants() {
  key = `ap-QFdC7AMslspXollmZWcZB09UvlkCPifDAjqGxosk`;
  lat = localStorage.getItem(`Latitude`);
  lon = localStorage.getItem(`Longitude`);

  fetch(`https://discover.search.hereapi.com/v1/
discover
?at=${lat},${lon}
&q=restaurant
&apiKey=${key}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      for (i = 0; i < 5; i++) {
        $(`.travel-sites`)[i].textContent = data.items[i].address.label;
      }
    });

  fetch(`https://discover.search.hereapi.com/v1/
discover
?at=${lat},${lon}
&q=hotel
&apiKey=${key}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      for (i = 5; i < 10; i++) {
        $(`.travel-sites`)[i].textContent = data.items[i].address.label;
      }
    });
}

//  this api is iffy*
function displayImages() {
  fetch(`https://api.pexels.com/v1/search?query=${searchLocation}`, {
    headers: {
      Authorization: '563492ad6f91700001000001c8cea40a6038478d89f44dd50b19416f',
    },
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      $(`.hi`).attr(`src`, result.photos[0].src.landscape);
      for (i = 1; i < 6; i++) {
        let pi;
        $(`.slider-images`)[i - 1].setAttribute(`src`, result.photos[i + 1].src.landscape);
      }
    });
}

function saveNewLocation() {
  let searchNewCity = $(`#search`).val();
  if (!searchNewCity) {
    // tell the user to enter a city
    return;
  } else {
  localStorage.setItem(`Search Location`, SearchNewCity);
  location.reload()
  }
}


// $(`#material-icons`).on(`click`, saveNewLocation);


// displayImages();
collectCityData();
getLatitudeLongitude();
displayHotelsAndRestaurants();
