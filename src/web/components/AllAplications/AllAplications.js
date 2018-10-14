import React from 'react'
import gql from 'graphql-tag'
import { Query } from "react-apollo"
import TalentApplication from '../common/TalentApplication'
import userImg from 'assets/images/Company/1-copy.png'
import userImg2 from 'assets/images/Company/1-copy2.png'

const ALL_APLICATIONS = gql`
{
allCompanies {
  edges {
    node {
      id
    }
  }
}

}
`
export const AllAplications = () => (
  <div>
    <Query query={ALL_APLICATIONS}>
      {({ loading, error, data }) => {
        if (loading) return "Loading..."
        if (error) return `Error! ${error.message}`
        console.log(data.allCompanies.edges)
        return (
          <select name="jobs" >
            {data.allCompanies.edges.map(job => (
              <option key={job.node.id} value={job.node.id}>
                {job.node.id}
                {job.node.skill}
              </option>
            ))}
          </select>
        )
      }}
    </Query>
    <TalentApplication
      candidate={{
        name: 'James Peterson',
        position: 'Works at Apple | Available in 3 weeks',
        imgSrc: userImg,
        daysLeft: 12,
        skills: ['Sketch', 'Adobe Photoshop', 'Adobe Illustrator', 'Adobe InDesign', 'User Experience', 'User Interface', 'Managin Team', 'Prototyping', 'iOS App', 'Android App', 'Principle', 'Axure', 'Basic HTML/CSS', 'Wordpress']
      }}
    />
    <TalentApplication
      candidate={{
        name: 'Mike Jackson',
        position: 'UI & UX Designer at Microsoft | Available in 2 weeks',
        imgSrc: userImg2,
        daysLeft: 6,
        skills: ['Sketch', 'Adobe Photoshop', 'Adobe Illustrator', 'Adobe InDesign', 'User Experience', 'User Interface', 'Managin Team', 'Prototyping', 'iOS App', 'Android App', 'Principle', 'Axure', 'Basic HTML/CSS', 'Wordpress']
      }}
    />
    <TalentApplication
      candidate={{
        name: 'Peter Smith',
        position: 'UI & UX Designer at Microsoft | Available in 2 weeks',
        imgSrc: userImg,
        daysLeft: 14,
        skills: ['Sketch', 'Adobe Photoshop', 'Adobe Illustrator', 'Adobe InDesign', 'User Experience', 'User Interface', 'Managin Team', 'Prototyping', 'iOS App', 'Android App', 'Principle', 'Axure', 'Basic HTML/CSS', 'Wordpress']
      }}
    />
  </div>
)

export default AllAplications