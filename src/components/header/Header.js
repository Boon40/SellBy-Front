import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import AuthService from '../../service/AuthService';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import axios from '../../api/axiosConfig';
import React from 'react';

const Header = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userDetails, setUserDetails] = useState([]);
    
    useEffect(() => {
        const fetchUserData = async () => {
            const user = AuthService.getCurrentUser();
    
            if (user) {
                setCurrentUser((prevUser) => {
                    if (prevUser !== user) {
                        return user;
                    }
                    return prevUser;
                });
                console.log(user);
                try {
                    const response = await axios.get(`/api/v1/users/email/${jwtDecode(user.token).sub}`);
                    setUserDetails(response.data);
                } catch (error) {
                    console.error('Error getting user: ', error);
                }
            }
        };
    
        fetchUserData();
    }, []);

    const navigate = useNavigate();
    const logout = () => {
        AuthService.logout();
        navigate('/');
    }
    

    return (
        <nav>
            <input type="checkbox" id="check" />
            <label htmlFor="check" className="header-checkbtn">
                <FontAwesomeIcon icon={faBars} />
            </label>
            <a className="nav-logo" href="/">
                <label className="nav-logo">SellBy</label>
            </a>
            {currentUser ?(
                <ul>
                    <li>
                        <a className="nav-text" href="/addProduct">
                            Add product
                        </a>
                    </li>
                    <li>
                        <a className="nav-text" href={`/user/${userDetails.id}`}>
                            Profile
                        </a>
                    </li>
                    <li>
                        <a className="nav-text" href="/" onClick={logout}>
                            Logout
                        </a>
                    </li>
                </ul>
            ) : (
                <ul>
                    <li>
                        <a className="nav-text" href="/login">
                            Login
                        </a>
                    </li>
                    <li>
                        <a className="nav-text" href="/register">
                            Register
                        </a>
                    </li>
                </ul>
            )}
        </nav>
    );
}

export default Header;