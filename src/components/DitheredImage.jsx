import { useRef, useEffect } from 'react'
import dither from '../utils/dithering'

const DitheredImage = ({src, ditherWidth, imageWidth}) => {
  if (src === null) return null;

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      canvas.width = ditherWidth;
      canvas.height = img.height * canvas.width / img.width;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      dither(ctx, canvas.width, canvas.height);
    }
    img.src = src;
  }, [src, ditherWidth, imageWidth])

  return (
    <canvas
      ref={canvasRef}
      style={{width: `${imageWidth}px`, height: 'auto', imageRendering: 'pixelated'}}
    />
  )
}

export default DitheredImage
