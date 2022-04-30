import WeatherCategory from './WeatherCategory'

function WeatherDisplayNormal (props) {

  let displayContent
  displayContent = renderDisplayContent(props)

  return (
    <div className="container my-3">
      <div className="row justify-content-center">
        <div className="col-8">

          {displayContent}

        </div>
      </div>
    </div>
  )

  function renderDisplayContent (props) {
    if (props.dataPresentBool) {
      const finishedWeatherData = processWeatherData(props.data)

      const content = Object.keys(finishedWeatherData).map((key) => {
        if (Object.keys(finishedWeatherData[key]).length > 0) {
          return (
            <WeatherCategory
              key={key}
              title={key}
              data={finishedWeatherData[key]}
              dataPresentBool={props.dataPresentBool}
              titleMap={props.titleMap}
            />
          )
        }
      })
      return content
    }
  }

  function processWeatherData (data) {

    const keyMap = new Map([
      ['main', 'Temperature'],
      ['rain', 'Rain'],
      ['clouds', 'Clouds'],
      ['wind', 'Winds'],
      ['sys', 'More']
    ])
    let weatherData = {}

    for (const [key, value] of keyMap.entries()) {
      weatherData[value] = {...data[key]}
      console.log(weatherData);
    }
    for (const key of ['type', 'id', 'country']) {
      delete weatherData.More[key]
    }
    for (const key of ['humidity','pressure','sea_level', 'grnd_level']) {
      delete weatherData.Temperature[key]
    }
    return weatherData
  }

  function convertTime (time) {
    return new Date(time * 1000).toLocaleTimeString('en-US')
  }
}

export default WeatherDisplayNormal
