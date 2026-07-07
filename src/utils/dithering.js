/** 
  * This function takes an array containing R, G, B, A values
  * and creates a Float32Array that stores only the R, G, B values
  * of the original array by discarding the A values.
  *
  * @param {Uint8ClampedArray} alphaArray - Array of R, G, B, A
  * @param {number} width - width of the image
  * @param {number} heigth - height of the image
  * @returns {Float32Array} Array of R, G, B values
 */

const getRgbValues = (alphaArray, width, height) => {
  const rgbArray = new Float32Array(width * height * 3);

  for (let i = 0; i < width * height; i++) {
    rgbArray[i * 3] = alphaArray[i * 4];
    rgbArray[(i * 3) + 1] = alphaArray[(i * 4) + 1];
    rgbArray[(i * 3) + 2] = alphaArray[(i * 4) + 2];
  }

  return rgbArray;
}

/**
  * This function takes the R, G, B values of the pixel and a palette
  * and determines what's the closest color in the palette to the given
  * RGB values by calculating the Euclidean distance.
  *
  * @param {number} r - R value
  * @param {number} g - G value
  * @param {number} b - B value
  * @param {Array[][]} palette - Array of [R, G, B] arrays
  * @returns {Array} Array of R, G, B values
 */

const findClosestColor = (r, g, b, palette) => {
  let closestColor = palette[0];
  let diff = Infinity;

  for (const color of palette) {
    const deltaR = r - color[0];
    const deltaG = g - color[1];
    const deltaB = b - color[2];

    const currDiff = (deltaR * deltaR) + (deltaG * deltaG) + (deltaB * deltaB); // Euclidean distance

    if (currDiff < diff) {
      closestColor = color;
      diff = currDiff;
    }
  }

  return closestColor;
}

/**
  * This function takes the RGBA and the RGB array
  * and copies the R,G,B values of the latter to the former.
  *
  * @param {Uint8ClampedArray} alphaArray - RGBA array
  * @param {Float32Array} rgbArray - RGB array
  * @param {number} width - width of the image
  * @param {number} heigth - height of the image
 */

const copyBack = (alphaArray, rgbArray, width, height) => {
  for (let i = 0; i < width * height; i++) {
    alphaArray[i * 4] = rgbArray[i * 3];
    alphaArray[(i * 4) + 1] = rgbArray[(i * 3) + 1];
    alphaArray[(i * 4) + 2] = rgbArray[(i * 3) + 2];
  }
}

const dither = (ctx, width, height) => {
  const data = ctx.getImageData(0, 0, width, height);

  const rgbArray = getRgbValues(data.data, data.width, data.height);

  const palette = [[48, 0, 255],[217, 217, 217], [104, 72, 241], [160, 145, 228]];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = ((y * width) + x) * 3;
      
      const oldR = rgbArray[i];
      const oldG = rgbArray[i + 1];
      const oldB = rgbArray[i + 2];

      const closest = findClosestColor(oldR, oldG, oldB, palette);

      rgbArray[i] = closest[0];
      rgbArray[i + 1] = closest[1];
      rgbArray[i + 2] = closest[2];

      const errR = oldR - closest[0];
      const errG = oldG - closest[1];
      const errB = oldB - closest[2];

      const diffuse = (dx, dy, factor) => {
        const nx = x + dx;
        const ny = y + dy;
        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
          const ni = (ny * width + nx) * 3;
          rgbArray[ni] += errR * factor;
          rgbArray[ni + 1] += errG * factor;
          rgbArray[ni + 2] += errB * factor;
        }
      };

      diffuse(1, 0, 7 / 16);
      diffuse(-1, 1, 3 / 16);
      diffuse(0, 1, 5 / 16);
      diffuse(1, 1, 1 / 16);
    }
  }

  copyBack(data.data, rgbArray, width, height);
  ctx.putImageData(data, 0, 0);
}

export default dither
