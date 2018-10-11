import React from 'react'

const PostEmployer = ({ imgSrc, title, postedAt, desc }) => (
  <div className='container employer-container divider'>
    <div className='employer-flex'>
      <img src={imgSrc} alt='' className='avatar-image' />
      <div className='employer-info'>
        <p className='employer-title'>{title} &gt;</p>
        <p className='employer-desc'>{desc}</p>
      </div>
      <small className='employer-date'>{postedAt}</small>
    </div>
  </div>
)

export default PostEmployer