import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DropzoneArea } from "material-ui-dropzone";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import compareImages from "../functions/compareImages";

const useStyles = makeStyles(theme => ({
	progress: {
		width: "15px !important",
		height: "15px !important",
		margin: "8px !important",
		color: "white"
	}
}));

function Home(props) {
	const classes = useStyles();
	const [files, updateFiles] = useState([]);
	const [imgData, updateImgData] = useState({});
	const [loading, updateLoading] = useState(false);

	const formData = new FormData();
	formData.append("imgOne", files[0]);
	formData.append("imgTwo", files[1]);
	function handleSubmit() {
		updateLoading(true);
		compareImages(formData)
			.then(result => {
				updateImgData(result);
				document.getElementById("redirect_to_comparison").click();
			})
			.catch(error => {
				console.log(error);
			});
	}

	return (
		<div style={{ width: "80%" }}>
			<DropzoneArea
				onChange={fileArr => updateFiles(fileArr)}
				acceptedFiles={["image/png"]}
				filesLimit={2}
				dropzoneText='Drag and drop two png files here to compare'
				showPreviews
				showPreviewsInDropzone={false}
				showAlerts
				dropZoneClass='imgDropZone'
			/>
			<Button
				onClick={loading ? false : handleSubmit}
				variant='contained'
				color='primary'
				style={{ marginTop: "4rem", width: "105px", height: "45px" }}
				disabled={files.length === 2 ? false : true}>
				{loading ? (
					<CircularProgress disableShrink className={classes.progress} />
				) : (
					"Compare"
				)}
			</Button>
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
}

export default Home;
