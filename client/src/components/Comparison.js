import React from "react";
import makeCanvasFromBuffer from "../functions/makeCanvasFromBuffer";

class Comparison extends React.Component {
  constructor(props) {
    super(props);
    this.makeCanvasFromBuffer = makeCanvasFromBuffer;
  }
  componentDidMount() {
    const imgData = this.props.location.state.imgData;
    console.log(imgData);
    const canvasOne = this.makeCanvasFromBuffer(
      imgData.imgOneHeight,
      imgData.imgOneWidth,
      imgData.imgOneBuffer
    );
    document.getElementById("imgComparisonOne").append(canvasOne);

    const canvasTwo = this.makeCanvasFromBuffer(
      imgData.imgTwoHeight,
      imgData.imgTwoWidth,
      imgData.imgTwoBuffer
    );
    document.getElementById("imgComparisonTwo").append(canvasTwo);
    document.getElementById("imgComparisonOne").scrollIntoView();
  }

  render() {
    return (
      <div>
        <h1 style={{ fontWeight: "300" }}>Image Comparison</h1>
        <div id="imgComparisonTwo" />
        <div id="imgComparisonOne" />
      </div>
    );
  }
}

export default Comparison;
