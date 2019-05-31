import React from "react";
import Modal from "@material-ui/core/Modal";

class Comparison extends React.Component {
	componentDidMount() {
		const imgData = this.props.location.state.imgData;
		console.log(imgData);
		const canvasOne = this.makeCanvasFromBuffer(
			imgData.imgOneHeight,
			imgData.imgOneWidth,
			imgData.imgOneBuffer
		);
		// document.getElementById(
		// 	"imgComparisonOne"
		// ).innerHTML += `<h1>Image One:</h1>`;
		document.getElementById("imgComparisonOne").append(canvasOne);

		const canvasTwo = this.makeCanvasFromBuffer(
			imgData.imgTwoHeight,
			imgData.imgTwoWidth,
			imgData.imgTwoBuffer
		);
		document.getElementById("imgComparisonTwo").append(canvasTwo);
		document.getElementById("imgComparisonOne").scrollIntoView();
	}

	makeCanvasFromBuffer(height, width, buffer) {
		let canvas = document.createElement("canvas"),
			ctx = canvas.getContext("2d");

		canvas.height = height;
		canvas.width = width;
		let imgData = ctx.createImageData(width, height);
		imgData.data.set(buffer);
		ctx.putImageData(imgData, 0, 0);
		return canvas;
	}

	render() {
		return (
			<div>
				<h1 style={{ fontWeight: "300" }}>Image Comparison</h1>
				<div id='imgComparisonTwo' />
				<div id='imgComparisonOne' />
			</div>
		);
	}
}

export default Comparison;
