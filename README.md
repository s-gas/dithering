# Dither CLI

A Node.js command-line tool that reads an image, automatically adjusts its
contrast, and applies Bayer 2x2 (ordered) dithering with a fixed palette —
producing a static, pre-processed dithered image. No browser/canvas involved.

## Install

```bash
npm install
```

## Usage

```bash
node cli.js <input> <output> [ditherWidth] [targetStdDev]
```

### Example

```bash
node cli.js photo.jpg photo-dithered.png 300 60
```

Output:
```
Auto-contrast applied: 42.3
Dithered image saved to photo-dithered.png (300x225)
```

## Palette

Defined in `cli.js`:

```javascript
const palette = [
  [48, 0, 255],
  [217, 217, 217],
  [104, 72, 241],
  [160, 145, 228],
];
```

Edit this array to change the output colors. `bayer2x2` supports 2 or more
colors — it sorts the palette by brightness and interpolates between the two
nearest colors for each pixel.
