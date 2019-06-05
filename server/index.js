const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const multer = require("multer");
const compareImages = require("./handlers/compareImages");
const siteToImg = require("./handlers/siteToImg");
const PORT = process.env.PORT || 5000;
const storage = multer.memoryStorage();
const upload = multer({
	storage
});
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
	bodyParser.urlencoded({
		// to support URL-encoded bodies
		extended: true
	})
);

app.post(
	"/compare",
	upload.fields([{ name: "imgOne" }, { name: "imgTwo" }]),
	compareImages
);

app.post("/siteToImg", siteToImg);

//Spin up the server
app.listen(PORT, () => {
	console.log(`running at port: ${PORT}`);
});
