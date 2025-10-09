import React, { useState } from 'react';

function ColumnRight() {
  const [text, setText] = useState('Click the button below');

  const replaceWithObject = () => {
    // هادي غادي تسبب فـ error لأن React ما كيقدرش يرندر Object
    setText({ function: 'I live to crash' });
  };

  const handleEvent = () => {
    throw new Error('This is an event handler error!');
  };

  return (
    <div className="col">
      <h2>Right Column</h2>
      <p>{text}</p>
      <p>{'stringified text'}</p>

      <button onClick={replaceWithObject}>Replace string with object</button>
      <button onClick={handleEvent}>Invoke event handler</button>
    </div>
  );
}

export default ColumnRight;
