import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import '../App.css';

const Register = ({ setRegisterSuccess }) => {
  const [username, setUsernameState] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isUsernameFocused, setUsernameFocused] = useState(false);
  const [isEmailFocused, setEmailFocused] = useState(false);
  const [isPasswordFocused, setPasswordFocused] = useState(false);
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return `La contraseña debe tener al menos ${minLength} caracteres.`;
    }
    if (!hasUpperCase) {
      return 'La contraseña debe tener al menos una mayuscula .';
      
    }
    if (!hasLowerCase) {
      return 'La contraseña debe tener al menos una minuscula.';
    }
    if (!hasNumbers) {
      return 'La contraseña debe tener al menos un numero.';
    }
    if (!hasSpecialChar) {
      return 'La contraseña debe tener al menos un caracter especial.';
    }
    return null;
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const validationError = validatePassword(password);
    if (validationError) {
      setPasswordError(validationError);
      return;
    }

    try {
      const response = await axios.post('http://localhost:9000/api/auth/signUpUser', {
        user: username,
        email,
        password,
        recoveryAnswer: 'default'  // Ajusta este valor según tus necesidades
      });
      if (response.data.message === "User registered successfully") {
        setRegisterSuccess(true);
        navigate('/login');
      } else {
        alert(response.data.message || 'Error al registrarse');
      }
    } catch (error) {
      console.error('Error al registrarse:', error);
      alert('Error al registrarse');
    }
  };

  return (
    <div className="register-photo">
      <div className="form-container">
        <div className="image-holder"></div>
        <form onSubmit={handleRegisterSubmit}>
          <h2 className="text-center"><strong>Registrarse</strong></h2>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="Nombre de Usuario"
              value={username}
              onChange={(e) => setUsernameState(e.target.value)}
              onFocus={() => setUsernameFocused(true)}
              onBlur={() => setUsernameFocused(false)}
              style={{ 
                backgroundColor: isUsernameFocused ? 'white' : 'transparent', 
                color: isUsernameFocused ? 'black' : '#caced1' 
              }}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="email"
              placeholder="Correo Electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
              style={{ 
                backgroundColor: isEmailFocused ? 'white' : 'transparent', 
                color: isEmailFocused ? 'black' : '#caced1' 
              }}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              style={{ 
                backgroundColor: isPasswordFocused ? 'white' : 'transparent', 
                color: isPasswordFocused ? 'black' : '#caced1' 
              }}
            />
            {passwordError && <small className="text-danger">{passwordError}</small>}
          </div>
          <div className="form-group">
            <button className="btn btn-primary btn-block" type="submit">Registrarse</button>
          </div>
        </form>
      </div>
    </div>
  );
};

Register.propTypes = {
  setRegisterSuccess: PropTypes.func.isRequired,
};

export default Register;
