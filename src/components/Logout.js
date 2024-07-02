import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

const LogoutButton = ({ setAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:9000/api/auth/logoutUser', {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.data.message === 'Logged out successfully') {
        localStorage.removeItem('token');
        setAuthenticated(false);
        navigate('/login'); // Redirige al usuario a la página de inicio de sesión
      } else {
        console.error('Logout failed:', response.data);
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <div className='logoutContainer'>
      <button className='logoutButton' onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

LogoutButton.propTypes = {
  setAuthenticated: PropTypes.func.isRequired,
};

export default LogoutButton;
