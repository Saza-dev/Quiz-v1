import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function NavBarTwo() {

  const [role,setRole] = useState()

  function logoutFunc (){
    localStorage.clear()
  }

  useEffect(()=>{

    axios
      .post("http://localhost:8070/dashboard", { registerNo : localStorage.getItem("regNo") })
      .then((result) => {
        setRole(result.data.role)
      })
      .catch((err) => {
        console.error(err);
      });
  },[])

  if (role === undefined) return "loading..."

  if (role==="admin"){

    return (
      <nav className="navbar bg-light">
        <div className="container-fluid d-flex">
          <Link to="/dashboard" className="navbar-brand ms-5">QBIT</Link>
          <div className="d-flex">
            <Link to="/AdminDashboard" className="nav-link p-2 me-5">Dashboard</Link>
            <Link to="/Account" className="nav-link p-2 me-5">Account</Link>
            <Link to="/" className="nav-link p-2 me-5" onClick={logoutFunc}>Logout</Link>
          </div>
        </div>
      </nav>
    );

  }else{

    return (
      <nav className="navbar bg-light">
        <div className="container-fluid d-flex">
          <Link to="/dashboard" className="navbar-brand ms-5">QBIT</Link>
          <div className="d-flex">
            <Link to="/join" className="nav-link p-2 me-5">Join Quiz</Link>
            <Link to="/UserDashboard" className="nav-link p-2 me-5">Dashboard</Link>
            <Link to="/Account" className="nav-link p-2 me-5">Account</Link>
            <Link to="/" className="nav-link p-2 me-5" onClick={logoutFunc}>Logout</Link>
          </div>
        </div>
      </nav>
    );

  }


}

export default NavBarTwo;
