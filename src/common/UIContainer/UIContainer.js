import React, {Component} from 'react'

export class UIContainer extends Component {
  render () {
    const { className } = this.props
    return (
      <div className="mainContainer">
        <div className={className ? `panel ${className}` : 'panel'}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default UIContainer