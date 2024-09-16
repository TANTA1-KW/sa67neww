import React from 'react';
import { Carousel } from 'antd';
import w1 from "../../assets/w1.jpg";
import w2 from "../../assets/w2.jpg";
import w3 from "../../assets/w3.jpg";
import w4 from "../../assets/w4.jpg";

const carouselStyle: React.CSSProperties = {
  position: 'relative', // Allows positioning the overlay relative to the carousel
};

const contentStyle: React.CSSProperties = {
  height: '778px',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',  // Ensure the image stays within bounds
};

const logoStyle: React.CSSProperties = {
  width: '100%',       // Take up full width of the container
  height: '100%',      // Take up full height of the container
  objectFit: 'cover',  // Ensures the image covers the container while maintaining aspect ratio
};

const overlayStyle: React.CSSProperties = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  color: '#fff',
  fontSize: '48px',
  fontWeight: 'bold',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)',
  zIndex: 1, // Ensure it appears on top of the image
  textAlign: 'center', // Center text
  width: '100%', // Full width of the viewport
};

const App: React.FC = () => (
  <div style={{ position: 'relative', height: '778px' }}>
     <Carousel autoplay autoplaySpeed={2000} style={carouselStyle}>
      <div>
        <div style={contentStyle}>
          <img src={w1} alt="Wallpaper Slide 1" style={logoStyle} />
        </div>
      </div>
      <div>
        <div style={contentStyle}>
          <img src={w2} alt="Wallpaper Slide 2" style={logoStyle} />
        </div>
      </div>
      <div>
        <div style={contentStyle}>
          <img src={w3} alt="Wallpaper Slide 3" style={logoStyle} />
        </div>
      </div>
      <div>
        <div style={contentStyle}>
          <img src={w4} alt="Wallpaper Slide 4" style={logoStyle} />
        </div>
      </div>
    </Carousel>
    <div style={overlayStyle}>TWN Rent Car</div>
  </div>
);

export default App;