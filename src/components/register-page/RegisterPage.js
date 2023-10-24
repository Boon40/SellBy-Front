import React from 'react';
import './RegisterPage.css';

const RegisterPage = () => {

  return (
    <div className="register-page-main-container">
        <div className="register-page-container">
            <form action="/register" method="post">
                <h1>Register</h1>
                <div className="register-page-small-container">
                    <div className="register-page-input-box">
                        <input name="first_name" type="text" placeholder="First name" required/>
                    </div>
                    <div className="register-page-input-box">
                        <input name="last_name" type="text" placeholder="Last name" required/>
                    </div>
                </div>
                <div className="register-page-small-container">
                    <div className="register-page-input-box">
                        <input name="email" type="text" placeholder="Email" required/>
                    </div>
                    <div className="register-page-input-box">
                        <input name="number" type="text" placeholder="Number" required/>
                    </div>
                </div>
                <div className="register-page-small-container">
                    <div className="register-page-input-box">
                        <input name="country" type="text" placeholder="Country" required/>
                    </div>
                    <div className="register-page-input-box">
                        <input name="city" type="text" placeholder="City" required/>
                    </div>
                </div>
                <div className="register-page-small-container">
                    <div className="register-page-input-box">
                        <input name="password" type="password" placeholder="Password" required/>
                    </div>
                    <div className="register-page-input-box">
                        <input name="repeat_password" type="password" placeholder="Repeat password" required/>
                    </div>
                </div>
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