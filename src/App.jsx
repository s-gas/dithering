import { useRef, useEffect } from 'react'
import getRgbValues from './utils/rgbArray'

function App() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      canvas.width = 600;
      canvas.height = img.height * canvas.width / img.width;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const rgbArray = getRgbValues(ctx, canvas.width, canvas.height);
      console.log(rgbArray);
    }
    img.src = "/pic.jpg";
  }, [])

  return <canvas ref={canvasRef} />
}

export default App
