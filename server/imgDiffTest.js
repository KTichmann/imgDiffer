const fs = require("fs");
const PNG = require("pngjs").PNG;
const util = require("util");
const PImage = require("pureimage");

const detectDiff = require("x-img-diff-js");

async function main() {
	const [img1, img2] = await Promise.all([
		decodePng("demo/actual.png"),
		decodePng("demo/expected.png")
	]);
	const diffResult = await detectDiff(img1, img2);
	drawRectsOnImage("demo/actual.png", cleanArr(diffResult.matches));
}

function drawRectsOnImage(imgPath, rectArr) {
	PImage.decodePNGFromStream(fs.createReadStream(imgPath))
		.then(img => {
			let ctx = img.getContext("2d");
			ctx.fillStyle = "rgba(255,0,0,0.2)";
			rectArr.forEach(obj => {
				let { x, y, width, height } = obj;
				ctx.fillRect(x, y, width, height);
			});

			PImage.encodePNGToStream(img, fs.createWriteStream("out.png"))
				.then(() => {
					console.log("wrote out the png file to out.png");
				})
				.catch(e => {
					console.log("there was an error writing");
				});
		})
		.catch(error => console.log(error));
}

const cleanArr = array => {
	const slightlyCleanedArr = array.map(arr => {
		return arr.map(obj => obj.diffMarkers);
	});

	const ans = [];
	slightlyCleanedArr.forEach(arr => {
		arr.forEach(arr2 => {
			arr2.forEach(val => ans.push(val));
		});
	});

	return ans;
};

main();
