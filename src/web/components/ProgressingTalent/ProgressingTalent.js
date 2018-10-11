import React from 'react'
import TalentInfo from '../common/TalentInfo'

import userImg from 'assets/images/Company/1-copy.png'
import userImg2 from 'assets/images/Company/1-copy2.png'

export const ProgressingTalent = () => (
  <div className="ProgressingTalent">
    <TalentInfo 
      imgSrc={userImg}
      title='Jane Smith'
      position='UX & UI Designer at Apple | Available in 3 weeks'
    />
    <TalentInfo 
      imgSrc={userImg2}
      title='Mike Jackson'
      position='UI & UX Designer at Microsoft | Available in 2 weeks'
    />
    <TalentInfo 
      imgSrc={userImg}
      title='Peter Smith'
      position='UI & UX Designer at Microsoft | Available in 2 weeks'
    />
  </div>
)

export default ProgressingTalent