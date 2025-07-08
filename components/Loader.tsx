import React from 'react';
import './Loader.css';
import coinGif from '../../public/coin.gif';

const Loader = () => {
  return (
    <div className="loader-container">
      <img src={coinGif} alt="Loading..." className="loader-image" />
    </div>
  );
};

export default Loader;