// src/App.js
import React from 'react';
import ErrorBoundary from './components/ErrorBoundary';

class BuggyComponent extends React.Component {
  render() {
    throw new Error("Crash! 💥");
    return null;
  }
}

function App() {
  const [showBug, setShowBug] = React.useState(false);

  return (
    <div className="App">
      <h1>Error Boundary Modal Example</h1>
      <ErrorBoundary>
        <button onClick={() => setShowBug(true)}>Click me to crash!</button>
        {showBug && <BuggyComponent />}
      </ErrorBoundary>
    </div>
  );
}

export default App;

