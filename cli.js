#!/usr/bin/env node

const sharp = require('sharp');
const autoDither = require('./dithering');

const palette = [
  [48, 0, 255],
  [217, 217, 217],
  [104, 72, 241],  
  [160, 145, 228], 
];

async function ditherImage(inputPath, outputPath) {
  const ditherWidth = 400;
  const targetStdDev = 60;

  const { data, info } = await sharp(inputPath)
    .resize(ditherWidth)
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;

  const rgbArray = new Float32Array(data.length);
  for (let i = 0; i < data.length; i++) {
    rgbArray[i] = data[i];
  }

  const appliedContrast = autoDither(rgbArray, palette, width, height, targetStdDev);
  console.log(`Auto-contrast applied: ${appliedContrast.toFixed(1)}`);

  const outputBuffer = Buffer.from(
    rgbArray.map((v) => Math.max(0, Math.min(255, Math.round(v))))
  );

  await sharp(outputBuffer, { raw: { width, height, channels } })
    .png()
    .toFile(outputPath);

  console.log(`Dithered image saved to ${outputPath} (${width}x${height})`);
}

const [, , inputPath, outputPath] = process.argv;

if (!inputPath || !outputPath) {
  console.error('Usage: node cli.js <input> <output>');
  process.exit(1);
}

ditherImage(inputPath, outputPath).catch((err) => {
  console.error('Error dithering image:', err);
  process.exit(1);
});
