import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Footer from './Footer';

const ScrollFooter = ({ children }) => {
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const containerRef = useRef(null);

  const handleScroll = () => {
    if (containerRef.current) {
      const containerBottom = containerRef.current.getBoundingClientRect().bottom;
      const viewportHeight = window.innerHeight;
      setIsFooterVisible(containerBottom <= viewportHeight);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check the initial position
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={containerRef} style={{ minHeight: '100vh' }}>
      {children}
      {isFooterVisible && <Footer />}
    </div>
  );
};

ScrollFooter.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ScrollFooter;
