import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RadioItem from './RadioItem'
import ErrorMessage from '../../Error/ErrorMessage';
import './Radio.css'

class Radio extends Component {
  state = {
    value: ''
  }

  static propTypes = {
    label: PropTypes.string,
    options: PropTypes.array.isRequired,
    desc: PropTypes.string,
    nameClass: PropTypes.string,
    error: PropTypes.string
  }


  componentDidMount() {
    if (this.props.val) {
      this.setState({
        value: this.props.val
      })
    }
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
      error
    } = this.props

    return (
      <div className='form-input-group'>
        {error && <ErrorMessage message={error} />}
        <label>{label} <span>{desc}</span></label>
        {options && options.map((option, index) => (
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