import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = ({ setAuthenticated }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        setAuthenticated(false); // Actualiza el estado de autenticación
        navigate('/login'); // Redirige a la página de login
    };

    return (
        <div className='logoutContainer'>
            <button className='logoutButton' onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};

export default LogoutButton;