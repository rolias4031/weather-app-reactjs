import WeatherLocation from './WeatherLocation'

function WeatherDisplayComparison (props) {

  let displayContent

  return (
    <div className="container my-3">
      <div className="row justify-content-center">
        <div className="col-8">

          {renderLocations(props)}

        </div>
      </div>
    </div>
  )

  function renderLocations (props) {
    let content
    if (props.dataPresentBool) {
      content = props.data.map((element, i) => {
        return (
          <WeatherLocation
            key={element.location}
            location={element.location}
            data={element}
            titleMap={props.titleMap}
          />
        )
      })

    } else {
      content = <div></div>
    }
    return content
  }
}

export default WeatherDisplayComparison
