import React, { useState } from 'react';

function ColumnLeft() {
  const [images, setImages] = useState([]);

  const getImages = async () => {
    try {
      const res = await fetch('https://dog.ceo/api/breeds/image/random/2');
      const data = await res.json();
      setImages(data.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="col">
      <h2>Left Column</h2>
      <button onClick={getImages}>Get images</button>
      <div>
        {images.map((img, index) => (
          <img key={index} src={img} alt="dog" width="200" />
        ))}
      </div>
    </div>
  );
}

export default ColumnLeft;
