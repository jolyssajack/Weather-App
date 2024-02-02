function displayTemperature(response) {
  let temperatureElement = document.querySelector(".current-temperature-value");
  let tempIcon = document.querySelector(".current-temperature-icon");
  let tempDescript = document.querySelector(".weather-description");
  let wind = document.querySelector(".current-wind-value");
  let humidity = document.querySelector(".current-humidity-value");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#current-city");

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = `${temperature}<span class="current-temperature-unit">°C</span>`;
  tempIcon.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-temperature-icon" />`;
  tempDescript.innerHTML = response.data.condition.description;
  wind.innerHTML = `${response.data.wind.speed}km/h`;
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;

  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();
  let greeting = document.querySelector(".greeting");
  let backColour = document.querySelector("body");

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  if (hours >= 5 && hours < 12) {
    greeting.innerHTML = "Good Morning";
    backColour.style.backgroundImage =
      "radial-gradient(at 40% 20%,hsla(199, 100%, 74%, 1) 0px,transparent 50%)";
    console.log("Good morning!");
  } else if (hours >= 12 && hours < 18) {
    greeting.innerHTML = "Good Afternoon";
    backColour.style.backgroundImage =
      "radial-gradient(at 40% 20%, hsla(15,100%,50%,1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(206,100%,20%,0) 0px, transparent 50%)";
  } else {
    greeting.innerHTML = "Good Evening";
    backColour.style.backgroundImage =
      "radial-gradient(at 40% 20%, hsla(225,33%,21%,1) 0px, transparent 50%)";
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay}, ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector(".current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);
