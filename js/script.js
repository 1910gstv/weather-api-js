const apiKey = "915ecc6a6e4c4bf42197320fd083c211";
const apiCountryURL = "https://flagsapi.com/BE/flat/32.png"
const apiKeyImg = "BDHvvDWCLkm0KPMpvvwZOBuTdhMReTbGFi6htlX4tF0"

const cityInput = document.querySelector('#city-input');
const searchBtn = document.querySelector('#search');

const cityElement = document.querySelector('#city');
const tempElement = document.querySelector('#temperature span');
const descElement = document.querySelector('#description');
const weatherIconElement = document.querySelector('#weather-icon');
const countryElement = document.querySelector('#country');
const humidityElement = document.querySelector('#humidity span');
const windElement = document.querySelector('#wind span');

const weatherContainer = document.querySelector('#weather-data')



//Funções
const getWeatherData = async(city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json()

    return data;

}

const showWeatherData = async (city) => {
    const data = await getWeatherData(city);

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerHTML = data.weather[0].description;
    weatherIconElement.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    countryElement.setAttribute('src', `https://flagsapi.com/${data.sys.country}/flat/64.png`);
    humidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed}km/h`

    weatherContainer.classList.remove('hide')

}




searchBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const city = cityInput.value;

    showWeatherData(city)
})

cityInput.addEventListener('keyup', (e) => {
    if(e.code === 'Enter') {
        const city = e.target.value;

        showWeatherData(city);
    }
})

function searchPhotos() {
    const urlImg = `https://api.unsplash.com/photos/?client_id=${apiKeyImg}&query=${city}`

    fetch(urlImg).then(function(data) {
        return data.json();
    })
        .then(function(data) {
            console.log(data)

            data.results.forEach(photo => {
                let result = `
                    <img src="${photo.urls.regular}">
                    <a href="${photo.links.download}">
                `;

                $("body").html(result);
        })
    })
}
//BDHvvDWCLkm0KPMpvvwZOBuTdhMReTbGFi6htlX4tF0