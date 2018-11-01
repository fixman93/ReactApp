import React from 'react'
import gql from 'graphql-tag'
import { Query } from "react-apollo"
import ComapnyMatches from './CompanyMatches'
import userImg from 'assets/images/Company/1-copy.png'
import userImg2 from 'assets/images/Company/1-copy2.png'


export const AllAplications = () => (
  <div>
    <ComapnyMatches
      candidate={{
        name: 'James Peterson',
        position: 'Works at Apple | Available in 3 weeks',
        imgSrc: userImg,
        daysLeft: 12,
        skills: ['Sketch', 'Adobe Photoshop', 'Adobe Illustrator', 'Adobe InDesign', 'User Experience', 'User Interface', 'Managin Team', 'Prototyping', 'iOS App', 'Android App', 'Principle', 'Axure', 'Basic HTML/CSS', 'Wordpress']
      }}
    />
    <ComapnyMatches
      candidate={{
        name: 'Mike Jackson',
        position: 'UI & UX Designer at Microsoft | Available in 2 weeks',
        imgSrc: userImg2,
        daysLeft: 6,
        skills: ['Sketch', 'Adobe Photoshop', 'Adobe Illustrator', 'Adobe InDesign', 'User Experience', 'User Interface', 'Managin Team', 'Prototyping', 'iOS App', 'Android App', 'Principle', 'Axure', 'Basic HTML/CSS', 'Wordpress']
      }}
    />
    <ComapnyMatches
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