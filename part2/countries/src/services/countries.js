import axios from 'axios'

const defaultURL = 'https://studies.cs.helsinki.fi/restcountries/api'
const apiKey = import.meta.env.VITE_API_KEY
const weatherURL = 'https://api.openweathermap.org/data/2.5/weather?q='
const iconURL = 'https://openweathermap.org/payload/api/media/file/'

const getAllNames = () => {
    return axios
        .get(`${defaultURL}/all`)
        .then((response) => response.data.map(country => country.name.common))
}

const getCountry = (name) => {
    return axios
        .get(`${defaultURL}/name/${name}`)
        .then(response => response.data)
}

const getWeather = (city) => {
    return axios
        .get(`${weatherURL}${city}&units=metric&appid=${apiKey}`)
        .then(response => response.data)
}

const getIconURL = (id) => {
    return `${iconURL}${id}.png`
}

export default { getAllNames, getCountry, getWeather, getIconURL }