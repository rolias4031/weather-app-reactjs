import Item from './Item'

import { useState } from 'react'

function WeatherCategory (props) {

  const [expandBool, setExpandBool] = useState(true)
  const alterFunctionMap = new Map([['temp', alterTempStyle]])
  let displayContent
  displayContent = renderDisplayContent(props, expandBool)

  return (
    <div className="row justify-content-center my-2">
      <div className="col-8" align="center">
        <h4 onClick={expandHandler.bind(null, expandBool)} className="mx-2 mt-3 weather-category-title">
          {props.title}
        </h4>
        {displayContent}
      </div>
    </div>
  )

  function renderDisplayContent (props, expandBool) {
    if (props.dataPresentBool && expandBool) {
      const content = Object.keys(props.data).map((key) => {
        return (
          <Item
            key={key}
            rawTitle={key}
            data={props.data[key]}
            onAlter={alterFunctionMap.has(key) ? alterFunctionMap.get(key) : null}
            titleMap={props.titleMap}
          />
        )
      })
      return content
    }
  }

  function alterTempStyle (temp) {
    console.log(temp);
    if (temp >= 85) {
      return 'temp-hot'
    } else if (temp < 85 && temp >= 70) {
      return 'temp-warm'
    } else if (temp < 70 && temp >= 55) {
      return 'temp-cool'
    } else {
      return 'temp-cold'
    }
  }

  function expandHandler (bool) {
    if (bool) {
      setExpandBool(false)
    }
    else {
      setExpandBool(true)
    }
  }
}

export default WeatherCategory
