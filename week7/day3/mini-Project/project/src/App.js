import React from 'react';
import ColumnLeft from './columns/ColumnLeft';
import ColumnRight from './columns/ColumnRight';
import ErrorBoundary from './components/ErrorBoundary';
// import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Mini Project - Error Boundaries</h1>
      <div style={{ display: 'flex', gap: '30px' }}>
        <ColumnLeft />
        <ErrorBoundary>
          <ColumnRight />
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default App;
