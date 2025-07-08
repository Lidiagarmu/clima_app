
const API_KEY = '1cb8ac430389826f01e4010a036d0b67';


// Llamada a la WEATHER API
const fetchData = position  => {

    const { latitude, longitude} = position.coords;
    fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data =>  setWeatherData(data)) 
}

//  función para obtener los datos 
const setWeatherData = data => {
    console.log(data);
    const weatherData = {
        location: data.name,
        description: data.weather[0].main,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        temperature: data.main.temp,
        date: getDate(),
    }

    // función para que recorra las keys y nos muestre los datos en el html
    Object.keys(weatherData).forEach( key => {
        document.getElementById(key).textContent = weatherData[key];

    })

    cleanUp();
    
}

    //función para limpiar
    const cleanUp = () => {
        let container = document.getElementById('container');
        let loader = document.getElementById('loader');

        loader.style.display = 'none';
        container.style.display = 'flex';
        
    }

    // función para obtener la fecha actual
    const getDate = () => {
        let date = new Date ();
        return `${date.getDate()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`;  // .slice lo que hace es que si ya tiene dos caracteres lo deja así y sino le añade el 0
    }

//función para obtener la geolocalización del usuario
const onLoad = () => {
    navigator.geolocation.getCurrentPosition(fetchData);
}