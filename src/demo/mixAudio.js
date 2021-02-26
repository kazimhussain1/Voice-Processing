
import React, {Component} from "react";
import "./index.css";
import AudioAnalyser from "../../src/component"

export default class demo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: ""
        }
    }

    componentDidMount() {
    }

    controlAudio(status) {
        this.setState({
            status
        }, () => {
            console.log("status", this.state)
        })
    }

    controlAudio2(status2) {
        this.setState({
            status2
        }, () => {
            console.log("status2", this.state)
        })
    }

    changeScheme(e) {
        this.setState({
            audioType: e.target.value
        })
    }

    render() {
        const {status, status2, audioSrc, audioSrc2, audioType, audioBlob} = this.state;
        const audioProps = {
            audioType,
            // audioOptions: {sampleRate: 30000}, 
            status,
            audioSrc,
            audioBlob,
            timeslice: 1000, 
            startCallback: (e) => {
                console.log("succ start", e)
            },
            pauseCallback: (e) => {
                console.log("succ pause", e)
            },
            stopCallback: (e) => {
                console.log("e1", e)

                this.setState({
                    audioSrc: window.URL.createObjectURL(e),
                    audioBlob: e
                })
                console.log("succ stop", e)
            },
            onRecordCallback: (e) => {
                console.log("recording", e)
            },
            errorCallback: (err) => {
                console.log("error", err)
            }
        }
        const audioProps2 = {
            audioType,
            // audioOptions: {sampleRate: 30000}, // 设置输出音频采样率
            status: status2,
            audioSrc: audioSrc2,
            timeslice: 1200, // 时间切片（https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/start#Parameters）
            startCallback: (e) => {
                console.log("succ start2", e)
            },
            pauseCallback: (e) => {
                console.log("succ pause2", e)
            },
            stopCallback: (e) => {
                this.setState({
                    audioSrc2: window.URL.createObjectURL(e)
                })
                console.log("succ stop2", e)
            },
            onRecordCallback: (e) => {
                console.log("recording2", e)
            },
            errorCallback: (err) => {
                console.log("error", err)
            }
        }
        return (
          <div>
              <AudioAnalyser {...audioProps} >
                  <div className="btn-box">
                      {status !== "recording" &&
                      <i className="iconfont icon-start" title="Start"
                         onClick={() => this.controlAudio("recording")}></i>}
                      {status === "recording" &&
                      <i className="iconfont icon-pause" title="Pause"
                         onClick={() => this.controlAudio("paused")}></i>}
                      <i className="iconfont icon-stop" title="Stop"
                         onClick={() => this.controlAudio("inactive")}></i>
                  </div>
              </AudioAnalyser>
              <AudioAnalyser {...audioProps2}>
                  <div className="btn-box">
                      {status2 !== "recording" &&
                      <i className="iconfont icon-start" title="Start"
                         onClick={() => this.controlAudio2("recording")}></i>}
                      {status2 === "recording" &&
                      <i className="iconfont icon-pause" title="Pause"
                         onClick={() => this.controlAudio2("paused")}></i>}
                      <i className="iconfont icon-stop" title="Stop"
                         onClick={() => this.controlAudio2("inactive")}></i>
                  </div>
              </AudioAnalyser>
              <p>选择输出格式</p>
              <select name="" id="" onChange={(e) => this.changeScheme(e)} value={audioType}>
                  <option value="audio/webm">audio/webm（default）</option>
                  <option value="audio/wav">audio/wav</option>
                  <option value="audio/mp3">audio/mp3</option>
              </select>
          </div>
        );
    }
}
