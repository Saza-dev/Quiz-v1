import React, { useEffect, useState } from 'react'
import NavBarTwo from './NavBarTwo';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function UserProfile(){

    const navigate = useNavigate();
    const [detail,setDetail] = useState("");


    useEffect(() => {
        if(localStorage.getItem("status") !== "true")
        return  navigate("/Login");

        axios
        .post("http://localhost:8070/dashboard", { registerNo : localStorage.getItem("regNo") })
        .then((result) => {
          setDetail(result.data);
        })
        .catch((err) => {
          console.error(err);
        });



    },[])

    return(
        <div>

    <NavBarTwo />

<br/><br/>
    <h1 id="myAccount">My Account</h1>

    
    <div className="AccountDetalis">
        <div className="container cntOne text-center align-items-center">
            <div className="row">
                <div className="col-md-6">
                    <p className="fs-3">User name</p>
                </div>
                <div className="col-md-5 border border-dark border-2 mb-2">
                    <p className="fs-5">{detail.uName}</p>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <p className="fs-3">Email</p>
                </div>
                <div className="col-md-5 border border-dark border-2 mb-2">
                    <p className="fs-5">{detail.email}</p>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <p className="fs-3">index number</p>
                </div>
                <div className="col-md-5 border border-dark border-2 mb-2">
                    <p className="fs-5">{detail.regNo}</p>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <p className="fs-3">Account Type:</p>
                </div>
                <div className="col-md-5 border border-dark border-2 mb-2">
                    <p className="fs-5">{detail.role}</p>
                </div>
            </div>
            <br/><br/>
        </div>
        <div className="container d-flex justify-content-center">
            <div className="buttonAcc">
                <button type="button" className="btn btn-primary" ><p className="fs-5">Change Username</p></button>
                <button type="button" className="btn btn-primary" ><p className="fs-5">Change Password</p></button>
            </div>
        </div>
    </div>


</div>


    )

}


export default UserProfile;