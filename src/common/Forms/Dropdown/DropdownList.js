import React from 'react'

const DropdownList = ({ children }) => (
  <dl style={{
    overflow: 'auto',
    height: 320,
    maxWidth: 312
  }}>
    {children}
  </dl>
)

export default DropdownList