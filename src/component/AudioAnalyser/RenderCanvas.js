
import React from "react";

const RenderCanvas = Target => {
    return class RenderCanvasClass extends Target {

        constructor(props) {
            super(props)
            this.canvasRef = React.createRef() 
            this.canvasCtx = null; 
            this.animationId = null;
        }

        componentDidMount() {
            this.initCanvas();
        }

        componentWillUnmount() {
            window.cancelAnimationFrame(this.animationId);
        }

        configCanvas() {
            const {height, width, backgroundColor, strokeColor} = this.props;
            const canvas = this.canvasRef.current;
            this.canvasCtx = canvas.getContext("2d");
            this.canvasCtx.clearRect(0, 0, width, height);
            this.canvasCtx.fillStyle = backgroundColor;
            this.canvasCtx.fillRect(0, 0, width, height);
            this.canvasCtx.lineWidth = 2;
            this.canvasCtx.strokeStyle = strokeColor;
            this.canvasCtx.beginPath();
        }

    
        initCanvas() {
            window.cancelAnimationFrame(this.animationId);
            const {height, width} = this.props;
            this.configCanvas();
            this.canvasCtx.moveTo(0, height / 2);
            this.canvasCtx.lineTo(width, height / 2);
            this.canvasCtx.stroke();
        }

       
        renderCurve = () => {
            const {height, width} = this.props;
            this.animationId = window.requestAnimationFrame(this.renderCurve); 
            const bufferLength = this.analyser.fftSize; 
            const dataArray = new Uint8Array(bufferLength);
            // console.log("data",dataArray)
            this.analyser.getByteTimeDomainData(dataArray);
            this.configCanvas();
            const sliceWidth = Number(width) / bufferLength;
            let x = 0;
            this.canvasCtx.moveTo(x, height / 2);
            for (let i = 0; i < bufferLength; i++) {
                const v = dataArray[i] / 128.0;
                const y = v * height / 2;
                this.canvasCtx["lineTo"](x, y);
                x += sliceWidth;
            }
            this.canvasCtx.lineTo(width, height / 2);
            this.canvasCtx.stroke();
        }

    
        renderCanvas() {
            const {height, width} = this.props;
            return <canvas ref={this.canvasRef} height={height} width={width}
                           style={{width: width, height: height}}/>
        }
    }
}
export default RenderCanvas;
