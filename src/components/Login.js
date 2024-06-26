import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const LoginButton = ({ setAuthenticated }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [resetEmail, setResetEmail] = useState('');
    const [showResetForm, setShowResetForm] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    const validatePassword = (password) => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (password.length < minLength) {
            return `Password must be at least ${minLength} characters long.`;
        }
        if (!hasUpperCase) {
            return 'Password must contain at least one uppercase letter.';
        }
        if (!hasLowerCase) {
            return 'Password must contain at least one lowercase letter.';
        }
        if (!hasNumbers) {
            return 'Password must contain at least one number.';
        }
        if (!hasSpecialChar) {
            return 'Password must contain at least one special character.';
        }
        return null; // Password is valid
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Simulación de autenticación básica
       // if (username === 'user' && password === 'password') {
            setAuthenticated(true);
            navigate('/'); // Redirige a la página principal después de iniciar sesión
        //} else {
          //  alert('Invalid credentials');
       // }
    };

    const handleForgotPassword = (e) => {
        e.preventDefault();
        setShowResetForm(true);
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        const validationError = validatePassword(newPassword);
        setPasswordError(validationError);
    };

    const handleResetSubmit = (e) => {
        e.preventDefault();
        // Aquí deberías implementar la lógica para enviar un correo electrónico con un enlace seguro para restablecer la contraseña
        alert(`Password reset email sent to ${resetEmail}`);
        setShowResetForm(false);
    };

    return (
        <div className="register-photo">
            <div className="form-container">
                <div className="image-holder"></div>
                <form method="post" onSubmit={handleSubmit}>
                    <h2 className="text-center"><strong>Welcome back!</strong></h2>
                    <div className="form-group">
                        <input 
                            className="form-control" 
                            type="text" 
                            name="username" 
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            className="form-control" 
                            type="password" 
                            name="password" 
                            placeholder="Password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        {passwordError && <small className="text-danger">{passwordError}</small>}
                    </div>
                    <div className="form-group">
                        <div className="d-flex justify-content-between">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
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

export default LoginButton;