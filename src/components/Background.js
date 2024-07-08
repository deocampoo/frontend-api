import React from 'react';
    
const Background = () => {
  return (
      <div className="boxes">
        {[...Array(9)].map((_, index) => (
          <div key={index}></div>
        ))}
      </div>
  );
};

export default Background;
