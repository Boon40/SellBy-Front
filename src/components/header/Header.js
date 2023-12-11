import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMessage, faHeart, faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    return (
        <nav>
            <input type="checkbox" id="check" />
            <label htmlFor="check" className="header-checkbtn">
                <FontAwesomeIcon icon={faBars} />
            </label>
            <a className="nav-logo" href="/">
                <label className="nav-logo">SellBy</label>
            </a>
            <ul>
                <li>
                    <a className="nav-text" href="/addProduct">
                        Add product
                    </a>
                </li>
                <li>
                    <a className="nav-text" href="user/1">
                        Profile
                    </a>
                </li>
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
        </nav>
    );
}

export default Header;