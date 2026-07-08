# dithering

A Node.js command-line tool that reads an image, adjusts its
contrast, and applies Bayer 2x2 (ordered) dithering with a fixed palette.

## Install

```bash
npm install
```

## Usage

```bash
node cli.js <input> <output>
```

### Example

```bash
node cli.js photo.jpg photo-dithered.png
```

Output:
```
Auto-contrast applied: 42.3
Dithered image saved to photo-dithered.png (300x266)
```

## Output image

The image is saved as PNG and has a width of 300px.

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
