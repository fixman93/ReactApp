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
      userId: null,
      errors: {},
      videoSrc: null,
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
  handleStop() {
    this.setState({
      recording: false,
      startshow: true
    });

    this.releaseStreamFromVideo();

    console.log('Recording Stopped.');

    var URL = window.URL || window.webkitURL;
    var file = new Blob(
      [this.state.videoSrc],
      { "type": "video/mp4" });
    var value = URL.createObjectURL(file);

    this.downloadVideo(value);
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

    if (window.URL) {
      this.setState({
        videoSrc: window.URL.createObjectURL(stream)
      })
    }
    else {
      this.setState({
        videoSrc: stream
      })
    }
  }
  releaseStreamFromVideo() {
    this.setState({
      videoSrc: {}
    })
  }
  downloadVideo(val) {

    const url = val;
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'mov.mp4');
    document.body.appendChild(link);
    link.click();



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
              render={({ start, stop, pause, resume, request, granted }) =>
                <div className="Video">
                  {this.state.videoSrc && <video className="videoBox" src={this.state.videoSrc} autoPlay></video>}
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
                    <a className="StartRecording btn" onClick={
                      async () => {
                        navigator.getUserMedia({ video: true }, this.handleStart, this.handleStop)

                      }}
                    >Start Recording</a>
                  ) : <a className="StopRecording btn" onClick={this.handleStop}>Stop Recording</a>}

                  {/* <a onClick={pause}>Pause</a>
                  <a onClick={resume}>Resume</a> */}
                </div>
              } />
          </div>
        </UIContainer>
      </div >
    )
  }
}

export default StepFive;
