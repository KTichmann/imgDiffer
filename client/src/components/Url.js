import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import makeCanvasFromBuffer from "../functions/makeCanvasFromBuffer";

const Url = () => {
	const [urlOne, updateUrlOne] = useState("");
	const [urlTwo, updateUrlTwo] = useState("");
	const [imgBufferOne, updateImgBufferOne] = useState(false);
	const [imgBufferTwo, updateImgBufferTwo] = useState(false);

	const handleUrlSubmit = num => {
		const url = num === 1 ? urlOne : urlTwo;
		fetch("http://localhost:5000/siteToImg", {
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
				} else {
					document.getElementById("screenshotTwo").innerHTML = "";
					document.getElementById("screenshotTwo").append(canvas);
				}
			})
			.catch(error => console.log(error));
	};
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
						onClick={() => handleUrlSubmit(1)}>
						Get Img One
					</Button>
					<Button
						variant='contained'
						color='primary'
						onClick={() => handleUrlSubmit(2)}>
						Get Img Two
					</Button>
				</div>
			</form>
			<div>
				{imgBufferOne && imgBufferTwo ? (
					<Button
						variant='contained'
						color='primary'
						onClick={() => console.log("clickkkety!")}>
						Compare
					</Button>
				) : (
					false
				)}
			</div>
			<div style={{ display: "flex", marginTop: "3rem" }}>
				<div id='screenshotOne' />
				<div id='screenshotTwo' />
			</div>
		</div>
	);
};

export default Url;
