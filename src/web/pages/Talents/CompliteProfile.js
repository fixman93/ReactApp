import React, { Component } from 'react'
import UserTalent from '../UserTalent'
import ProfileImage from 'assets/images/Talents/5.png'
import Pound from 'assets/images/pound.png'
import './CompliteProfile.css'

export class CompliteProfile extends Component {
    render() {
        return (
            <UserTalent
                heading={{
                    title: 'Complete your profile ',
                    desc: 'We need to capture your needs to macth you with jobs accurately.',
                    color: 'white'
                }}
            >
                <div className="Profile CompliteProfile">
                    <div className="container">
                        <div className="Profile-image-link">
                            <div className="ProfileImage">
                                <img src={ProfileImage} alt="profile image" />
                            </div>
                            <div className="ProfileLink">
                                <a href="http://www.google.com">Portfolio</a>
                            </div>
                        </div>
                        <div className="UserInfo row">
                            <div className="col-sm-6">
                                <h2>Sarah Peterson</h2>
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
                                <video width="360" height="200" controls>
                                    <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                                    <source src="mov_bbb.ogg" type="video/ogg" />
                                    Your browser does not support HTML5 video.
                                </video>
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
            </UserTalent>
        )
    }
}

export default CompliteProfile