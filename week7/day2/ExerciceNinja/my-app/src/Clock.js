import React, { useState, useEffect } from 'react';

export default function Clock() {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      tick();
    }, 1000);

    // Cleanup function
    return () => {
      clearInterval(timer);
    };
  }, []);

  const tick = () => {
    setCurrentDate(new Date());
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Local Time</h2>
      <h1>{currentDate.toLocaleTimeString()}</h1>
    </div>
  );
}
