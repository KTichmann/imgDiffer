import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DropzoneArea } from "material-ui-dropzone";
import Button from "@material-ui/core/Button";

function Home(props) {
	const [files, updateFiles] = useState([]);
	const [imgData, updateImgData] = useState({});

	const formData = new FormData();
	formData.append("imgOne", files[0]);
	formData.append("imgTwo", files[1]);

	function handleSubmit(e) {
		fetch("http://localhost:5000/compare", {
			method: "POST",
			body: formData
		})
			.then(response => response.json())
			.then(response => {
				let imgOneHeight = response.data.comparisonOne.height;
				let imgOneWidth = response.data.comparisonOne.width;
				let imgOneBuffer = response.data.comparisonOne.data.data;

				let imgTwoHeight = response.data.comparisonTwo.height;
				let imgTwoWidth = response.data.comparisonTwo.width;
				let imgTwoBuffer = response.data.comparisonTwo.data.data;

				updateImgData({
					imgOneHeight,
					imgOneWidth,
					imgOneBuffer,
					imgTwoHeight,
					imgTwoBuffer,
					imgTwoWidth
				});

				document.getElementById("redirect_to_comparison").click();
			})
			.catch(error => console.log(error));
	}

	return (
		<div style={{ width: "80%" }}>
			<DropzoneArea
				onChange={fileArr => updateFiles(fileArr)}
				acceptedFiles={["image/png"]}
				filesLimit={2}
				dropzoneText='Drag and drop two png files here to compare'
				// showPreviewsInDropzone={false}
				showPreviews
				showPreviewsInDropzone={false}
				showAlerts
				dropZoneClass='imgDropZone'
			/>
			<Button
				onClick={handleSubmit}
				variant='contained'
				color='primary'
				style={{ marginTop: "4rem" }}>
				Compare
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
