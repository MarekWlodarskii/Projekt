import {
    Link
}
from 'react-router-dom';
import './NavbarStyles.css';

function Navbar(){
    return (

        <nav className = 'NavigateBar'>
            <ul>
                <li/>
                <Link to ="/Data">
                    <li>
                        Data
                    </li>
                </Link>
                <Link to ="/SignIn">
                    <li>
                        Sign In
                    </li>
                </Link>
                <Link to="/SignUp">
                    <li className = 'RightMenuElement'>
                        Sign Up
                    </li>
                </Link>
            </ul>         
        </nav>

    )
};

export default Navbar;