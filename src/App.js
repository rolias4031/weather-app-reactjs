import { useState } from 'react'
import SearchTitle from './components/headings/SearchTitle'
import NormalInputForm from './components/inputs/NormalInputForm'
import ComparisonForm from './components/inputs/ComparisonForm'
import WeatherDisplayNormal from './components/display/WeatherDisplayNormal'
import WeatherDisplayComparison from './components/display/WeatherDisplayComparison'
import ToggleMode from './components/inputs/ToggleMode'
import './App.css';

function App() {
  const apiKey = 'd9295f3c140751a4b16dbb7c3c52c7b4'
  const [weatherData, setWeatherData] = useState({})
  const [dataPresentBool, setDataPresentBool] = useState(false)
  const [comparisonMode, setComparisonMode] = useState(false)
  const titleMap = new Map([
    ['description', 'Overall Weather'],
    ['temp', 'Current Temp'],
    ['feels_like', 'Feels Like'],
    ['temp_min', 'Min Temp'],
    ['temp_max', 'Max Temp'],
    ['all', 'Cloud Cover'],
    ['deg', 'Degrees'],
    ['1h', 'Last Hour'],
    ['3h', 'Last 3 Hours']
  ])
  const keyCategoryMap = new Map([
    ['description', 'weather'],
    ['temp', 'main'],
    ['feels_like', 'main'],
    ['temp_min', 'main'],
    ['temp_max', 'main'],
    ['humidity', 'main'],
    ['all', 'clouds'],
    ['1h', 'rain'],
    ['3h', 'rain'],
    ['speed','wind'],
    ['deg', 'wind'],
    ['sunrise','sys'],
    ['sunset', 'sys']
  ])
  const unitsToDataMap = new Map([
    ['temp', {imperial: '°F', metric: '°C' }],
    ['feels_like', {imperial: '°F', metric: '°C' }],
    ['temp_min', {imperial: '°F', metric: '°C' }],
    ['temp_max', {imperial: '°F', metric: '°C' }],
    ['humidity', {imperial: '%', metric: '%' }],
    ['all', {imperial: '%', metric: '%' }],
    ['1h', {imperial: ' in', metric: ' cm' }],
    ['3h', {imperial: ' in', metric: ' cm' }],
    ['speed',{imperial: ' miles/hr', metric: ' meters/s' }],
    ['deg', {imperial: '°', metric: '°' }],
    ['gust', {imperial: ' miles/hr', metric: ' meters/s' }]
  ])

  return (
    <div className="container text-center my-5">
      <div className="row justify-content-center my-4">
        <div className="col">
          <SearchTitle />
        </div>
      </div>
      <div className="row justify-content-center my-3">
        <div className="col-auto">
          <ToggleMode
            liftMode={liftMode}
            liftDataPresentBool={liftDataPresentBool}
            resetWeatherData={resetWeatherData}
            />

        </div>
      </div>
      <div className="row justify-content-center my-2">
        <div className="col">
          {renderFormContent()}
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col">
          {renderDisplayContent()}
        </div>
      </div>
    </div>
  )

  function renderDisplayContent () {
    let displayContent
    if (comparisonMode === false) {
      displayContent = (
        <WeatherDisplayNormal
        data={weatherData}
        dataPresentBool={dataPresentBool}
        titleMap={titleMap}
        />
      )
    } else if (comparisonMode === true) {
      displayContent = (
        <WeatherDisplayComparison
        data={weatherData}
        dataPresentBool={dataPresentBool}
        titleMap={titleMap}
        />
      )
    }
    return displayContent
  }

  function renderFormContent () {
    let formContent
    if (comparisonMode === false) {
      formContent = (
        <NormalInputForm
          comparisonMode={comparisonMode}
          liftWeatherData={liftWeatherData}
          liftDataPresentBool={liftDataPresentBool}
          apiKey={apiKey}
          unitsToDataMap={unitsToDataMap}
          keyCategoryMap={keyCategoryMap}
          apiKey={apiKey}
          fetchGeocodeData={fetchGeocodeData}
          fetchOpenWeatherData={fetchOpenWeatherData}
          validateFormInputs={validateFormInputs}
          />
      )
    } else {
      formContent = (
        <ComparisonForm
          comparisonMode={comparisonMode}
          liftWeatherData={liftWeatherData}
          liftDataPresentBool={liftDataPresentBool}
          titleMap={titleMap}
          unitsToDataMap={unitsToDataMap}
          keyCategoryMap={keyCategoryMap}
          apiKey={apiKey}
          fetchGeocodeData={fetchGeocodeData}
          fetchOpenWeatherData={fetchOpenWeatherData}
          validateFormInputs={validateFormInputs}
          />
      )
    }
    return formContent
  }

  function liftWeatherData (data) {
    setWeatherData(data)
  }

  function liftMode (data) {
    setComparisonMode(data)
  }

  function liftDataPresentBool (bool) {
    setDataPresentBool(bool)
  }

  function resetWeatherData () {
    setWeatherData({})
  }

  function validateFormInputs (inputs, mode) {
    // location data check
    for (const loc in inputs.locations) {
      if (Object.keys(inputs.locations[loc]).length < 2) {
        return 'One of your cities or states is blank'
      }
      for (const val in loc) {
        if (!loc[val] || loc[val].trim().length === 0 ) {
          return 'One of your cities or states is blank'
        }
      }
    }
    // units check
    if (!inputs.units) {
      return 'Select the units'
    }
    // comparisonData check
    if (mode === true) {
      if (inputs.comparisonTerms.length === 0) {
        return 'You must select data to compare'
      }
    }
  }
  // @params data: {}
  // @params apiKey, units: string
  async function fetchOpenWeatherData (data, apiKey, units) {
    const dataObj = {}
    for (const [loc, key] of Object.entries(data)) {
      let openWeatherCreds = {
        lat: key.lat,
        lon: key.lon,
      }
      console.log(openWeatherCreds)
      try {
        const openWeatherUrl = buildOpenWeatherURL(openWeatherCreds, apiKey, units) // create url for OW API
        var openWeatherData = await fetchData(openWeatherUrl) // fetch weather data
        dataObj[loc] = {
          ...openWeatherData,
          state: key.state,
          weather: {...openWeatherData.weather[0]}
        }
      } catch (e) {
        console.log(e); alert(e)
        return
      }
    }
    return dataObj
  }

  function buildOpenWeatherURL (data, apiKey, units) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${data.lat}&lon=${data.lon}&appid=${apiKey}&units=${units}`
    console.log(url);
    return url
  }

  // @params locations: {}
  // @params apiKey: string
  async function fetchGeocodeData (locations, apiKey) {
    const dataObj = {}
    for (const [loc, inputs] of Object.entries(locations)) {
      try {
        const geocodeUrl = buildGeocodeURL(inputs, apiKey) // create url for geocode API
        var geocodeData = await fetchData(geocodeUrl) // fetch coords from geocode API
        console.log(geocodeData);
        if (geocodeData.length === 0) {
          throw new Error('No data for that city.')
        }
        if (geocodeData.cod === '400') {
          throw new Error(`${geocodeData.message}`)
        }
        dataObj[inputs.city] = {...geocodeData[0]}
      } catch (e) {
        console.log(e); alert(e)
        return e
      }
    }
    return dataObj
  }

  function buildGeocodeURL (inputs, apiKey) {
    const countryCode = '840'
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${inputs.city},${inputs.state},${countryCode}&appid=${apiKey}`
    console.log(url);
    return url
  }

  async function fetchData (url) {
    try {
      const response = await fetch(url, { mode: 'cors' })
      const data = await response.json()
      return data
    } catch (e) {
      console.log(e); alert(e)
      return e
    }
  }

}

export default App;
