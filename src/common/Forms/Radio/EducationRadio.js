import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RadioItem from './RadioItem'
import './Radio.css'

class EducationRadio extends Component {
  state = {
    value: ''
  }

  static propTypes = {
    label: PropTypes.string,
    options: PropTypes.array.isRequired,
    desc: PropTypes.string,
    className: PropTypes.string
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
        {options.map((option, index) => {
          return (
            <div key={index} className='radio-input-container'>
              <input
                type='radio'
                id={option.node.id}
                name='educationLevelId'
                value={option.node.id}
                onChange={() => this.handleChange(option.node.name)}
              />
              <label htmlFor={option.node.id}>
                {option.node.name}
              </label>
            </div>
          )
        })}
      </div>
    )
  }
}

export default EducationRadio