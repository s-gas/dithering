import { useState } from 'react'
import DitheredImage from './components/DitheredImage'

function App() {
  const [ditherWidth, setDitherWidth] = useState(600);
  const [imageWidth, setImageWidth] = useState(600);

  return (
    <div className="flex flex-col justify-center items-center mt-20 gap-4">
      <div className="flex flex-col gap-4 border p-4">
        <label className="flex justify-between gap-4">
          <p>Dither density: {ditherWidth}px</p>
          <input
            type="range"
            min={200}
            max={1200}
            value={ditherWidth}
            onChange={(e) => setDitherWidth(Number(e.target.value))}
          />
        </label>

        <label className="flex justify-between gap-4">
          <p>Image width: {imageWidth}px</p>
          <input
            type="range"
            min={200}
            max={1200}
            value={imageWidth}
            onChange={(e) => setImageWidth(Number(e.target.value))}
          />
        </label>
      </div>
      <DitheredImage src="/pic.jpg" ditherWidth={ditherWidth} imageWidth={imageWidth}/>
    </div>
  )
}

export default App
