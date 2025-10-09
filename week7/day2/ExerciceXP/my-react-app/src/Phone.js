import React, { useState } from 'react';

function Phone() {
  const [phone, setPhone] = useState({
    brand: "Samsung",
    model: "Galaxy S20",
    color: "black",
    year: 2020,
  });

  const changeColor = () => {
    setPhone(prev => ({ ...prev, color: "blue" }));
  };

  return (
    <div>
      <h3>Brand: {phone.brand}</h3>
      <h3>Model: {phone.model}</h3>
      <h3>Color: {phone.color}</h3>
      <h3>Year: {phone.year}</h3>
      <button onClick={changeColor}>Change color to blue</button>
    </div>
  );
}

export default Phone;
