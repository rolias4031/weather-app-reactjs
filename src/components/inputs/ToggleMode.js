import { useState } from 'react'

function ToggleMode (props) {

  const [comparisonMode, setComparisonMode] = useState(false)

  return (

    <div className="form-check form-switch">
      <input onChange={toggleModeHandler} className="form-check-input" type="checkbox" role="switch"/>
      <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Comparison Mode</label>
    </div>

  )

  function toggleModeHandler () {
    props.liftMode(!comparisonMode)
    props.liftDataPresentBool(false)
    props.resetWeatherData()
    setComparisonMode((prevState) => {
      return !prevState
    })
  }
}

export default ToggleMode
