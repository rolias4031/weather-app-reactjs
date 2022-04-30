import { useState } from 'react'

function UnitsRadioButton (props) {

  const [unitsInput, setUnitsInput] = useState('')

  function unitsChangeHandler (e) {
    setUnitsInput(e.target.value)
    console.log(e.target.value);
    props.liftInputs(e.target.value)
  }

  return (
    <div className="m-2">
      <div className="form-check form-check-inline">
        <input onChange={unitsChangeHandler} className="mx-1 form-check-input" type="radio" name="units" value="imperial"/>
        <label className="form-check-label" htmlFor="Imperial">Imperial</label>
      </div>
      <div className="form-check form-check-inline">
        <input onChange={unitsChangeHandler} className="mx-1 form-check-input" type="radio" name="units" value="metric"/>
        <label className="form-check-label" htmlFor="Metric">Metric</label>
      </div>
    </div>
  )
}

export default UnitsRadioButton
