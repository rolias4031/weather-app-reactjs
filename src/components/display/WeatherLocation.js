import Item from './Item'
import '../App.css'

function WeatherLocation (props) {
  console.log(props.data)

  let locationText = (
    <h5 className="location-title">
    {`${props.location.charAt(0).toUpperCase() + props.location.slice(1)}, ${props.data.state}`}
    </h5>

  )

  return (
    <div>
      <div>{locationText}</div>
      <div>{renderLocationData(props)}</div>
    </div>
  )

  function renderLocationData (props) {
    const array = Object.keys(props.data)
    let content = array.map((key) => {
      if (!(key in {location: '', state: ''})) {
        return (
          <Item
            key={key}
            rawTitle={key}
            data={props.data[key]}
            titleMap={props.titleMap}
          />
        )
      }
    })
    return content
  }
}

export default WeatherLocation
