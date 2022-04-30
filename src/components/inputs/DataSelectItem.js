import { useState } from 'react'

import '../App.css'

function DataSelectItem (props) {
  const [selectedData, setSelectedData] = useState('')
  const [data, setData] = useState('')

  const selectionTitle = renderSelectionTitle(props)

  return (
    <div className="col-6">
      <div className="form-check form-check-inline">
        <input
          onChange={checkboxHandler}
          className="form-check-input"
          type="checkbox"
          value={props.rawTitle}
          name="comparisonData"/>
        <label className="form-check-label" htmlFor="">{selectionTitle}</label>
      </div>
    </div>
  )

  function renderSelectionTitle (props) {
    if (props.titleMap.has(props.rawTitle)) {
      return props.titleMap.get(props.rawTitle)
    } else {
      return props.rawTitle.charAt(0).toUpperCase() + props.rawTitle.slice(1)
    }
  }

  function checkboxHandler (e) {
    console.log(e.target.value);
    setSelectedData(e.target.value)
    props.liftComparisonInputs(e.target.value)
  }
}

export default DataSelectItem
