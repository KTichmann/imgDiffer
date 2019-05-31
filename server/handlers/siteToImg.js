const fs = require("fs");
const PImage = require("pureimage");
const PNG = require("pngjs").PNG;
const streamifier = require("streamifier");
const webshot = require("webshot");

function siteToImg(req, res) {
	if (req.body.url) {
		const renderStream = webshot(req.body.url);
		const file = fs.createWriteStream("google.png", { encoding: "binary" });
		renderStream.on("data", data => {
			file.write(data.toString("binary"), "binary");
			res.json({
				success: true,
				data
			});
		});
	}
}

module.exports = siteToImg;
