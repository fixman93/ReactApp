import React from 'react';

const YoutubeAccept = ({ show, fromRegister, handleShow }) => {
    if (fromRegister && show) {
        return <div style={{ background: "white", padding: "2em" }}>
            <div style={{ display: "flex" }}>
                <h1>You're done</h1>
                <input
                    type="radio"
                    name="youtubeAccept"
                    checked={this.state.youtubeAccept}
                    onChange={() => { this.setState({ youtubeAccept: !this.state.youtubeAccept }) }} />
                <label>Untick if you don’t want to be featured in our awesome YouTube campaign,
    by ticking this form we take your consent to share your video on our channel.
Have it deleted anytime by sending us an email.</label>
                <button onClick={handleShow}>Save & Close</button></div>
        </div>
    } else {
        return null;
    }
}

export default YoutubeAccept;