/** 
  * This function extracts the pixel data of the image in an array
  * and converts it into a Float32Array by storing the elements
  * representing the R, G, B values and by discarding the A values.
  *
  * @param {CanvasRenderingContext} ctx - 2D canvas context
  * @param {number} width - width of the image
  * @param {number} heigth - height of the image
  * @returns {Float32Array} Array of R, G, B values
 */

const getRgbValues = (ctx, width, height) => {
  const data = ctx.getImageData(0, 0, width, height);

  const alphaArray = data.data;

  const rgbArray = new Float32Array(width * height * 3);

  for (let i = 0; i < width * height; i++) {
    rgbArray[i * 3] = alphaArray[i * 4];
    rgbArray[(i * 3) + 1] = alphaArray[(i * 4) + 1];
    rgbArray[(i * 3) + 2] = alphaArray[(i * 4) + 2];
  }

  return rgbArray;
}

export default getRgbValues
