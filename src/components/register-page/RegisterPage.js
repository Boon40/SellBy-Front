import React, { useState, useEffect } from 'react';
import axios from '../../api/axiosConfig';
import { useNavigate } from "react-router-dom";
import './RegisterPage.css';

const RegisterPage = () => {
    const [userData, setUserData] = useState({
        email: '',
        password: '',
        number: '',
        first_name: '',
        last_name: '',
        country: '',
        city: ''
    });
    const [currentUser, setCurrentUser] = useState(null);

    const [passwords, setPasswords] = useState({
        password: '',
        repeat_password: ''
    })

    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswords({
            ...passwords,
            [name]: value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (passwords.password == passwords.repeat_password){
            userData.password = passwords.password;
            try{
                const response = await axios.post('http://localhost:8080/api/v1/authentication/register', userData);
                if (response.data.token){
                    localStorage.setItem("user", JSON.stringify(response.data));
                    setCurrentUser(JSON.stringify(response.data));
                }
            } catch (e){
                setError(e.response.data);
            }
        }
        else{
            setError('Password are not the same!');
        }
    }

    const navigate = useNavigate();
    useEffect(() => {
        if (currentUser) {
            navigate('/');
        }
    }, [currentUser]);

  return (
    <div className="register-page-main-container">
        <div className="register-page-container">
            <form onSubmit={handleSubmit}>
                <h1>Register</h1>
                <div className="register-page-small-container">
                    <div className="register-page-input-box">
                        <input name="first_name" type="text" placeholder="First name" value={userData.first_name} onChange={handleChange} required/>
                    </div>
                    <div className="register-page-input-box">
                        <input name="last_name" type="text" placeholder="Last name" value={userData.last_name} onChange={handleChange} required/>
                    </div>
                </div>
                <div className="register-page-small-container">
                    <div className="register-page-input-box">
                        <input name="email" type="text" placeholder="Email" value={userData.email} onChange={handleChange} required/>
                    </div>
                    <div className="register-page-input-box">
                        <input name="number" type="text" placeholder="Number" value={userData.number} onChange={handleChange} required/>
                    </div>
                </div>
                <div className="register-page-small-container">
                    <div className="register-page-input-box">
                        <input name="country" type="text" placeholder="Country" value={userData.country} onChange={handleChange} required/>
                    </div>
                    <div className="register-page-input-box">
                        <input name="city" type="text" placeholder="City" value={userData.city} onChange={handleChange} required/>
                    </div>
                </div>
                <div className="register-page-small-container">
                    <div className="register-page-input-box">
                        <input name="password" type="password" placeholder="Password" value={passwords.password} onChange={handlePasswordChange} required/>
                    </div>
                    <div className="register-page-input-box">
                        <input name="repeat_password" type="password" placeholder="Repeat password" value={passwords.repeat_password} onChange={handlePasswordChange} required/>
                    </div>
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="register-page-btn">Register</button>
                <div className="register-page-login-link">
                    <p>Already have an account? <a href="login">Login</a></p>
                </div>
            </form>
        </div>
    </div>
  );
};

export default RegisterPage;