import React, { Component } from 'react'
import { Radar } from 'react-chartjs-2';
import TalentHeader from '../../../../common/TalentHeader'
import ProfileImage from 'assets/images/Talents/5.png'
import LinkImage from 'assets/images/portfolio.svg'
import Pound from 'assets/images/pound.png'
import './Profile.css'


const data = {
  labels: ['Axure', 'Team management', 'User Research', 'User Testing', 'Responsive Design ', 'App Native design', 'Sketch', 'Uxpin'],
  datasets: [
    {
      label: '',
      backgroundColor: 'rgba(0, 193, 216, 0.5)',
      borderColor: 'white',
      pointBackgroundColor: 'rgba(179,181,198,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(179,181,198,1)',
      data: [3, 2.5, 2.5, 2.5, 1, 3, 3, 2.5]
    }
  ]
};

export class Profile extends Component {
  render() {
    const match = this.props
    return (
      <div className="ProfilePage">
        <TalentHeader match={match} />
        <div className="Profile">
          <div className="container">
            <div className="UserInfo row">
              <div className="col-sm-6">
                <div className="ProfileImage">
                  <img src={ProfileImage} alt="profile image" />
                </div>
                <h2>Sarah Peterson <a href="http://www.google.com">Portfolio</a></h2>
                <h3>User Experience Designer at Google Laboratories</h3>
                <div className="experience">
                  <span>Experience in</span>
                  <b>User Experience Designer (2 years) & UI & UX Designer (4 years)</b>
                </div>
                <div className="experience">
                  <span>Previous Clients</span>
                  <b>Nike, Adidas, Barclays, HSBC, Amazon, Google</b>
                </div>
              </div>
              <div className="col-sm-6">
                {/* <video width="360" height="200" controls>
                  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                  <source src="mov_bbb.ogg" type="video/ogg" />
                  Your browser does not support HTML5 video.
                      </video> */}
                <Radar data={data} />
              </div>
            </div>
            <div className="seeking">
              <h3>Seeking</h3>
              <ul>
                <li>
                  <img src={Pound} alt="Pound" />
                  <div>
                    <span>Annual Salary</span>
                    <b>£70,000</b>
                  </div>
                </li>
                <li>
                  <img src={Pound} alt="Pound" />
                  <div>
                    <span>Annual Salary</span>
                    <b>£70,000</b>
                  </div>
                </li>
                <li>
                  <img src={Pound} alt="Pound" />
                  <div>
                    <span>Annual Salary</span>
                    <b>£70,000</b>
                  </div>
                </li>
                <li>
                  <img src={Pound} alt="Pound" />
                  <div>
                    <span>Annual Salary</span>
                    <b>£70,000</b>
                  </div>
                </li>
                <li>
                  <img src={Pound} alt="Pound" />
                  <div>
                    <span>Annual Salary</span>
                    <b>£70,000</b>
                  </div>
                </li>
                <li>
                  <img src={Pound} alt="Pound" />
                  <div>
                    <span>Annual Salary</span>
                    <b>£70,000</b>
                  </div>
                </li>
                <li>
                  <img src={Pound} alt="Pound" />
                  <div>
                    <span>Annual Salary</span>
                    <b>£70,000</b>
                  </div>
                </li>
                <li>
                  <img src={Pound} alt="Pound" />
                  <div>
                    <span>Annual Salary</span>
                    <b>£70,000</b>
                  </div>
                </li>
                <li>
                  <img src={Pound} alt="Pound" />
                  <div>
                    <span>Annual Salary</span>
                    <b>£70,000</b>
                  </div>
                </li>
              </ul>
            </div>
            <div className="skills">
              <h3>Skills</h3>
              <ul>
                <li>Sketch</li>
                <li>Adobe Photoshop</li>
                <li>Adobe InDesign</li>
                <li>UserExperience</li>
                <li>Managing Team</li>
                <li>Sketch</li>
                <li>Adobe Photoshop</li>
                <li>Adobe InDesign</li>
                <li>UserExperience</li>
                <li>Managing Team</li>
                <li>Sketch</li>
                <li>Adobe Photoshop</li>
                <li>Adobe InDesign</li>
                <li>UserExperience</li>
                <li>Managing Team</li>
                <li>Sketch</li>
                <li>Adobe Photoshop</li>
                <li>Adobe InDesign</li>
                <li>UserExperience</li>
                <li>Managing Team</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile