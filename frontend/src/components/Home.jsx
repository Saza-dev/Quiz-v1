import React, { useState } from 'react';
import NavBar from './NavBarOne';
import { useNavigate} from "react-router-dom";


function Home (){

    const Navigate = useNavigate();

    const handleClick = () => {
        Navigate('/Quiz');
      };

    const[otp,setOtp] = useState("");
    const[userName,setUserName] = useState("")

    localStorage.setItem('regNo', userName);
    localStorage.setItem('otp', otp);


    return(
    <div>
    <NavBar />
    <div className="container text-center mt-5">
    <h1>QBIT</h1>
    <div className="d-flex justify-content-center align-items-center custom-margin-top">
        <form className='login'>
            <div className="mb-5 form-outline">
                <input type="text" className="form-control form-control-lg" placeholder="name" onChange={(e)=>{
                        setUserName(e.target.value) 
                    }} required />
            </div>

            <div className="mb-5">
                <input type="text" className="form-control form-control-lg" placeholder="OTP" onChange={(e)=>{
                        setOtp(e.target.value) 
                    }} required />
            </div>
            <button type="submit" className="btn btn-dark btn-lg px-5 " onClick={handleClick}>Enter</button>
        </form>
    </div>
</div>
</div>
    )


}

export default Home;