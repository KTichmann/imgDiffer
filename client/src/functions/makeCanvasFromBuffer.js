function makeCanvasFromBuffer(height, width, buffer) {
  let canvas = document.createElement("canvas"),
    ctx = canvas.getContext("2d");

  canvas.height = height;
  canvas.width = width;
  let imgData = ctx.createImageData(width, height);
  imgData.data.set(buffer);
  ctx.putImageData(imgData, 0, 0);
  return canvas;
}

export default makeCanvasFromBuffer;
