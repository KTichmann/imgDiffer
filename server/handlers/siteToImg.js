const toArray = require("stream-to-array");
const util = require("util");
const webshot = require("webshot");
const fs = require("fs");
const PImage = require("pureimage");

function siteToImg(req, res) {
	if (req.body.url) {
		const renderStream = webshot(req.body.url, {
			shotSize: {
				width: "window",
				height: "window"
			},
			windowSize: { width: 1024, height: 768 }
		});
		PImage.decodePNGFromStream(renderStream)
			.then(img => {
				return res.json({
					success: true,
					data: img
				});
			})
			.catch(error => {
				console.log("OH LAWD, ISSA ERROR: ", error);
				return res.json({ success: false, error });
			});
	} else {
		return res.json({
			success: false,
			message: "url cannot be empty"
		});
	}
}

module.exports = siteToImg;
