import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SkillDropdown from './SkillDropdown'
import add from 'assets/images/add.svg'
import './NewSkill.css'

class NewSkill extends Component {
  static propTypes = {
    placeholder: PropTypes.string.isRequired,
    onAdd: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      value: '',
      skills: [],
      dropdownActive: false
    }
    this.dropdownRef = React.createRef()
  }

  componentDidMount = () => {
    window.addEventListener('click', this.handleOutsideDropdownClick)
  }

  componentWillUnmount = () => {
    window.removeEventListener('click', this.handleOutsideDropdownClick)
  }

  handleOutsideDropdownClick = e => {
    if (this.state.dropdownActive && !this.dropdownRef.current.contains(e.target)) {
      this.setState({ dropdownActive: false })
    }
  }

  handleChange = e => {
    this.setState({
      value: e.target.value
    })
    this.handleAutocomplete()
  }

  activateDropdown = () => {
    this.setState({
      dropdownActive: true
    })
  }

  closeDropdown = () => {
    this.setState({
      dropdownActive: false,
      value: ''
    })
  }

  handleAutocomplete = () => {
    const { data } = this.props
    const skills = data &&
      data.data && 
      data.data.allSkills && 
      data.data.allSkills.edges
    this.setState(prevState => ({
      skills: skills.filter(item => (
        item.node.skill.toLowerCase().includes(this.state.value.toLowerCase())
      ))
    }))
  }

  render () {
    const { placeholder, onAdd } = this.props
    const { dropdownActive, skills, value } = this.state
    return (
      <React.Fragment>
        <div ref={this.dropdownRef} className='new-skill-container'>
          <input
            value={value}
            placeholder={placeholder}
            onChange={this.handleChange}
            onClick={this.activateDropdown}
            className='new-skill-input'
          />
          <img src={add} alt='' className='new-skill-icon' />
        </div>
        {dropdownActive && (
          <SkillDropdown
            skills={skills}
            onClick={async (item) => {
                await onAdd(item.node)
                await this.closeDropdown()
            }}
          />
        )}
      </React.Fragment>
    )
  }
}

export default NewSkill