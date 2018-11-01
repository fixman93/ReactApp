import React, { Component } from 'react'
import { Radar } from 'react-chartjs-2';
import TalentHeader from '../../../../common/TalentHeader'
import ProfileImage from 'assets/images/Talents/5.png'
import LinkImage from 'assets/images/portfolio.svg'
import Pound from 'assets/images/pound.png'
import './Profile.css'
import { GET_CANDIDATE } from '../../../../services/queries';
import { Query } from 'react-apollo';


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
  constructor(props) {
    super(props);
    this.state = {
      userId: null
    }
  }

  componentDidMount() {
    this.setState({
      userId: localStorage.getItem('userId')
    })
  }


  render() {
    const { user, match } = this.props;
    return (<Query query={GET_CANDIDATE} variables={{ id: user }}>

      {data => {
        console.log(data)
        const name = data && data.data.candidate && data.data.candidate.fullName
        const skills = data && data.data.candidate && data.data.candidate.skill && data.data.candidate.skill.edges
        const expectedSalary = data && data.data.candidate && data.data.candidate.desiredSalary
        const positionsLookingFor = data && data.data.candidate && data.data.candidate.rolesoughtSet
          && data.data.candidate.rolesoughtSet.edges
        const previousClients = data && data.data.candidate && data.data.candidate.jobSet
          && data.data.candidate.jobSet.edges
        return (<div className="ProfilePage">
          <TalentHeader match={match} />
          <div className="Profile">
            <div className="container">
              <div className="UserInfo row">
                <div className="col-sm-6">
                  <div className="ProfileImage">
                    <img src={ProfileImage} alt="profile image" />
                  </div>
                  <h2>{name}<a href="http://www.google.com">Portfolio</a></h2>
                  <h3>User Experience Designer at Google Laboratories</h3>
                  <div className="experience">
                    <span>Experience as</span>
                    {positionsLookingFor && <b>{`${positionsLookingFor[0].node.role.name} (${
                      positionsLookingFor[0].node.experience
                      } years) & ${positionsLookingFor[1].node.role.name} (${
                      positionsLookingFor[1].node.experience
                      } years)`}</b>}
                  </div>
                  <div className="experience">
                    <span>Previous Clients</span>
                    {previousClients && previousClients.map(pr => {
                      return (<b>{pr.node.company.name}</b>)
                    })}
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
      }}
    </Query>
    )
  }
}

export default Profile;