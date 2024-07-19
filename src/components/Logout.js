import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { GlobalContext } from '../context/GlobalState';

const LogoutButton = ({ setAuthenticated }) => {
  const navigate = useNavigate();
  const { clearLists } = useContext(GlobalContext);

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
        clearLists(); 
        navigate('/login'); 
      } else {
        console.error('Logout failed:', response.data);
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <div className='logoutContainer'>
      <button className="btn btn-success btn-block btn-info" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </div>
  );
};

LogoutButton.propTypes = {
  setAuthenticated: PropTypes.func.isRequired,
};

export default LogoutButton;
