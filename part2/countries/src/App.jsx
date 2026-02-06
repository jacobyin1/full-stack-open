import { useState, useEffect } from 'react'
import useServices from "./services/countries"

const Country = ({ name }) => {
  return (
    <div>{name}</div>
  )
}

const Weather = ({ city }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    useServices.getWeather(city).then(data => {setWeather(data)})
  }, [city])
  
  if (!weather) {
    return null
  }

  return (
    <>
      <h2>Weather in {city}</h2>
      Temperature {weather.main.temp} Celsius
      <br />
      <img src={useServices.getIconURL(weather.weather[0].icon)} />
      <br />
      Wind {weather.wind.speed} m/s
    </>
  )
}

const DetailedCountry = ({ name }) => {
  const [country, setCountry] = useState(null)
  useEffect(() => {
    console.log("Getting data", name)
    useServices.getCountry(name).then(data => {
      setCountry(data)
    })
  }, [])

  if (!country) {
    return null
  }

  return (
    <>
      <h1>{country.name.official}</h1>
      capital {country.capital.join(", ")}
      <br />
      area {country.area}
      <h2>Languages</h2>
      <ul>
        {Object
          .entries(country.languages)
          .map(([key, lang]) => <li key={key}>{lang}</li>)} 
      </ul>
      <img src={country.flags.svg} alt={country.flags.alt}></img>
      <Weather city={country.capital[0]}></Weather>
    </>
  )
}

const Countries = ({ query, names, detail, setDetail }) => {
  if (query === "" || names.length === 0) {
    return null
  }

  if (names.length > 10) {
    return (
      <>Too many matches, specify another filter</>
    )
  }
  
  if (names.length > 1 && detail === '') {
    return (
      <>
        {names.map(name => (
          <div key={name} style={{ display: 'flex', gap: '5px' }}>
            <Country name={name}></Country> 
            <button onClick={() => setDetail(name)}>
              Show
            </button>
          </div>
        ))}
      </>
    )
  }

  if (detail !== '') {
    return (
      <DetailedCountry name={detail}></DetailedCountry>
    )
  }
  
  return (
    <DetailedCountry name={names[0]}></DetailedCountry>
  )
}

const App = () => {
  const [query, setQuery] = useState('')
  const [names, setNames] = useState([])
  const [queryNames, setQueryNames] = useState([])
  const [detailedCountry, setDetailedCountry] = useState('') 

  useEffect(() => {
    console.log("Getting names")
    useServices.getAllNames().then(data => setNames(data))
    console.log("done getting names")
  }, [])

  const getQueryNames = (q) => {
    setQueryNames(names.filter(name => name.toLowerCase().includes(q.toLowerCase())))
  }

  const handleChangeQuery = (e) => {
    setQuery(e.target.value)
    getQueryNames(e.target.value)
    setDetailedCountry('')
  }

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        find contries <input name="input" value={query} onChange={handleChangeQuery}/>
      </form>
      <Countries query={query} names={queryNames} detail={detailedCountry} setDetail={setDetailedCountry}></Countries>
    </div>
  )
}

export default App
