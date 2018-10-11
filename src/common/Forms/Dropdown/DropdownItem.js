import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const DropdownItem = ({ data, onClick, dataToMap }) => (
  <Fragment>
    {data.node.title && <dt value={data.title}>{data.title}</dt>}
    {/* {data.items.map((item, index) => (
      <dd
        key={index}
        value={item}
        onClick={() => onClick(item)}
      >
        {item}
      </dd>
    ))} */}
    <dd onClick={() => onClick(data.node[dataToMap], data.node.id)}>{data.node[dataToMap]}</dd>
  </Fragment>
)

DropdownItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  dataToMap: PropTypes.string
}

export default DropdownItem