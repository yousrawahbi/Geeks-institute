// src/App.js
import React from 'react';
import BootstrapCard from './BootstrapCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import Planets from './Planets';

const celebrities = [
  {
    title: 'Bob Dylan',
    imageUrl: 'https://miro.medium.com/max/4800/1*_EDEWvWLREzlAvaQRfC_SQ.jpeg',
    buttonLabel: 'Go to Wikipedia',
    buttonUrl: 'https://en.wikipedia.org/wiki/Bob_Dylan',
    description:
      'Bob Dylan (born Robert Allen Zimmerman, May 24, 1941) is an American singer/songwriter...',
  },
  {
    title: 'McCartney',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Paul_McCartney_in_October_2018.jpg/240px-Paul_McCartney_in_October_2018.jpg',
    buttonLabel: 'Go to Wikipedia',
    buttonUrl: 'https://en.wikipedia.org/wiki/Paul_McCartney',
    description:
      'Sir James Paul McCartney CH MBE (born 18 June 1942) is an English singer, songwriter...',
  },
];

// function App() {
//   return (
//     <div className="App">
//       {celebrities.map((celeb, index) => (
//         <BootstrapCard
//           key={index}
//           title={celeb.title}
//           imageUrl={celeb.imageUrl}
//           buttonLabel={celeb.buttonLabel}
//           buttonUrl={celeb.buttonUrl}
//           description={celeb.description}
//         />
//       ))}
//     </div>
//   );
// }

function App() {
  return (
    <div className="App">
      {celebrities.map((celeb, index) => (
        <BootstrapCard
          key={index}
          title={celeb.title}
          imageUrl={celeb.imageUrl}
          buttonLabel={celeb.buttonLabel}
          buttonUrl={celeb.buttonUrl}
          description={celeb.description}
        />
      ))}
      <Planets />
    </div>
  );
}


export default App;



