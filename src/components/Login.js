import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import '../App.css';

const LoginButton = ({ setAuthenticated, setUsername, registerSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [showResetForm, setShowResetForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // Estado para el mensaje de error
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:9000/api/auth/signInUser', {
        email,
        password,
      });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
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
        {registerSuccess && <div className="success-message">User registered successfully!</div>}
        {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Mensaje de error */}
        <div className="image-holder"></div>
        <form method="post" onSubmit={handleLoginSubmit}>
          <h2 className="text-center"><strong>Welcome back!</strong></h2>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <div className="d-flex justify-content-between">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                <label className="form-check-label" htmlFor="flexCheckDefault"> Remember me </label>
              </div>
              <div>
                <a href="#" className="text-info" onClick={handleForgotPassword}>Forgot Password</a>
              </div>
            </div>
          </div>
          <div className="form-group">
            <button className="btn btn-success btn-block btn-info" type="submit">Login</button>
          </div>
          <div className="form-group">
            <button className="btn btn-link" onClick={() => navigate('/register')}>Register</button>
          </div>
          <a className="already" href="#">Terms of Use and Privacy Policy</a>
        </form>

        {showResetForm && (
          <form onSubmit={handleResetSubmit}>
            <div className="form-group">
              <input
                className="form-control"
                type="email"
                name="resetEmail"
                placeholder="Enter your email to reset password"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <button className="btn btn-success btn-block btn-info" type="submit">Reset Password</button>
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