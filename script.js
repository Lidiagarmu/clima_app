
const API_KEY = '1cb8ac430389826f01e4010a036d0b67';

const fetchData = position  => {

    const { latitude, longitude} = position.coords;
    fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => console.log(data))

 console.log(position);
 
}

const onLoad = () => {
    navigator.geolocation.getCurrentPosition(fetchData);
}