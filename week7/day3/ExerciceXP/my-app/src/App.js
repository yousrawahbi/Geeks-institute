// App.js
import React, { Component } from 'react';
import BuggyCounter from './BuggyCounter';
import ErrorBoundary from './ErrorBoundary';

class App extends Component {
  render() {
    return (
      <div style={{ padding: '20px' }}>
        <h1>React Error Boundary - Simulations</h1>

        {/* Simulation 1 */}
        <h2>Simulation 1: Two BuggyCounters inside one ErrorBoundary</h2>
        <ErrorBoundary>
          <BuggyCounter />
          <BuggyCounter />
        </ErrorBoundary>

        {/* Simulation 2 */}
        <h2>Simulation 2: Each BuggyCounter in its own ErrorBoundary</h2>
        <ErrorBoundary>
          <BuggyCounter />
        </ErrorBoundary>
        <ErrorBoundary>
          <BuggyCounter />
        </ErrorBoundary>

        {/* Simulation 3 */}
        <h2>Simulation 3: BuggyCounter without ErrorBoundary</h2>
        <BuggyCounter />
      </div>
    );
  }
}

export default App;

