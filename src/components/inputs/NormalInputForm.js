import CitySearchBar from './CitySearchBar'
import StateDropdown from './StateDropdown'
import UnitsRadioButton from './UnitsRadioButton'
import SearchButton from './SearchButton'

import { useState } from 'react'

function InputForm (props) {

  const [searchInputs, setSearchInputs] = useState({
    units: '',
    apiKey: props.apiKey,
    locations: {
      1: {
        city: '',
        state: ''
      }
    }
  })

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-12">

          <form onSubmit={searchHandler} className="form-control">
            <div className="row justify-content-center mx-1 my-2">
              <div className="col">
                <CitySearchBar liftInputs={liftInputs}/>
              </div>
            </div>
            <div className="row justify-content-center mx-1 my-2">
              <div className="col">
                <StateDropdown liftInputs={liftInputs}/>
              </div>
            </div>
            <div className="row justify-content-center mx-1">
              <div className="col">
                <UnitsRadioButton liftInputs={liftUnitInputs}/>
              </div>
            </div>
            <div className="row justify-content-center mx-1 my-2">
              <div className="col">
                <SearchButton />
              </div>
            </div>
          </form>

        </div>
      </div>
    </div>
  )

  async function searchHandler (e) { // creds => url => data name convention
    e.preventDefault()
    const submittedInputs = {...searchInputs}
    const INVALID = props.validateFormInputs(submittedInputs, props.comparisonMode)
    if (INVALID) {
      alert(INVALID)
      return
    }
    console.log(submittedInputs);
    const { locations } = submittedInputs
    const { city } = submittedInputs.locations[1]
    const { units } = submittedInputs
    const { apiKey } = submittedInputs

    const geocodeData = await props.fetchGeocodeData(locations, apiKey)
    console.log(geocodeData);
    if (geocodeData instanceof Error) {
      return
    }

    let openWeatherData = await props.fetchOpenWeatherData(geocodeData, apiKey, units)
    openWeatherData = {...openWeatherData[city]}
    console.log(openWeatherData);

    openWeatherData = addUnitsNormal(openWeatherData, units, props.unitsToDataMap)
    console.log(openWeatherData);

    props.liftWeatherData(openWeatherData)
    props.liftDataPresentBool(true)

  }

  function addUnitsNormal (obj, units, unitsMap) {
    for (const key in obj) {
      if (typeof obj[key] === 'object') {
        for (const [subkey, val] of Object.entries(obj[key])) {
          if (unitsMap.has(subkey) && val !== 'N/A') {
            obj[key][subkey] = `${obj[key][subkey]}${unitsMap.get(subkey)[units]}`
          }
          if (subkey in {sunrise: '', sunset: ''}) {
            obj[key][subkey] = convertTime(obj[key][subkey])
          }
        }
      }
    }
    return obj
  }

  function convertTime (time) {
      return new Date(time * 1000).toLocaleTimeString('en-US')
    }


  function liftInputs (input, eventTargetName) {
    console.log(input, eventTargetName);
    setSearchInputs((prevState) => {
      return (
        {...prevState,
        locations: {
          1: {
            ...prevState.locations[1],
            [eventTargetName]: input
          }
        }}
      )
    })
    console.log(searchInputs);
  }

  function liftUnitInputs (input) {
    console.log(input);
    setSearchInputs((prevState) => {
      return ({
        ...prevState,
        units: input
      })
    })
    console.log(searchInputs);
  }

}

export default InputForm
