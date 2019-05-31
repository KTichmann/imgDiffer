import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const Url = () => {
	const [urlOne, updateUrlOne] = useState("");
	const [urlTwo, updateUrlTwo] = useState("");

	const handleUrlSubmit = num => {
		const url = num === 1 ? urlOne : urlTwo;
	};
	return (
		<div>
			<form
				style={{
					padding: "2rem",
					backgroundColor: "rgba(255,255,255, .8)",
					borderRadius: 5
				}}
				noValidate
				autoComplete='off'>
				<div style={{ display: "flex" }}>
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
						onClick={handleUrlSubmit(1)}>
						Get Img One
					</Button>
					<Button
						variant='contained'
						color='primary'
						onClick={handleUrlSubmit(2)}>
						Get Img Two
					</Button>
				</div>
			</form>
		</div>
	);
};

export default Url;
