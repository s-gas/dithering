import { useState } from 'react'
import DitheredImage from './components/DitheredImage'
import Inputs from './components/Inputs'

function App() {
  const [src, setSrc] = useState(null);
  const [ditherWidth, setDitherWidth] = useState(600);
  const [imageWidth, setImageWidth] = useState(600);


  return (
    <div className="flex flex-col items-center p-8 gap-4 bg-stone-100 h-screen text-stone-800">
      <Inputs ditherWidth={ditherWidth} imageWidth={imageWidth} setDitherWidth={setDitherWidth} setImageWidth={setImageWidth} setSrc={setSrc}/>
      <DitheredImage src={src} ditherWidth={ditherWidth} imageWidth={imageWidth} />
    </div>
  )
}

export default App
