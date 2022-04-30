function Item (props) {

  let displayContent = <span className={`item-data`}>{props.data}</span>

  // if (props.rawTitle === 'temp') {
  //   console.log('TEST');
  //   displayContent =
  //   <span className={`item-data ${props.onAlter(parseFloat(props.info.slice(0,2)))}`}>
  //     {props.info}
  //   </span>
  // }

  let itemTitle = formatItemTitle(props)

  return (
    <div className="mx-5 my-1">
      <span className="item-title">
        {itemTitle}
      </span>
      {displayContent}
      <br/>
    </div>
  )

  function formatItemTitle (props) {
    if (props.titleMap.has(props.rawTitle)) {
      return props.titleMap.get(props.rawTitle)
    } else {
      return props.rawTitle.charAt(0).toUpperCase() + props.rawTitle.slice(1)
    }
  }
}

export default Item
