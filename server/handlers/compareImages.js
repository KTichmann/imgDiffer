const fs = require("fs");
const PImage = require("pureimage");
const PNG = require("pngjs").PNG;
const detectDiff = require("x-img-diff-js");
const streamifier = require("streamifier");
//TODO: Handle responses
//TODO: Handle errors
//TODO: Respond with a file...
async function compareImages(req, res) {
  const img1Path = req.files.imgOne[0].buffer;
  const img2Path = req.files.imgTwo[0].buffer;
  const diffResult = await detectDiff(
    PNG.sync.read(img1Path),
    PNG.sync.read(img2Path)
  );

  let img1 = await decodePNGfromPath(img1Path);
  drawRectsOnImage(img1, cleanArr(diffResult.matches), "rgba(0, 0, 255, .3)");
  drawRectsOnImage(img1, diffResult.strayingRects[0], "rgba(255,0,0,.3)");
  //   writeOutImg(img1, "out.png");

  let img2 = await decodePNGfromPath(img2Path);
  drawRectsOnImage(img2, cleanArr(diffResult.matches), "rgba(0, 0, 255, .3)");
  drawRectsOnImage(img2, diffResult.strayingRects[1], "rgba(255,0,0,.3)");
  //   writeOutImg(img2, testing);
  const body = {
    img: img2
  };

  if (!img1 || !img2) {
    return res.json({
      success: false,
      message: "there was an error writing"
    });
  } else if (img1 && img2) {
    return res.json({
      success: true,
      message: "successfully written to file",
      data: {
        comparisonOne: img1.data.toString("base64"),
        comparisonTwo: img2.data.toString("base64")
      }
    });
  }
}

// function writeOutImg(img, path) {
//   PImage.encodePNGToStream(img, fs.createWriteStream(path))
//     .then(() => {
//       return true;
//     })
//     .catch(e => {
//       console.log(e);
//       return false;
//     });
// }

function drawRectsOnImage(img, rectArr, color = "rgba(0,0,0,.3)") {
  let ctx = img.getContext("2d");
  ctx.fillStyle = color;
  rectArr.forEach(obj => {
    let { x, y, width, height } = obj;
    ctx.fillRect(x, y, width, height);
  });
  return img;
}

function decodePNGfromPath(pngPath) {
  const stream = streamifier.createReadStream(pngPath);
  return PImage.decodePNGFromStream(stream)
    .then(img => {
      return img;
    })
    .catch(error => {
      console.log("OH LAWD, ISSA ERROR: ", error);
      return error;
    });
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
// function to encode file data to base64 encoded string
function base64_encode(file) {
  // read binary data
  var bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return new Buffer(bitmap).toString("base64");
}

module.exports = compareImages;
