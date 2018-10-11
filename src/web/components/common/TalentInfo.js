import React from 'react'
import PropTypes from 'prop-types'
import Button from 'common/Forms/Button'
import UIContainer from 'common/UIContainer'
import './TalentInfo.css'


const TalentInfo = ({title, position, imgSrc}) => (
  <UIContainer>
    <div className='col job-posting'>
      <div className='row'>
        <div className="rotateImg">
          <img src={imgSrc} alt='' />
        </div>
        <div className='job-info'>
          <p>{title} &gt;</p>
          <small>{position}</small>
        </div>
        <div className="job-btn-container">
        <Button
          className='btn btn-red text-bold'
          text='Reject'
        />
        <Button
          className='btn btn-request text-bold'
          text='Request Interview'
        />
        </div>
      </div>
      <hr />
      <div className='row TalentProgress'>
        <ul>
            <li>
              <div className="TopApply">
                <span>Applied</span>
              </div>
              <div className="BottomApply">
                <b>Applied</b>
                <span>02/02/2018</span>
                <p>Passed</p>
              </div>
            </li>
            <li>
              <div className="TopApply">
                <span>1st Stage Interview</span>
              </div>
              <div className="BottomApply">
                <b>1st Interview</b>
                <span>02/02/2018</span>
                <p>Passed</p>
              </div>
            </li>
            <li>
              <div className="TopApply">
                <span>2st Stage Interview</span>
              </div>
              <div className="BottomApply">
                <b>1st Interview</b>
                <span>02/02/2018</span>
                <p>Passed</p>
              </div>
            </li>
            <li className="offer">
              <div className="TopApply">
                <span>offer</span>
              </div>
              
            </li>
        </ul>
      </div>
    </div>
  </UIContainer>
)

TalentInfo.propTypes = {
    title: PropTypes.string.isRequired,
    postedAt: PropTypes.string,
    imgSrc: PropTypes.string
  }


  export default TalentInfo