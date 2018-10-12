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
          text='Role'
        />
        <StepButton
          activeId={activeId}
          id={2}
          text='Details'
        />
      </Fragment>
    )
  }
}

export default Steps