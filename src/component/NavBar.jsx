import React from 'react';
import {Link} from 'react-router-dom';

function NavBar(){
return <div>
    <nav className="navbar navbar-expand-sm ">
        <div className="collapse navbar-collapse  nav-bar" id="navbarsExample03">
            <ul className="navbar-nav mr-auto">
                <li>
                <Link className="navbar-link" to='/'>PasswordManager</Link>
                </li>
                <li >
                    <Link className="navbar-link" to='/LoginPage'>Login</Link>
                </li>
                <li>
                    <Link className="navbar-link" to='/SignUpPage'>Sign up</Link>
                </li>
            </ul>
        </div>
    </nav>
</div>
}

export default NavBar;