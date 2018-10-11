import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DropdownItem from './DropdownItem'
import DropdownList from './DropdownList'
import './Dropdown.css'

class Dropdown extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onInputClick: PropTypes.func.isRequired,
    onItemClick: PropTypes.func.isRequired,
    defaultValue: PropTypes.string.isRequired,
    dropdownActive: PropTypes.bool.isRequired,
    data: PropTypes.array.isRequired,
    dataToMap: PropTypes.string
  }

  static defaultProps = {
    type: 'text',
    defaultValue: '',
    dropdownActive: false,
    data: []
  }

  render () {
    const {
      id,
      type,
      label,
      placeholder,
      name,
      defaultValue,
      onInputClick,
      onItemClick,
      dropdownActive,
      data,
      dataToMap,
      refProp
    } = this.props
    return (
      <div className="dropdown" ref={refProp}>
        <label htmlFor={id}>{label}</label>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          name={name}
          value={defaultValue}
          onClick={onInputClick}
          readOnly
        />
        {dropdownActive && (
          <DropdownList>
            {data.map((item, index) => (
              <DropdownItem
                key={item.node.id || index}
                data={item}
                dataToMap={dataToMap}
                onClick={onItemClick}
              />
            ))}
          </DropdownList>
        )}
      </div>
    )
  }
}

export default Dropdown