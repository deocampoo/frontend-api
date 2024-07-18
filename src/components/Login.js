import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {jwtDecode} from 'jwt-decode';
import loginUser from '../API/loginUserAPI'
import Logo from './Logo';

const LoginButton = ({ setAuthenticated, setUsername, registerSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [showResetForm, setShowResetForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [emailPlaceholder, setEmailPlaceholder] = useState('Email');
  const [passwordPlaceholder, setPasswordPlaceholder] = useState('Contraseña');
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(email, password);
      if (response.token) {
        const decoded = jwtDecode(response.token);
        sessionStorage.setItem('token', response.token);
        sessionStorage.setItem('userId', decoded.id); // Almacena el userId en sessionStorage
        setAuthenticated(true);
        setUsername(email);
        navigate('/');
      } else {
        setErrorMessage('Usuario o clave incorrecta');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage('Usuario o clave incorrecta');
      } else {
        console.error('Error al iniciar sesión:', error);
      }
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setShowResetForm(true);
  };

  const handleResetSubmit = (e) => {
    e.preventDefault();
    alert(`Password reset email sent to ${resetEmail}`);
    setShowResetForm(false);
  };

  return (
    <div className="register-photo">
      <div className="form-container">
        <Logo />
        {registerSuccess && <div className="success-message">El usuario se registró con éxito!</div>}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <form method="post" onSubmit={handleLoginSubmit}>
          <h4>Inicia sesión o regístrate</h4>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              id="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setEmailPlaceholder('')}
              onBlur={() => setEmailPlaceholder(email ? '' : 'Email')}
              placeholder={emailPlaceholder}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="password"
              id="password"
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setPasswordPlaceholder('')}
              onBlur={() => setPasswordPlaceholder(password ? '' : 'Contraseña')}
              placeholder={passwordPlaceholder}
            />
          </div>
          <div className="form-group">
            <div className="d-flex justify-content-between">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="flexCheckDefault" />
                <label className="form-check-label" htmlFor="flexCheckDefault"> Recordarme </label>
              </div>
              <div>
                <a href="#" className="text-info" onClick={handleForgotPassword}>Olvidé mi contraseña</a>
              </div>
            </div>
          </div>
          <div className="form-group">
            <button className="btn btn-primary btn-block" type="submit">Iniciar sesión</button>
          </div>
          <div className="form-group">
            <button className="btn btn-primary btn-block" onClick={() => navigate('/register')}>Registrarse</button>
          </div>
          <a className="already" href="#">Términos de uso y políticas privadas</a>
        </form>

        {showResetForm && (
          <form onSubmit={handleResetSubmit}>
            <div className="form-group">
              <input
                className="form-control"
                type="email"
                id="resetEmail"
                name="resetEmail"
                autoComplete="email"
                placeholder="Ingresa tu email para resetear la contraseña"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <button className="btn btn-primary btn-block" type="submit">Resetear contraseña</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

LoginButton.propTypes = {
  setAuthenticated: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  registerSuccess: PropTypes.bool.isRequired,
};

export default LoginButton;
