import React, { PureComponent } from 'react'
import PropTypes from 'prop-types';

import logo from 'assets/images/logo-white.svg';

import './BottomBox.css'

class BottomBox extends PureComponent {

    render() {
        const { image, text, title, bg, number } = this.props.box;
        return (
            <div className={`bottom-box number-${number}`} style={{ backgroundColor: bg }}>

                <div className="bottom-box-app">
                    <img src={logo} alt="logo-image" className="bottom-box-logo" />
                    <span className="app-text">OneBigApp</span>
                </div>
                <div className="bottom-box-content">
                    <div className="content">
                        <p className="content-small-text">{title}</p>
                        <p className="content-text">{text}</p>
                    </div>
                    <img src={image} className="bottom-box-image" alt="funny-image" />
                    
                </div>
            </div>
                )
            }
        }
        
BottomBox.propTypes = {
                    box: PropTypes.shape({
                    image: PropTypes.string.isRequired,
                title: PropTypes.string.isRequired,
                text: PropTypes.string.isRequired,
                bg: PropTypes.string.isRequired
            })
        }
        
export default BottomBox;