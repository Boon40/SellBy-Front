import React from 'react';
import './LoginPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';

const LoginPage = () => {

  return (
    <div className="login-page-main-container">
        <div className="login-page-container">
        <form action="/login" method="post">
            <h1>Login</h1>
            <div className="login-page-input-box">
                <input name="email" type="text" placeholder="Email" required />
                <FontAwesomeIcon icon={faUser} className="login-page-icon" />
            </div>
            <div className="login-page-input-box">
                <input name="password" type="password" placeholder="Password" required />
                <FontAwesomeIcon icon={faLock} className="login-page-icon" />
            </div>
            <button type="submit" className="login-page-btn">Login</button>
            <div className="login-page-register-link">
                <p>Don't have an account? <a href="/register">Register</a></p>
            </div>
        </form>
        </div>
    </div>
  );
};

export default LoginPage;