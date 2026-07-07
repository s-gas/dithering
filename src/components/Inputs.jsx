const Inputs = ({ditherWidth, imageWidth, setDitherWidth, setImageWidth, setSrc}) => {
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSrc(url);
    }
  }

  return (
    <div className="flex flex-col gap-4 border border-stone-200 p-4">
      <input type="file" accepts="image/*" onChange={(e) => handleChange(e)}/>
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
  )
}

export default Inputs
