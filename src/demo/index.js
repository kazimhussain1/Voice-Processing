
import React, {Component} from "react";
import "./index.css";
import axios from 'axios';
import AudioAnalyser from "../../src/component"

export default class demo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: "",
            recordedResult : []
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

    changeScheme(e) {
        this.setState({
            audioType: e.target.value
        })
    }

    render() {
        const {status, audioSrc, audioType, audioBlob,recordedResult} = this.state;
        const URL = 'http://localhost:5000/api/upload-audio';
        const audioProps = {
            audioType,
            recordedResult,
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
            stopCallback: (e) =>  {
                this.setState({
                    audioSrc: window.URL.createObjectURL(e),
                    audioBlob: e
                })
                // var myReader = new FileReader();
                //     myReader.onload = function(){
                //         console.log("my audio",JSON.stringify(myReader.result));
                //     };
                //     myReader.readAsText(e);
                var file = new File([e] ,`audio.${audioType.split('/')[1]}`, {type:audioType});
                
                const formData=new FormData();
                formData.append('file',file);
                axios.post(`${URL}`,formData).then(
                    (result)=>{
                        console.log("result",result.data);
                        //result.
                        this.setState({
                            ...this.state,recordedResult:result.data.chunks
                        })
                    }

                );
              //  console.log("response",res.data);
                console.log('myfile',file);
                console.log("succ stop", e)
                

                //console.log("audio blob",this.state.audioBlob);
            },
            onRecordCallback: (e) => {
                console.log("recording", e)
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
              <p>Select audio type</p>
              <select name="" id="" onChange={(e) => this.changeScheme(e)} value={audioType}>
                  <option value="audio/webm">audio/webm（default）</option>
                  <option value="audio/wav">audio/wav</option>
                  <option value="audio/mp3">audio/mp3</option>
              </select>
          </div>
        );
    }
}
