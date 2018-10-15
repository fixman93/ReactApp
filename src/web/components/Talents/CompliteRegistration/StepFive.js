import React, { Component } from "react";
import PropTypes from "prop-types";
import MediaCapturer from 'react-multimedia-capture';

import UIContainer from "common/UIContainer";
import FeaturedTitle from "common/FeaturedTitle";
import Radio from "common/Forms/Radio";
import Checkbox from "common/Forms/Checkbox"
import { Query } from "react-apollo";
import SkillList from "web/components/common/SkillList";
import NewSkill from "web/components/common/NewSkill";
import BlueArrow from '../../../../assets/images/blue-arrow.svg'
import VideoExample from '../../../../assets/images/videoExample.png'
import { GET_SKILLS } from "../../../../services/queries";

class StepFive extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    heading: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      input: {},
      skills: [],
      userId: null,
      newSkillInputActive: true,
      errors: {},
      granted: false,
      rejectedReason: '',
      recording: false,
      paused: false,
      startshow: true
    };
    this.formRef = React.createRef();
    this.handleGranted = this.handleGranted.bind(this);
    this.handleDenied = this.handleDenied.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleResume = this.handleResume.bind(this);
    this.setStreamToVideo = this.setStreamToVideo.bind(this);
    this.releaseStreamFromVideo = this.releaseStreamFromVideo.bind(this);
    this.downloadVideo = this.downloadVideo.bind(this);
  }

  handleGranted() {
    this.setState({ granted: true });
    console.log('Permission Granted!');
  }
  handleDenied(err) {
    this.setState({ rejectedReason: err.name });
    console.log('Permission Denied!', err);
  }
  handleStart(stream) {
    this.setState({
      recording: true,
      startshow: false
    });

    this.setStreamToVideo(stream);
    console.log('Recording Started.');
  }
  handleStop(blob) {
    this.setState({
      recording: false,
      startshow: true
    });

    this.releaseStreamFromVideo();

    console.log('Recording Stopped.');
    this.downloadVideo(blob);
  }
  handlePause() {
    this.releaseStreamFromVideo();

    this.setState({
      paused: true
    });
  }
  handleResume(stream) {
    this.setStreamToVideo(stream);

    this.setState({
      paused: false
    });
  }
  handleError(err) {
    console.log(err);
  }
  setStreamToVideo(stream) {
    let video = this.refs.app.querySelector('video');

    if (window.URL) {
      video.src = window.URL.createObjectURL(stream);
    }
    else {
      video.src = stream;
    }
  }
  releaseStreamFromVideo() {
    this.refs.app.querySelector('video').src = '';
  }
  downloadVideo(blob) {
    let url = URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.target = '_blank';
    document.body.appendChild(a);

    a.click();
  }

  handleAddSkill = name => {
    this.setState(prevState => ({
      skills: [...prevState.skills, name],
      newSkillInputActive: false
    }));
  };

  handleRemoveSkill = name => {
    this.setState(prevState => ({
      skills: prevState.skills.filter(item => item.skill !== name)
    }));
  };

  handleSkillDropdownClick = value => {
    this.setState({
      newSkillInputActive: true
    });
  };

  handleError = (inputName, value, checked) => {
    if (!value) {
      console.log('error', inputName)
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          [inputName]: 'This field is required'
        }
      }))
    }
  }

  render() {
    const { heading, onSubmit, onBack, propsData } = this.props;
    const { newSkillInputActive, skills, errors } = this.state;
    const granted = this.state.granted;
    const rejectedReason = this.state.rejectedReason;
    const recording = this.state.recording;
    const paused = this.state.paused;
    return (
      <div>
        <FeaturedTitle
          title={heading.title}
          desc={heading.desc}
          color={heading.color}
        />
        <UIContainer className="StepFive ">
          <div ref="app">
            <MediaCapturer
              constraints={{ audio: true, video: true }}
              timeSlice={10}
              onGranted={this.handleGranted}
              onDenied={this.handleDenied}
              onStart={this.handleStart}
              onStop={this.handleStop}
              onPause={this.handlePause}
              onResume={this.handleResume}
              onError={this.handleError}
              render={({ start, stop, pause, resume }) =>
                <div className="Video">
                  <video className="videoBox" autoPlay></video>
                  <div className="videoImage">
                    <img src={VideoExample} />
                  </div>
                  <p className="tellUs">In 1 minute tell us…</p>
                  <h2>What’s your name and what do you do?</h2>
                  {/* <p>Granted: {granted.toString()}</p>
                  <p>Rejected Reason: {rejectedReason}</p>
                  <p>Recording: {recording.toString()}</p>
                  <p>Paused: {paused.toString()}</p> */}
                  {this.state.startshow ? (
                    <a className="StartRecording btn" onClick={start}>Start Recording</a>
                  ) : <a className="StopRecording btn" onClick={stop}>Stop Recording</a>}

                  {/* <a onClick={pause}>Pause</a>
                  <a onClick={resume}>Resume</a> */}
                </div>
              } />
          </div>
        </UIContainer>
      </div>
    )
  }
}

export default StepFive;
