/** scripts/script.js   **/
/** Peter Kelly         **/


const APIKEY = "a6a6f2d50f3f75022af768f3203eaf16";
let locations = new Array();
let regg = new RegExp(/^[a-zA-Z0-9_.-]*$/g);
const EUROPE = ["Istanbul", "Athens", "Barcelona", "Moscow", "Paris", "London", "Dublin", "Berlin", "Rome", "Stockholm"];
const US = ["Boston", "Dallas", "Jacksonville", "New York", "Chicago", "Philadelphia", "Sacramento", "Phoenix", "Louisville", "Detroit"];

// Hides password if visible.
// Reveals password if hidden.

function togglePassword() {
  let input = document.getElementById("password");
  let input2 = document.getElementById("confirm-password");
  if (input.type === "password") {
    input.type = "text";
    input2.type = "text"
  } else {
    input.type = "password";
    input2.type = "password";
  }
}

// Makes request to weather api and
// creates a new weather card element with
// the correct info if location is found.

function getWeather() {

  let inputVal = document.getElementById("location-input").value;
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
      weather.name = data.name + ", " + data.sys.country;
      weather.main = data.main;
      weather.wind = data.wind;
      weather.details = data.weather[0];
      locations.push(weather);
      makeWeatherCard(weather);

    })
    .catch(() => {
      msg.textContent = "Locatioin not found. Please try another location";
    });

}

// Creates a weather card and adds the card to
// the HTML document

function makeWeatherCard(weather) {

  let weatherCard = document.createElement("div");
  weatherCard.className = "weather-card";

  let weatherName = document.createElement("p");
  weatherName.innerText = weather.name;

  let weatherIcon = document.createElement("img");
  let iconUrl = "http://openweathermap.org/img/w/" + weather.details.icon + ".png";
  weatherIcon.setAttribute("src", iconUrl);
  weatherIcon.className = "weather-icon";

  let weatherTemp = document.createElement("p");
  weatherTemp.innerText = weather.main.temp + "\u00B0 F";

  let weatherFeels = document.createElement("p");
  weatherFeels.innerText = "Feels Like: " + weather.main.feels_like + "\u00B0 F";

  let weatherDesc = document.createElement("p");
  weatherDesc.innerText = weather.details.main;

  weatherCard.appendChild(weatherName);
  weatherCard.appendChild(weatherIcon);
  weatherCard.appendChild(weatherTemp);
  weatherCard.appendChild(weatherFeels);
  weatherCard.appendChild(weatherDesc);

  cardsDiv = document.getElementById("weather-container");
  cardsDiv.appendChild(weatherCard);

}

// Checks if a username and password
// are suitable using regex

function validate() {

  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let confirmPassword = document.getElementById("confirm-password").value;
  if (check_pass(password, confirmPassword) && check_user(username)) {
    window.location.href = "search.html";
    console.log("Success");
  } else {
    console.log("Failure");
  }

}

// Checks if username has suitable length and
// if it has correct symbols

function check_user(username) {

  let message = "";
  if (!regg.test(username) || username.length >= 20) {
    message = "Username must be less than 20 characters and can only contain letters, digits, and the following symbols: _ , . , -";
    alert(message);
    return false;
  }
  return true;

}

// Checks if password length is suitable and
// if confirm password matches

function check_pass(password, confirmPassword) {

  let message = "";
  if (password.length < 8) {
    message = "Password must be at least 8 characters long";
    alert(message);
    return false;
  } else if (password != confirmPassword) {
    message = "Passwords must be the same";
    alert(message);
    return false;
  }
  return true;

}

// Returns true if str has digits,
// Returns false if not

function hasNumber(str) {

  return /\d/.test(str);
  
}
