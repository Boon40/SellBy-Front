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
                    <a href="#">
                        <div className="nav-icon">
                            <FontAwesomeIcon className="header-icon" icon={faMessage} size="2x" aria-hidden="true"/>
                            <FontAwesomeIcon className="header-icon" icon={faMessage} size="2x" aria-hidden="true"/>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <div className="nav-icon">
                            <FontAwesomeIcon className="header-icon" icon={faHeart} size="2x" aria-hidden="true"/>
                            <FontAwesomeIcon className="header-icon" icon={faHeart} size="2x" aria-hidden="true"/>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <div className="nav-icon">
                            <FontAwesomeIcon className="header-icon" icon={faCartShopping} size="2x" aria-hidden="true"/>
                            <FontAwesomeIcon className="header-icon" icon={faCartShopping} size="2x" aria-hidden="true"/>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="/login">
                        <div className="nav-icon">
                            <FontAwesomeIcon className="header-icon" icon={faUser} size="2x" aria-hidden="true"/>
                            <FontAwesomeIcon className="header-icon" icon={faUser} size="2x" aria-hidden="true"/>
                        </div>
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default Header;