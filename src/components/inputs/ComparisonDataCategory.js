import DataSelectItem from './DataSelectItem'
import '../App.css'

function ComparisonDataCategory (props) {

  let categoryTitle = props.category.charAt(0).toUpperCase() + props.category.slice(1)

  return (

    <div className="container my-1">
      <div className="row">

        <div className="col-12">
          <h6 className="p-1 weather-category-title">{categoryTitle}</h6>
        </div>

        <div className="col" align="left">
          <div className="row px-1">
            {renderSelectionItems(props)}
          </div>
        </div>

      </div>
    </div>

  )

  function renderSelectionItems (props) {
    return props.categoryItems.map((item) => {
      return (
        <DataSelectItem key={item} rawTitle={item} titleMap={props.titleMap} liftComparisonInputs={props.liftComparisonInputs}/>
      )
    })
  }
}

export default ComparisonDataCategory
