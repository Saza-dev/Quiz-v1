import React from 'react'
import { Link } from 'react-router-dom';

function NavBarOne(){
    return(
        <nav className="navbar bg-light">
        <div className="container-fluid d-flex">
        <Link to='/' className="navbar-brand ms-5">QBIT</Link>
        <div className="d-flex">
        <a className="nav-link p-2  me-5 " href="/">Home</a>
            <Link to="/Login" className="nav-link p-2  me-5 " >Login</Link>
            <Link to="/CreateAccount" className="nav-link p-2  me-5 " >Create Acc</Link>
        </div>
        </div>
        </nav>
    )
}

export default NavBarOne;
