import React, { useState } from "react";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import compareImages from "../functions/compareImages";
import makeCanvasFromBuffer from "../functions/makeCanvasFromBuffer";

const useStyles = makeStyles(theme => ({
	progress: {
		width: "15px !important",
		height: "15px !important",
		margin: "8px !important",
		color: "white"
	}
}));

const Url = () => {
	const classes = useStyles();
	const [urlOne, updateUrlOne] = useState("");
	const [urlTwo, updateUrlTwo] = useState("");
	const [imgBufferOne, updateImgBufferOne] = useState(false);
	const [imgBufferTwo, updateImgBufferTwo] = useState(false);
	const [imgData, updateImgData] = useState(false);
	const [loading, updateLoading] = useState(false);
	const [imgOneLoading, updateImgOneLoading] = useState(false);
	const [imgTwoLoading, updateImgTwoLoading] = useState(false);

	const handleUrlSubmit = num => {
		num === 1 ? updateImgOneLoading(true) : updateImgTwoLoading(true);

		console.log("request sent: ", num);
		const url = num === 1 ? urlOne : urlTwo;
		fetch("https://ktich-imgdiff.herokuapp.com/siteToImg", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: `url=${url}`
		})
			.then(result => result.json())
			.then(result => {
				num === 1
					? updateImgBufferOne(result.data)
					: updateImgBufferTwo(result.data);
				const canvas = makeCanvasFromBuffer(
					result.data.height,
					result.data.width,
					result.data.data.data
				);
				if (num === 1) {
					document.getElementById("screenshotOne").innerHTML = "";
					document.getElementById("screenshotOne").append(canvas);
					updateImgOneLoading(false);
				} else {
					document.getElementById("screenshotTwo").innerHTML = "";
					document.getElementById("screenshotTwo").append(canvas);
					updateImgTwoLoading(false);
				}
			})
			.catch(error => console.log(error));
	};

	async function handleCompare() {
		updateLoading(true);
		const formData = new FormData();
		const imgOne = await getImg("#screenshotOne > canvas");
		const imgTwo = await getImg("#screenshotTwo > canvas");
		formData.append("imgOne", imgOne);
		formData.append("imgTwo", imgTwo);
		compareImages(formData)
			.then(result => {
				updateImgData(result);
				document.getElementById("redirect_to_comparison").click();
			})
			.catch(error => console.log(error));
	}

	function getBlobFromCanvas(canvas) {
		return new Promise(function(resolve, reject) {
			canvas.toBlob(function(blob) {
				resolve(blob);
			});
		});
	}

	async function getImg(selector) {
		const blob = await getBlobFromCanvas(document.querySelector(selector));
		const file = new File([blob], `${selector}`, blob);
		return file;
	}

	return (
		<div>
			<form
				style={{
					padding: "2rem",
					backgroundColor: "rgba(255,255,255, .8)",
					borderRadius: 5,
					display: "flex",
					flexDirection: "column"
				}}
				noValidate
				autoComplete='off'>
				<div style={{ display: "flex", justifyContent: "space-around" }}>
					<TextField
						id='urlOne'
						label='Url One'
						style={{ marginRight: "3rem" }}
						value={urlOne}
						onChange={e => updateUrlOne(e.target.value)}
						margin='normal'
						variant='outlined'
					/>
					<TextField
						id='urlOne'
						label='Url Two'
						value={urlTwo}
						onChange={e => updateUrlTwo(e.target.value)}
						margin='normal'
						variant='outlined'
					/>
				</div>
				<div
					style={{
						display: "flex",
						justifyContent: "space-around",
						marginTop: "1rem"
					}}>
					<Button
						variant='contained'
						color='primary'
						onClick={() => handleUrlSubmit(1)}
						style={{ width: "150px", height: "45px" }}>
						{imgOneLoading ? (
							<CircularProgress disableShrink className={classes.progress} />
						) : (
							"Get Img One"
						)}
					</Button>
					<Button
						variant='contained'
						color='primary'
						onClick={() => handleUrlSubmit(2)}
						style={{ width: "150px", height: "45px" }}>
						{imgTwoLoading ? (
							<CircularProgress disableShrink className={classes.progress} />
						) : (
							"Get Img Two"
						)}
					</Button>
				</div>
			</form>
			<div>
				{imgBufferOne && imgBufferTwo ? (
					<Button
						onClick={loading ? false : handleCompare}
						variant='contained'
						color='primary'
						style={{ marginTop: "4rem", width: "105px", height: "45px" }}>
						{loading ? (
							<CircularProgress disableShrink className={classes.progress} />
						) : (
							"Compare"
						)}
					</Button>
				) : (
					false
				)}
			</div>
			<div style={{ display: "flex", marginTop: "3rem" }}>
				<div id='screenshotOne' />
				<div id='screenshotTwo' />
			</div>
			<Link
				id='redirect_to_comparison'
				to={{
					pathname: "/comparison",
					state: {
						imgData
					}
				}}
			/>
		</div>
	);
};

export default Url;
