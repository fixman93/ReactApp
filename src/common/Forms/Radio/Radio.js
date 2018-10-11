import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RadioItem from './RadioItem'
import './Radio.css'

class Radio extends Component {
  state = {
    value: ''
  }

  static propTypes = {
    label: PropTypes.string,
    options: PropTypes.array.isRequired,
    desc: PropTypes.string,
    nameClass: PropTypes.string
  }

  handleChange = value => {
    this.setState({
      value
    })
  }

  render() {
    const {
      label,
      desc,
      options
    } = this.props

    return (
      <div className='form-input-group'>
        <label>{label} <span>{desc}</span></label>
        {options.map((option, index) => (
          <RadioItem
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

export default Radio