
import ComparisonTermSelect from './ComparisonTermSelect'
import ComparisonCityInputs from './ComparisonCityInputs'
import SearchButton from './SearchButton'
import UnitsRadioButton from './UnitsRadioButton'

import { useState } from 'react'

function ComparisonForm (props) {

  const [searchInputs, setSearchInputs] = useState({
    units: '',
    apiKey: props.apiKey,
    locations: {
      1: {
        city: '',
        state: '',
      }
    }
  })
  const [comparisonTermsList, setcomparisonTermsList] = useState([])

  return (
    <div className="container">
    <div className="row justify-content-center">
    <div className="col-lg-6 col-12">

      <form onSubmit={submitHandler} className="form-control">

        <ComparisonCityInputs liftInputs={liftInputs}
          adjustCityInputObject={adjustCityInputObject}/>

        <div className="row justify-content-center my-2">
          <div className="col">
            <ComparisonTermSelect titleMap={props.titleMap} liftComparisonInputs={liftComparisonInputs}/>
          </div>
        </div>
        <div className="row justify-content-center my-3">
          <div className="col">
            <UnitsRadioButton liftInputs={liftUnitInputs}/>
          </div>
        </div>
        <div className="row justify-content-center my-2">
          <div className="col">
            <SearchButton />
          </div>
        </div>

      </form>

    </div>
    </div>
    </div>
  )

  async function submitHandler (e) {
    e.preventDefault()
    const submittedInputs = {...searchInputs, comparisonTerms: [...comparisonTermsList]}

    const INVALID = props.validateFormInputs(submittedInputs, props.comparisonMode)
    if (INVALID) {
      alert(INVALID)
      return
    }

    const { locations } = submittedInputs
    const { apiKey } = submittedInputs
    const { units } = submittedInputs
    const { comparisonTerms } = submittedInputs

    // fetch geocode data for each location
    const geocodeData = await props.fetchGeocodeData(locations, apiKey)
    console.log(geocodeData);
    if (geocodeData instanceof Error) {
      return
    }

    // using geocode data, fetch weather data for each location
    const openWeatherData = await props.fetchOpenWeatherData(geocodeData, apiKey, units)
    console.log(openWeatherData);

    // create a map that holds the [subkey, key] pairs in the object returned by openWeather by iterating through a single location object.
    // we will use this to then quickly look up the values requested by user.
    const firstLocation = locations[1].city
    const location = {...openWeatherData[firstLocation]} // pull firstCity bc only need to sample one
    const categoryKeyMap = createCategoryKeyMap(location) // tie this into a state
    console.log(categoryKeyMap);

    let comparisonData = pullComparisonData(comparisonTerms, categoryKeyMap, openWeatherData)
    console.log(comparisonData);

    // append units to values
    comparisonData = addUnitsComparison(comparisonData, units, props.unitsToDataMap)
    console.log(comparisonData);

    props.liftWeatherData(comparisonData)
    props.liftDataPresentBool(true)
  }
  //valid city, valid state, at least one selection, at least 2 cities.
  function validateInputs (creds) {
    // name > 1 char
  }

  function PulledData (location, selection, map, data) {
    this.location = location
    this.state = data[location].state
    for (const item of selection) {
      try {
        this[item] = data[location][map.get(item)][item]
      } catch (e) {
        console.log(e)
        this[item] = 'N/A'
      }
    }
  }

  function pullComparisonData (termArray, keyMap, dataObject) {
    const data = []
    for (const location of Object.keys(dataObject)) {
      data.push(new PulledData(location, termArray, keyMap, dataObject))
    }
    return data
  }

  function createCategoryKeyMap (object) {
    const map = new Map()
    for (const [key, obj] of Object.entries(object)) {
      if (typeof obj === 'object') {
        for (const val in obj) {
          map.set(val, key)
        }
      }
    }
    return map
  }

  function addUnitsComparison (data, units, unitsMap) {
    for (const obj of data) {
      for (const term in obj) {
        if (unitsMap.has(term) && obj[term] !== 'N/A') {
          obj[term] = `${obj[term]}${unitsMap.get(term)[units]}`
        }
        if (term in {sunrise: '', sunset: ''}) {
          obj[term] = convertTime(obj[term])
        }
      }
    }
    return data
  }

  function convertTime (time) {
    return new Date(time * 1000).toLocaleTimeString('en-US')
  }

  function adjustCityInputObject (cityCount, eventTargetName) {
    if (eventTargetName === 'subtract') {
      setSearchInputs((prevState) => {
        const prevInputs = {...prevState}
        delete prevInputs[cityCount]
        return prevInputs
      })
    }
    console.log(cityCount, eventTargetName);
  }

  function liftInputs (input, eventTargetName, eventTargetNumber) {
    console.log('ComparisonInputForm', input, eventTargetName);
    setSearchInputs((prevState) => {
      return (
        {
          ...prevState,
          locations: {
            ...prevState.locations,
            [eventTargetNumber]: {
              ...prevState.locations[eventTargetNumber],
              [eventTargetName]: input
            }
          }
        }
      )
    })
    console.log(searchInputs);
  }

  function liftComparisonInputs (input) {

    setcomparisonTermsList((prevState) => {
      if (prevState.includes(input)) {
        const prevArray = [...prevState]
        prevArray.splice(prevState.indexOf(input), 1)
        return prevArray
      } else {
        return [...prevState, input]
      }
    })
  }

  function liftUnitInputs (input) {
    setSearchInputs((prevState) => {
      return {
        ...prevState,
        units: input
      }
    })
  }

}

export default ComparisonForm
