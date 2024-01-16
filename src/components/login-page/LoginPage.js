import React, { useState, useEffect } from 'react';
import axios from '../../api/axiosConfig';
import { useNavigate } from "react-router-dom";
import './LoginPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';

const LoginPage = () => {

    const [userData, setUserData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [currentUser, setCurrentUser] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };

    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            const response = await axios.post('http://localhost:8080/api/v1/authentication/authenticate', userData);
            if (response.data.token){
                localStorage.setItem("user", JSON.stringify(response.data));
                setCurrentUser(JSON.stringify(response.data));
            }
        } catch (e){
            setError(e.response.data);
        }
    };
    
    const navigate = useNavigate();
    useEffect(() => {
        if (currentUser) {
            navigate('/');
        }
    }, [currentUser]);

  return (
    <div className="login-page-main-container">
        <div className="login-page-container">
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div className="login-page-input-box">
                <input name="email" type="text" placeholder="Email" value={userData.email} onChange={handleChange} required />
                <FontAwesomeIcon icon={faUser} className="login-page-icon" />
            </div>
            <div className="login-page-input-box">
                <input name="password" type="password" placeholder="Password" value={userData.password} onChange={handleChange} required />
                <FontAwesomeIcon icon={faLock} className="login-page-icon" />
            </div>
            {error && <p className="login-error-message">{error}</p>}
            <button type="submit" className="login-page-btn">Login</button>
            <div className="login-page-register-link">
                <p>Do not have an account? <a href="/register">Register</a></p>
            </div>
        </form>
        </div>
    </div>
  );
};

export default LoginPage;