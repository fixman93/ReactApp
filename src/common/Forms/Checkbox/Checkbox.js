import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CheckboxItem from './CheckboxItem'
import './Checkbox.css'

class Checkbox extends Component {
  state = {
    value: ''
  }

  static propTypes = {
    label: PropTypes.string,
    options: PropTypes.array.isRequired,
    desc: PropTypes.string,
    nameClass: PropTypes.string
  }

  handleChange = () => {
    this.setState({
      value: !this.state.value
    })
  }

  render() {
    const {
      label,
      desc,
      options
    } = this.props

    return (
      <div className='form-input-group checkbox'>
        <label>{label} <span>{desc}</span></label>
        {options.map((option, index) => (
          <CheckboxItem
            key={index}
            option={option}
            defaultValue={this.state.value}
            onChange={this.handleChange}
          />
        ))}
      </div>
    )
  }
}

export default Checkbox