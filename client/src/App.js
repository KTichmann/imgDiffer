import React, { useState } from "react";
import { DropzoneArea } from "material-ui-dropzone";
import "./App.css";

function App() {
	const [files, updateFiles] = useState([]);

	const handleSubmit = e => {
		e.preventDefault();
	};

	return (
		<div className='App'>
			<div className='App-header'>
				<DropzoneArea
					onChange={() => updateFiles(files)}
					acceptedFiles={["image/png"]}
					filesLimit={2}
					dropzoneText='Drag and drop your two png files here.'
					// showPreviewsInDropzone={false}
					showPreviews
					showPreviewsInDropzone={false}
					showAlerts
					dropZoneClass='imgDropZone'
				/>
			</div>
		</div>
	);
}

export default App;
