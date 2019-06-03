const toArray = require("stream-to-array");
const util = require("util");
const webshot = require("webshot");
const fs = require("fs");

function siteToImg(req, res) {
  if (req.body.url) {
    const renderStream = webshot(req.body.url, {
      shotSize: {
        width: "window",
        height: "window"
      },
      windowSize: { width: 1024, height: 768 }
    });
    toArray(renderStream, (err, arr) => {
      if (!err) {
        const buffers = arr.map(part =>
          util.isBuffer(part) ? part : Buffer.from(part)
        );
        return res.json({
          data: Buffer.concat(buffers).toString("base64")
        });
        // return res.json({
        //   success: true,
        //   data: { buffer: Buffer.concat(buffers), width: 1024, height: 768 }
        // });
      } else {
        return res.json({
          success: false,
          data: {
            message: "error converting stream to buffer"
          }
        });
      }
    });
  } else {
    return res.json({
      success: false,
      message: "url cannot be empty"
    });
  }
}

module.exports = siteToImg;
