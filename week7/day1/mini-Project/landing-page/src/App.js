import React from 'react';
import Header from './Header';
import Card from './card';
import Contact from './contact';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <div>
      <Header />

      <div className="container d-flex flex-wrap justify-content-around mt-5">
        <Card icon="fas fa-globe" title="Fast" text="Our service is super fast and reliable." />
        <Card icon="fas fa-home" title="Secure" text="We use top security protocols." />
        <Card icon="thumbs-up" title="Trusted" text="Trusted by thousands of users." />
      </div>

      <Contact />
    </div>
  );
}

export default App;
