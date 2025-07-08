const API_KEY = '1cb8ac430389826f01e4010a036d0b67';

const fetchData = position => {
  const { latitude, longitude } = position.coords;

  fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
    .then(response => response.json())
    .then(data => setWeatherData(data));
};

const setWeatherData = data => {
  const weatherData = {
    location: data.name,
    description: translateWeather(data.weather[0].main),
    humidity: data.main.humidity,
    pressure: data.main.pressure,
    temperature: Math.round(data.main.temp),
    date: getDate()
  };

  Object.keys(weatherData).forEach(key => {
    document.getElementById(key).textContent = weatherData[key];
  });

  setWeatherIcon(data.weather[0].main);
  setBackgroundByWeather(data.weather[0].main);

  cleanUp();
};

const translateWeather = condition => {
  switch (condition.toLowerCase()) {
    case 'clear': return 'Soleado';
    case 'clouds': return 'Nublado';
    case 'rain': return 'Lluvioso';
    case 'drizzle': return 'Llovizna';
    case 'thunderstorm': return 'Tormenta';
    case 'snow': return 'Nevando';
    case 'mist':
    case 'fog': return 'Niebla';
    default: return condition;
  }
};

const setWeatherIcon = condition => {
  const icon = new Skycons({ color: "black" });
  let iconType = "CLEAR_DAY";

  switch (condition.toLowerCase()) {
    case "clouds":
      iconType = "PARTLY_CLOUDY_DAY";
      break;
    case "rain":
      iconType = "RAIN";
      break;
    case "snow":
      iconType = "SNOW";
      break;
    case "clear":
      iconType = "CLEAR_DAY";
      break;
    case "thunderstorm":
      iconType = "SLEET";
      break;
    case "drizzle":
      iconType = "SLEET";
      break;
    case "mist":
    case "fog":
      iconType = "FOG";
      break;
    default:
      iconType = "CLOUDY";
      break;
  }

  icon.set("weather-icon", Skycons[iconType]);
  icon.play();
};

const cleanUp = () => {
  document.getElementById('loader').style.display = 'none';
  document.getElementById('container').style.display = 'flex';
};

const getDate = () => {
  const date = new Date();
  return `${date.getDate()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`;
};

const setBackgroundByWeather = condition => {
  const body = document.body;

  switch (condition.toLowerCase()) {
    case 'clear':
      body.style.background = 'linear-gradient(to top, #a2d4f7, #ffffff)'; // Fondo suave azul-blanco (sin naranja)
      break;
    case 'clouds':
      body.style.background = 'linear-gradient(to top, #d7d2cc, #304352)';
      break;
    case 'rain':
    case 'drizzle':
      body.style.background = 'linear-gradient(to top, #4e54c8, #8f94fb)';
      break;
    case 'thunderstorm':
      body.style.background = 'linear-gradient(to top, #373B44, #4286f4)';
      break;
    case 'snow':
      body.style.background = 'linear-gradient(to top, #e6dada, #274046)';
      break;
    case 'mist':
    case 'fog':
      body.style.background = 'linear-gradient(to top, #3e5151, #decba4)';
      break;
    default:
      body.style.background = 'linear-gradient(to top, #a2d4f7, #ffffff)';
  }
};

const onLoad = () => {
  navigator.geolocation.getCurrentPosition(fetchData);
};
