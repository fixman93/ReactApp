import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from 'common/Forms/Button'
import UIContainer from 'common/UIContainer'
import DaysLeft from './DaysLeft'
import SkillItem from './SkillItem'
import InfoLink from './InfoLink'
import JobInfoTag from './JobInfoTag'
import pound from 'assets/images/pound.svg'
import videoImg from 'assets/images/Company/video.png'
import portfolioImg from 'assets/images/Company/portfolio.png'
import mapImg from 'assets/images/Company/map.png'
import './TalentApplication.css'


class TalentApplication extends Component {
  daysLeft = () => {
    const { daysLeft } = this.props.candidate
    if (daysLeft > 1) {
      return `${daysLeft} Days left`
    } else if (daysLeft === 1) {
      return `${daysLeft} Day left`
    } else {
      return `Expired`
    }
  }

  render () {
    const { 
      candidate: {
        name,
        position,
        imgSrc,
        skills
      } 
    } = this.props

    return (
      <UIContainer>
        <div className='col job-posting'>
          <div className='row'>
          <div className="rotateImg">
            <img src={imgSrc} alt='' />
          </div>
            <div className='job-info'>
              <p>{name} &gt;</p>
              <small>{position}</small>
            </div>
            <div className="job-btn-container">
              <DaysLeft
                text={this.daysLeft()}
              />
              <Button
                className='btn btn-red text-bold'
                text='Reject'
              />
              <Button
                className='btn btn-request text-bold'
                text='Interview'
              />
            </div>
            <p className='experience-text'>
              Experience in <strong>Product Design (2 years) & User Experience (4 years)</strong>
              {" | "}
              Previous Clients <strong>Nike, Adidas, Barclays, HSBC, Amazon, Google</strong>
            </p>
            {skills.map((skill, index) => (
              <SkillItem key={skill + index} text={skill} />
            ))}
          </div>
          <hr />
          <div className='row'>
            <InfoLink
              imgSrc={videoImg}
              text='Video'
            />
            <InfoLink
              imgSrc={portfolioImg}
              text='Portfolio'
            />
            <div className='application-btn-container'>
              <JobInfoTag color='red' text='59% match' />
              <JobInfoTag imgSrc={pound} text='82,000 per annum' />
              <JobInfoTag imgSrc={mapImg} text='London Bridge, London' />
            </div>
          </div>
        </div>
      </UIContainer>
    )
  }
}

TalentApplication.propTypes = {
  candidate: PropTypes.shape({
    name: PropTypes.string.isRequired,
    postedAt: PropTypes.string,
    imgSrc: PropTypes.string,
    daysLeft: PropTypes.number,
    skills: PropTypes.array
  })
}


  export default TalentApplication