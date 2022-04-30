function IncrementCityButtons (props) {

  return (
    <div className="btn-group">
      <button onClick={props.cityCountHandler.bind(null, props.cityCount)} className="btn btn-danger" type="button" name="subtract">−</button>
      <button onClick={props.cityCountHandler.bind(null, props.cityCount)} className="btn btn-primary" type="button" name="add">+</button>
    </div>
  )

  function clickHandler (e) {
    const name = e.target.name
  }

}

export default IncrementCityButtons
