import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function App() {
  return (
    <div className="App" style={{ maxWidth: "600px", margin: "auto", marginTop: "50px" }}>
      <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false}>
        <div>
          <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80" alt="Hong Kong" />
          <p className="legend">Hong Kong</p>
        </div>
        <div>
          <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80" alt="Macao" />
          <p className="legend">Macao</p>
        </div>
        <div>
          <img src="https://images.unsplash.com/photo-1549692520-acc6669e2f0c?auto=format&fit=crop&w=800&q=80" alt="Japan" />
          <p className="legend">Japan</p>
        </div>
        <div>
          <img src="https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=800&q=80" alt="Las Vegas" />
          <p className="legend">Las Vegas</p>
        </div>
      </Carousel>
    </div>
  );
}

export default App;

