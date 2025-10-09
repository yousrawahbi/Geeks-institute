import React from 'react';
import Car from './car';
import Events from './Event';
import Phone from './Phone';
import Color from './Color';

const carinfo = { name: "Ford", model: "Mustang" };

function App() {
  return (
    <div>
      <Car car={carinfo} />
      <hr />
      <Events />
      <hr />
      <Phone />
      <hr />
      <Color />
    </div>
  );
}

export default App;
