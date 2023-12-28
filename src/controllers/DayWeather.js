const loccation = document.getElementById("Location");
const Degree = document.getElementById("degree");
const Icon = document.getElementById("iconOfTheWeatherOfDay");
const Description = document.getElementById("DescOfTheWeatherOfDay");
const DateOfTheDay = document.getElementById("DateOfTheDay");
const SunriseTime = document.getElementById("SunriseTime");
const SunsetTime = document.getElementById("SunsetTime");
const windSpeed = document.getElementById("windSpeed");
const DailyChanceOfRain = document.getElementById("ChanceOfRain");
const UV = document.getElementById("UV");

let date;

// Basic fetch example
fetch('http://api.weatherapi.com/v1/forecast.json?key=7feb2cdd174942d88f995107232611&q=Algeria&days=7&aqi=yes&alerts=yes')
  .then(response => {
    // Check if the request was successful (status code 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    date = response.headers.get('Date');
    // Parse the response as JSON
    return response.json();
  })
  .then(data => {

    console.log();

    // Handle the data
    const desc = data.current.condition.text;
    const icon = data.current.condition.icon;
    const locate = data.location.country;
    const temp = data.current.temp_c;
    const riseTime = data.forecast.forecastday[0].astro.sunrise; 
    const setTime = data.forecast.forecastday[0].astro.sunset; 
    const SWind = data.forecast.forecastday[0].day.maxwind_kph; 
    const dailyChanceOfRain = data.forecast.forecastday[0].day.daily_chance_of_rain;
    const dailyUV = data.forecast.forecastday[0].day.uv;

    console.log(data.forecast.forecastday[0]);
    date = date.split(/[ ,]+/).slice(0,4).join(" ");

    loccation.innerHTML = locate;
    Degree.innerHTML = temp;
    Icon.src = icon;
    Description.innerHTML = desc;
    DateOfTheDay.innerHTML = date;
    SunriseTime.innerHTML = riseTime;
    SunsetTime.innerHTML = setTime;
    windSpeed.innerHTML = SWind;
    DailyChanceOfRain.innerHTML = dailyChanceOfRain;
    UV.innerHTML = dailyUV;
    
  })
  .catch(error => {
    // Handle errors
    console.error('Error:', error.message);
  });