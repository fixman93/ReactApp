import React, { Component } from 'react'
import PropTypes from 'prop-types'
import x from 'assets/images/x.svg'
import SkillExperienceList from './SkillExperienceList'


class CompanyItem extends Component {

  componentWillMount() {
    this.props.onClick();
  }

  render() {
    const { data, onRemove } = this.props;
    return (<li className='skill-list-item'>
      {data.name}
      <span
        onClick={() => onRemove(data.name)}
      >
        <img src={x} alt='' />
      </span>
    </li>)
  }
}


class SkillListItem extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    onRemove: PropTypes.func.isRequired
  }

  state = {
    experience: '',
    experienceActive: true
  }



  handleExperienceClick = async value => {
    await this.setState({
      experience: value,
      experienceActive: false
    })
    this.props.onClick()
  }

  toggleExp = () => {
    this.setState(prevState => ({
      experienceActive: !prevState.experienceActive
    }))
  }

  render() {
    const { data, onRemove, onClick } = this.props
    const { experience, experienceActive } = this.state

    if (data) {
      if (data.skill) {
        return <React.Fragment>
          <li className='skill-list-item'>
            {data.skill}
            {' '}
            {<span
              onClick={this.toggleExp}
              className='skill-list-span'
            >
              {experience || 'Select level'}
            </span>}
            <span
              onClick={() => onRemove(data.skill)}
            >
              <img src={x} alt='' />
            </span>
          </li>
          {(experienceActive) && (
            <SkillExperienceList
              onExperienceClick={this.handleExperienceClick}
            />)}
        </React.Fragment>
      } else {
        return <CompanyItem onClick={onClick} onRemove={onRemove} data={data} />
      }
    }
  }
}

export default SkillListItem