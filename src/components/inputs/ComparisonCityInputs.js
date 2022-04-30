import LocationInputBars from './LocationInputBars'
import IncrementCityButtons from './IncrementCityButtons'
import '../App.css'
import { useState } from 'react'

function ComparisonCityInputs (props) {

  const [cityCount, setCityCount] = useState(2)

  return (
    <div>
      {renderCityInputs(cityCount)}
      <div className="row justify-content-center mx-1 my-2">
        <div className="col">
          <IncrementCityButtons cityCountHandler={cityCountHandler} cityCount={cityCount}/>
        </div>
      </div>
    </div>
  )

  function renderCityInputs(count) {
    let inputArray = []
    for (let i = 1; i < count+1 ; i++) {
      inputArray.push(
        <LocationInputBars key={i} liftInputs={props.liftInputs} number={i} />
      )
    }
    return inputArray
  }

  function cityCountHandler (cityCount, e) {
    const name = e.target.name
    if ((cityCount === 1 && name === 'subtract') || (cityCount === 5 && name ==='add')) {
      return
    } else if (name === 'add') {
      setCityCount((prevState) => {
        return prevState + 1
      })
    } else if (name === 'subtract') {
      props.adjustCityInputObject(cityCount, name)
      setCityCount((prevState) => {
        return prevState - 1
      })
    }
  }
}

export default ComparisonCityInputs
