const APIKEY = "a6a6f2d50f3f75022af768f3203eaf16";
let locations = new Array();
let inputVal = "";
const PLACES = ["Athens", "Barcelona", "Paris", "London", "Stockholm", "Boston", "Dallas", "Jacksonville", "New York", "Chicago", "Phoenix", "Detroit", "Tokyo", "Cape Town", "Mexico City", "Beijing"]

startGame();

// Makes a request to the api for a random city
// from the places array. Then makes a card with
// the information

function getRandomWeather() {

  let index = getRandomInt(15);
  inputVal = PLACES[index];
  let url = "";
  let weather = new Object();

  if (hasNumber(inputVal)) {
    inputVal = inputVal.replace(/\s/g, '');
    url = "https://api.openweathermap.org/data/2.5/weather?zip=" + inputVal + "&appid=" + APIKEY + "&units=imperial";
  } else {
    url = "https://api.openweathermap.org/data/2.5/weather?q=" + inputVal + "&appid=" + APIKEY + "&units=imperial";
  }

  fetch(url).then(response => response.json()).then(data => {

      weather = new Object();
      weather.main = data.main;
      weather.wind = data.wind;
      weather.details = data.weather[0];
      locations.push(weather);
      makeWeatherCard(weather);

    })
    .catch(() => {
      msg.textContent = "Location not found. Please try another location";
    });

}

// Creates a weather card and adds the card to
// the HTML document. (Doesn't include name of city on card)

function makeWeatherCard(weather) {

  let weatherCard = document.createElement("div");
  weatherCard.className = "weather-card";

  let weatherIcon = document.createElement("img");
  let iconUrl = "http://openweathermap.org/img/w/" + weather.details.icon + ".png";
  weatherIcon.setAttribute("src", iconUrl);
  weatherIcon.className = "weather-icon";

  let weatherTemp = document.createElement("p");
  weatherTemp.innerText = weather.main.temp;

  let weatherFeels = document.createElement("p");
  weatherFeels.innerText = "Feels Like: " + weather.main.feels_like;

  let weatherDesc = document.createElement("p");
  weatherDesc.innerText = weather.details.main;

  weatherCard.appendChild(weatherIcon);
  weatherCard.appendChild(weatherTemp);
  weatherCard.appendChild(weatherFeels);
  weatherCard.appendChild(weatherDesc);

  cardsDiv = document.getElementById("weather-container-random");

  if (cardsDiv.children.length == 0) {
    console.log("CREATE");
    cardsDiv.appendChild(weatherCard);
  } else {
    console.log("REPLACE");
    cardsDiv.replaceChild(weatherCard, cardsDiv.firstElementChild);
  }

}

// loads city selection table on page load

function startGame() {

  let table = document.getElementById("guess-table");
  generateTable(table, PLACES);

}

// Starts a new game by selecting a random
// new location to guess

function newGame() {

  getRandomWeather();
  let head = document.getElementById("table-head");
  head.innerHTML = "Guess a City!";

}

// Fills table with data and adds button
// for each element in table. Adds the
// completed table to the HTML document

function generateTable(table, data) {

  let row = table.insertRow();

  for (let i = 0; i < data.length; i++) {
    if (i % 4 == 0) {
      row = table.insertRow();
    }
    let button = document.createElement("BUTTON");
    button.innerHTML = data[i];
    button.classList.add("guess-button");
    button.setAttribute("id", data[i]);
    button.addEventListener("click", checkGuess);
    let cell = row.insertCell();
    let text = document.createTextNode(data[i]);
    cell.appendChild(button);
  }

}

// Checks if guess is correct and alerts
// user of outcome by changing table head
// and displaying image if user guesses
// correctly

function checkGuess() {

  if (this.id == inputVal) {
    let head = document.getElementById("table-head");
    head.innerHTML = "Correct! " + this.id + " is the answer!";
    console.log("CORRECT");
    let cityImg = getImage(this.id);
    document.body.style.backgroundImage = "url(" + cityImg + ")";
    let newImg = document.createElement("IMG");
    newImg.setAttribute("src", cityImg);
  } else {
    let head = document.getElementById("table-head");
    head.innerHTML = "Try Again! Not " + this.id + "!";
    console.log("GUESS AGAIN");
  }

}

// Gets rid of whitespace in city string
// and returns path to image in images folder

function getImage(city) {

  let lowerCity = city.replace(/\s/g, '').toLowerCase();
  return "images/" + lowerCity + ".jpg";

}

// Returns true if str has digits
// Returns false if not

function hasNumber(str) {
  return /\d/.test(str);
}

// Returns random number between
// 0 and max

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
