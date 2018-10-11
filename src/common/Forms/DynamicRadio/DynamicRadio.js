import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../Radio/Radio.css'

class DynamicRadio extends Component {
  state = {
    value: ''
  }

  static propTypes = {
    label: PropTypes.string,
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
      options,
      name
    } = this.props

    return (
      <div className='form-input-group'>
        <label>{label} <span>{desc}</span></label>
        {options.answer.edges.map((option, index) => {
          console.log(option)
          return (
            <div key={index} className='radio-input-container'>
              <input
                type='radio'
                id={label + index}
                name={name}
                value={option.node.id}
                onChange={() => this.handleChange(option.node.answer)}
              />
              <label htmlFor={label + index}>
                {option.node.answer}
              </label>
            </div>
          )
        }
        )}
      </div>
    )
  }
}

export default DynamicRadio