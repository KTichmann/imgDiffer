import React, { useState } from "react";
import { DropzoneArea } from "material-ui-dropzone";
import Button from "@material-ui/core/Button";
import "./App.css";

function App() {
  const [files, updateFiles] = useState([]);
  const formData = new FormData();
  formData.append("imgOne", files[0]);
  formData.append("imgTwo", files[1]);
  const handleSubmit = e => {
    fetch("http://localhost:5000/compare", {
      method: "POST",
      body: formData
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="App">
      <div className="App-header">
        <DropzoneArea
          onChange={fileArr => updateFiles(fileArr)}
          acceptedFiles={["image/png"]}
          filesLimit={2}
          dropzoneText="Drag and drop two png files here to compare"
          // showPreviewsInDropzone={false}
          showPreviews
          showPreviewsInDropzone={false}
          showAlerts
          dropZoneClass="imgDropZone"
        />
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Compare
        </Button>
      </div>
    </div>
  );
}

export default App;
