import { useRef, useEffect } from 'react'
import dither from '../utils/dithering'

const DitheredImage = ({src, width = 600}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      canvas.width = width;
      canvas.height = img.height * canvas.width / img.width;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      dither(ctx, canvas.width, canvas.height);
    }
    img.src = src;
  }, [])

  return <canvas ref={canvasRef} />
}

export default DitheredImage
