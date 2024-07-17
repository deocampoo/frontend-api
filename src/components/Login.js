import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import Logo from './Logo';
import getUserIdFromToken from "../utils/getUserIdFromToken";
import { GlobalContext } from '../context/GlobalState';
import {listAllFavoriteMovies} from '../api/listAllFavoriteMovies';
import {listAllWatchedMovies} from '../api/listAllWatchedMovies';
import {listAllToWatchMovies} from '../api/listAllToWatchMovies';

const LoginButton = ({ setAuthenticated, setUsername, registerSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [showResetForm, setShowResetForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [emailPlaceholder, setEmailPlaceholder] = useState('Email');
  const [passwordPlaceholder, setPasswordPlaceholder] = useState('Contraseña');
  const navigate = useNavigate();
  const { clearMovieLists, addMovieToFavorites, addMovieToWatchlist, addMovieToWatched } = useContext(GlobalContext);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:9000/api/auth/loginUser', { email, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        setAuthenticated(true);
        setUsername(email);
        navigate('/');

        // Clear any existing movie lists
        clearMovieLists();

        // Load user's movie lists
        const userId = getUserIdFromToken();
        if (userId) {
          const favoriteMovies = await listAllFavoriteMovies(userId);
          favoriteMovies.favoriteMovies.forEach(movie => addMovieToFavorites(movie));

          const watchedMovies = await listAllWatchedMovies(userId);
          watchedMovies.watchedMovies.forEach(movie => addMovieToWatched(movie));

          const toWatchMovies = await listAllToWatchMovies(userId);
          toWatchMovies.toWatchMovies.forEach(movie => addMovieToWatchlist(movie));
        }
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
              name="email"
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
              name="password"
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
                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
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
                name="resetEmail"
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
