import React, { Component, Fragment } from 'react'
import StepButton from './StepButton'
import PropTypes from 'prop-types'
import './Steps.css'

class Steps extends Component {
  static propTypes = {
    activeId: PropTypes.number.isRequired,
  }

  render() {
    const { activeId } = this.props
    return (
      <Fragment>
        <StepButton
          activeId={activeId}
          id={1}
          text='Preferences'
        />
        <StepButton
          activeId={activeId}
          id={2}
          text='Current'
        />
        <StepButton
          activeId={activeId}
          id={3}
          text='Skills'
        />
        <StepButton
          activeId={activeId}
          id={4}
          text='Links'
        />
        <StepButton
          activeId={activeId}
          id={5}
          text='Video'
        />
      </Fragment>
    )
  }
}

export default Steps