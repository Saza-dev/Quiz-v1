import React, { useEffect, useState } from "react";
import NavBarTwo from "./NavBarTwo";
import { useNavigate } from "react-router-dom";

function JoinQuiz(){

    const navigate = useNavigate();
    const[otp,setOtp] = useState("");

    localStorage.setItem('otp', otp);
    
    const handleClick = () => {
        navigate('/Quiz');
      };

    useEffect(() => {
        
        if(localStorage.getItem("status") !== "true")
        return  navigate("/Login");

    },[])


    return(
        <div>
        <NavBarTwo />
        <div class="container text-center mt-5">
        <h1>QBIT</h1>
        <div class="d-flex justify-content-center align-items-center custom-margin-top">
        <form class="login">
            <div class="mb-5 form-outline">
                <p class="font-weight-normal h4 ugNum">{localStorage.getItem("regNo")}</p>
            </div>
            <div class="mb-5">
                <input type="text" class="form-control form-control-lg" placeholder="OTP" onChange={(e)=>{
                        setOtp(e.target.value) 
                    }} required/>
            </div>
            <button type="submit" class="btn btn-dark btn-lg px-5 " onClick={handleClick}>Enter</button>
        </form>
         </div>
        </div>
        </div>
    )

}

export default JoinQuiz;