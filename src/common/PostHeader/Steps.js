import React, { Component, Fragment } from 'react'
import StepButton from './StepButton'
import PropTypes from 'prop-types'

class Steps extends Component {
  static propTypes = {
    activeId: PropTypes.number.isRequired,
  }

  render () {
    const { activeId } = this.props
    return (
      <Fragment>
        <StepButton
          activeId={activeId}
          id={1}
          text='About Job'
        />
        <StepButton
          activeId={activeId}
          id={2}
          text='Required Skills'
        />
        <StepButton
          activeId={activeId}
          id={3}
          text='Preferences'
        />
        <StepButton
          activeId={activeId}
          id={4}
          text='Preview'
        />
      </Fragment>
    )
  }
}

export default Steps