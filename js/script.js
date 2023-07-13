const changeLocation = document.getElementById("change-location"),
 details = document.getElementById("details"),
 cardContainer = document.getElementById("card-container"),
 airCondition = document.getElementById("air-condition"),
 daily = document.getElementById("daily-container"),
 dNone = document.getElementById('d-none'),
 hourlyContainer = document.getElementById('horly'),
 forecast = document.getElementById('d-none-forecast')

changeLocation.city.focus();

const updateUI = (city, weather) => {
  details.innerHTML = `
        <div class="left">
            <h1>${city}</h1>
            <p style="margin-top: -20px;font-size: 18px;color: gray;">${
              weather.current.summary
            }</p>
            <h1 style="position: relative;">${Math.round(
              weather.current.temperature
            )}&deg;C</h1>
        </div>
        <div class="right">
            <img src="images/${
              weather.current.icon_num
            }.png" alt="weather img"/>
        </div>
    `;
  airCondition.innerHTML = `
        <div  class="text-container">
            <div class="text">
            <i class="fa-solid fa-temperature-three-quarters"></i>
            <p>Real Feel</p>
            </div>
            <h1>${weather.current.temperature}&deg;C</h1>
        </div>
        <div  class="text-container">
            <div class="text">
            <i class="fa-solid fa-wind"></i>
            <p>Wind Speed</p>
            </div>
            <h1>${weather.current.wind.speed} km/h</h1>
        </div>
        <div  class="text-container">
            <div class="text">
            <i class="fa-sharp fa-solid fa-angle-90"></i>
            <p>Wind Angle</p>
            </div>
            <h1>${weather.current.wind.angle}&deg;</h1>
        </div>
        <div  class="text-container">
            <div class="text">
            <i class="fa-solid fa-droplet"></i>
            <p>Rainfall number</p>
            </div>
            <h1>${weather.current.precipitation.total}</h1>
        </div>
        <div  class="text-container">
            <div class="text">
                <i class="fa-solid fa-cloud"></i>
                <p>Cloud cover</p>
            </div>
            <h1>${weather.current.cloud_cover}</h1>
        </div>
     `;
     if(dNone.classList.contains('d-none')){
        dNone.classList.remove('d-none')
        hourlyContainer.classList.remove('d-none')
        forecast.classList.remove('d-none')
        changeLocation.city.classList.remove('input')
     }
};

function updateForecast(data) {
  cardContainer.innerHTML = "";
  let hour = 0
  let numCards = 24;
  console.log(data);
  for (let i = 0; i < numCards; i++) {
    let card = document.createElement("div");
    card.classList.add("card");
    let hours = data[hour].date.slice(11,19)
    let icon = data[hour].icon
    let temp = data[hour].temperature
    card.innerHTML = `
        <span>${hours}</span>
        <img src="images/${icon}.png"
        <h2 style="position: relative;">${temp}&deg;C</h2>
    `;
    cardContainer.appendChild(card);
    hour++;
  }
}

function capitalizeCrossedOutWords(sentence) {
  var words = sentence.split('_');

  for (var i = 0; i < words.length; i++) {
    if (words[i]) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
  }

  return words.join(' ');
}

function converToDay(day){
  let weekdays = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

  let date = new Date(day)
  let weekdayNumber = date.getDay()
  let weekdayName = weekdays[weekdayNumber]

  return weekdayName
}

function updateDaily(data){
  daily.innerHTML = "";
  let day = 0
  let numDayCard = 7;
  for(let i = 0;i<numDayCard;i++){
    let dayCard = document.createElement('div');
    dayCard.classList.add('day-container')
    let date = data[day].day
    let dayName = converToDay(date)
    let iconDay = data[day].icon
    let weatherDay = data[day].all_day.weather
    let resultDay = capitalizeCrossedOutWords(weatherDay)
    let temperature = data[day].all_day.temperature
    dayCard.innerHTML = `
    <p>${dayName}</p>
    <div class="day-icon">
      <img src="images/${iconDay}.png" alt="">
      <p>${resultDay}</p>
    </div>
    <p>${temperature}&deg;C</p>
    `
    daily.appendChild(dayCard)
    day++
  }
}

// getWeather
const getWeather = async (city) => {
  const data = await getData(city);

  return data;
};


// getLocation
changeLocation.addEventListener("submit", (e) => {
  e.preventDefault();
 
  const cityName = changeLocation.city.value.trim();
  changeLocation.reset();
  getWeather(cityName).then((data) =>{
    updateUI(cityName, data)
    updateDaily(data.daily.data)
    updateForecast(data.hourly.data)
  });
});
