import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Input.css'

export class Input extends Component {
  static propTypes = {
    label: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string.isRequired,
    desc: PropTypes.string,
    className: PropTypes.string
  }

  constructor(props) {
    super(props)
    this.state = {
      value: '',
      inputActive: true,
      initialLoad: true
    }
    this.inputRef = React.createRef()
  }

  componentDidUpdate = () => {
    const { initialLoad } = this.state
    const { defaultValue } = this.props
    if (defaultValue && initialLoad) {
      this.setState({
        inputActive: false,
        initialLoad: false
      })
    }
  }

  handleChange = e => {
    this.setState({ value: e.target.value })
  }

  handleInputActivate = async () => {
    await this.setState({
      value: this.props.defaultValue,
      inputActive: true
    })
    this.inputRef.current.focus()
  }

  render() {
    const {
      id,
      label,
      type,
      name,
      placeholder,
      desc,
      className,
      defaultValue,
      propsRef
    } = this.props
    const { inputActive } = this.state
    return (
      <div
        ref={propsRef}
        className={`input-form form-input-group ${className}`.trim()}
      >
        <label htmlFor={id}>{label} <span>{desc}</span></label>
        {inputActive ? (
          <input
            ref={this.inputRef}
            type={type}
            id={id}
            name={name}
            placeholder={placeholder}
            value={this.state.value}
            onChange={this.handleChange}
          />
        ) : (
            <p onClick={() => this.handleInputActivate()}>{defaultValue}</p>
          )}
      </div>
    )
  }
}

export default Input
