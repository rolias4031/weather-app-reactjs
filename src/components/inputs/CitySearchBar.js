import { useState } from 'react'
import '../App.css'

function CitySearchBar (props) {

  const [cityInput, setCityInput] = useState('')

  function cityChangeHandler (event) {
    setCityInput(event.target.value)
    props.liftInputs(event.target.value, event.target.name, props.number)
  }

  return (
    <div className="">
      <input
        onChange={cityChangeHandler}
        className="form-control"
        type="text"
        name="city"
        value={cityInput}
        placeholder="Enter a City"
      />
    </div>
  )
}

export default CitySearchBar
