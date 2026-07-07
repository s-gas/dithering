function measureContrast(rgbArray) {
  const pixelCount = rgbArray.length / 3;
  let sum = 0;

  for (let i = 0; i < rgbArray.length; i += 3) {
    const brightness = (rgbArray[i] + rgbArray[i + 1] + rgbArray[i + 2]) / 3;
    sum += brightness;
  }
  const mean = sum / pixelCount;

  let variance = 0;
  for (let i = 0; i < rgbArray.length; i += 3) {
    const brightness = (rgbArray[i] + rgbArray[i + 1] + rgbArray[i + 2]) / 3;
    variance += (brightness - mean) ** 2;
  }
  variance /= pixelCount;

  return Math.sqrt(variance);
}

function computeAutoContrast(rgbArray, targetStdDev = 60) {
  const currentStdDev = measureContrast(rgbArray);

  if (currentStdDev === 0) return 0;

  const factor = targetStdDev / currentStdDev;

  const contrast = (255 * (factor * 259 - 259)) / (factor * 255 + 259);

  return Math.max(-100, Math.min(100, contrast));
}

function applyContrast(rgbArray, contrast) {
  const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));

  for (let i = 0; i < rgbArray.length; i++) {
    const adjusted = factor * (rgbArray[i] - 128) + 128;
    rgbArray[i] = Math.max(0, Math.min(255, adjusted));
  }
}

function bayer2x2(rgbArray, palette, width, height) {
  const bayerMatrix = [
    [0, 2],
    [3, 1],
  ];
  const matrixSize = bayerMatrix.length;
  const maxMatrixValue = matrixSize * matrixSize;

  const sortedPalette = [...palette].sort((a, b) => {
    const brightnessA = (a[0] + a[1] + a[2]) / 3;
    const brightnessB = (b[0] + b[1] + b[2]) / 3;
    return brightnessA - brightnessB;
  });

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 3;
      const r = rgbArray[i], g = rgbArray[i + 1], b = rgbArray[i + 2];
      const brightness = (r + g + b) / 3;

      const levels = sortedPalette.length;
      const scaledPos = (brightness / 255) * (levels - 1);
      const lowerIndex = Math.floor(scaledPos);
      const upperIndex = Math.min(lowerIndex + 1, levels - 1);
      const fraction = scaledPos - lowerIndex;

      const matrixValue = bayerMatrix[y % matrixSize][x % matrixSize];
      const threshold = (matrixValue + 0.5) / maxMatrixValue;

      const chosen = fraction > threshold
        ? sortedPalette[upperIndex]
        : sortedPalette[lowerIndex];

      rgbArray[i] = chosen[0];
      rgbArray[i + 1] = chosen[1];
      rgbArray[i + 2] = chosen[2];
    }
  }
}

function autoDither(rgbArray, palette, width, height, targetStdDev = 60) {
  const contrast = computeAutoContrast(rgbArray, targetStdDev);
  applyContrast(rgbArray, contrast);
  bayer2x2(rgbArray, palette, width, height);
  return contrast;
}

module.exports = {
  measureContrast,
  computeAutoContrast,
  applyContrast,
  bayer2x2,
  autoDither,
};
