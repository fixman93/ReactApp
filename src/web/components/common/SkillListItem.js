import React, { Component } from 'react'
import PropTypes from 'prop-types'
import x from 'assets/images/x.svg'
import star from '../../../assets/images/Company/star.png'
import star_gray from '../../../assets/images/Company/star_1.png'
import SkillExperienceList from './SkillExperienceList'


let Star = () => <img
  src={star}
  alt="star"
  style={{ width: "13px", height: "13px", margin: "0 0.1em 0.2em" }} />
let StarGray = () => <img
  src={star_gray}
  alt="star_gray"
  style={{ width: "13px", height: "13px", margin: "0 0.1em 0.2em" }} />

class CompanyItem extends Component {

  componentWillMount() {
    this.props.onClick();
  }

  render() {
    const { data, onRemove } = this.props;
    return (<li className='skill-list-item'>
      {data.name}
      <span
        style={{ margin: "0 0.2em" }}
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

  componentWillMount() {
    if (this.props.fromBack) {
      this.setState({
        experienceActive: false
      })
    }
  }


  handleExperienceClick = async value => {
    console.log(value)
    await this.setState({
      experience: value,
      experienceActive: false
    })
    //this.props.onClick()
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
              {experience !== '' ? experience === "Novice" ?
                <span className="skill-experience-group" >
                  <Star />
                  <StarGray />
                  <StarGray />
                </span> : experience === 'Intermediate' ?
                  <span className="skill-experience-group" >
                    <Star />
                    <Star />
                    <StarGray />
                  </span> :
                  <span className="skill-experience-group" >
                    <Star />
                    <Star />
                    <Star />
                  </span>
                : 'Select level'}
            </span>}
            <span
              onClick={() => onRemove(data.skill)}
            >
              <img src={x} alt='' />
            </span>
          </li>
          {(experienceActive) && (
            <SkillExperienceList
              data={data}
              onClick={onClick}
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