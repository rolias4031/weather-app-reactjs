import CitySearchBar from './CitySearchBar'
import StateDropdown from './StateDropdown'

function LocationInputBars (props) {
  return (
    <div className="">
      <div className="row justify-content-center mx-1 my-2">
        <div className="col">
          <label className="city-input-label p-1" htmlFor="">{`City ${props.number}`}</label>
          <CitySearchBar liftInputs={props.liftInputs} number={props.number}/>
        </div>
      </div>
      <div className="row justify-content-center mx-1 my-2">
        <div className="col">
          <StateDropdown liftInputs={props.liftInputs} number={props.number}/>
        </div>
      </div>
    </div>
  )
}

export default LocationInputBars
