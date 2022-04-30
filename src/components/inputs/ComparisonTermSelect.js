import { useState } from 'react'

import ComparisonDataCategory from './ComparisonDataCategory'

function ComparisonTermSelect (props) {

  const dataCategories = {
    weather: ['description'],
    main: ['temp', 'feels_like', 'temp_min', 'temp_max', 'humidity'],
    clouds: ['all'],
    rain: ['1h', '3h'],
    wind: ['speed', 'deg', 'gust'],
    sys: ['sunrise', 'sunset']
  }

  let categoryContent = renderCategories(dataCategories)

  return (
    <div className="">
      {categoryContent}
    </div>
  )

  function renderCategories (dataCategories) {
    return Object.keys(dataCategories).map((key) => {
      return (
        <ComparisonDataCategory
          key={key}
          category={key}
          categoryItems={dataCategories[key]}
          titleMap={props.titleMap}
          liftComparisonInputs={props.liftComparisonInputs} />
      )
   })
  }

}

export default ComparisonTermSelect
