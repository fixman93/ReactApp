import React, { Component } from 'react'
import { Radar } from 'react-chartjs-2';
import TalentHeader from '../../../../common/TalentHeader'
import ProfileImage from 'assets/images/Talents/5.png'
import { withRouter } from 'react-router-dom';
import Pound from 'assets/images/pound.png'
import './Profile.css'
import { GET_CANDIDATE } from '../../../../services/queries';
import { Query } from 'react-apollo';
import YoutubeAccept from './YoutubeAccept';


const dataRadar = {
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
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      youtubeAccept: false,
      show: false
    }
  }

  componentDidMount() {
    this.setState({
      userId: localStorage.getItem('userId')
    })
    // if (this.props.location.state.data.fromRegister) {
    //   this.setState({
    //     show: this.props.location.state.data.fromRegister
    //   })
    // }
  }




  render() {
    const { show } = this.state;
    const { user, match, } = this.props;

    return (<Query query={GET_CANDIDATE} variables={{ id: user }}>

      {data => {
        const name = data && data.data.candidate && data.data.candidate.fullName
        const skills = data && data.data.candidate && data.data.candidate.skill && data.data.candidate.skill.edges
        const expectedSalary = data && data.data.candidate && data.data.candidate.desiredSalary
        const positionsLookingFor = data && data.data.candidate && data.data.candidate.rolesoughtSet
          && data.data.candidate.rolesoughtSet.edges && data.data.candidate.rolesoughtSet.edges
        const previousClients = data && data.data.candidate && data.data.candidate.jobSet
          && data.data.candidate.jobSet.edges
        return (<div className="ProfilePage" style={{ position: 'relative' }}>
          {/*  <YoutubeAccept show={show} handleShow={this.handleShow} fromRegister={fromRegister} /> */}
          <TalentHeader match={match} />
          <div className="Profile">
            <div className="container">
              <div className="UserInfo row">
                <div className="col-sm-6">
                  <div className="ProfileImage">
                    <img src={ProfileImage} alt="profile" />
                  </div>
                  <h2>{name}<a href="http://www.google.com">Portfolio</a></h2>
                  <h3>User Experience Designer at Google Laboratories</h3>
                  <div className="experience">
                    <span>Experience as</span>
                    {positionsLookingFor && positionsLookingFor.map((position, i) => {
                      return (<React.Fragment key={i}>
                        <b> {`${position.node.role.name} (${
                          position.node.experience
                          } years) ${i === positionsLookingFor.length ? '&' : ''}`}</b>
                      </React.Fragment>)
                    })}
                  </div>
                  <div className="experience">
                    {previousClients && previousClients.length > 0 ? previousClients.map((pr, i) => {
                      <React.Fragment>
                        <span>Previous Clients</span>
                        <b key={i}>{pr.node.company.name}</b>)
                      </React.Fragment>
                    }) : <span>No earlier experience working in companies</span>}
                  </div>
                </div>
                <div className="col-sm-6">
                  {/* <video width="360" height="200" controls>
                  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                  <source src="mov_bbb.ogg" type="video/ogg" />
                  Your browser does not support HTML5 video.
                </video> */}
                  <Radar data={dataRadar} />
                </div>
              </div>
              <div className="seeking">
                <h3>Seeking</h3>
                <ul>
                  {expectedSalary && <li>
                    <img src={Pound} alt="Pound" />
                    <div>
                      <span>Annual Salary</span>
                      <b>{expectedSalary.toString().slice(0, 2) +
                        ' ' + expectedSalary.toString().slice(2)}</b>
                    </div>
                  </li>}
                </ul>
              </div>
              <div className="skills">
                <h3>Skills</h3>
                <ul>
                  {skills && skills.map(skill => {
                    return <li key={skill.node.id}>{skill.node.skill}</li>
                  })}

                </ul>
              </div>
            </div>
          </div>
        </div>)
      }
      }
    </Query >
    )
  }
}

export default withRouter(Profile);