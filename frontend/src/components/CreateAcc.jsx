import React,{useState} from 'react'
import axios from 'axios'
import NavBar from './NavBarOne';
import { useNavigate } from 'react-router-dom';



function CreateAcc(){

    const[regNo,setRegNo] = useState("")
    const[uName,setUName] = useState("")
    const[email,setEmail] = useState("")
    const[password,setPassword] = useState("")

    const navigate = useNavigate();

    function sendData(e){

        e.preventDefault();

        const newUser = {
            regNo,
            uName,
            email,
            password,
            role:"student"
        }

        axios.post('http://localhost:8070/CreateAcc',newUser)
        .then((result)=>{    
        localStorage.setItem('status', true);
        localStorage.setItem('regNo', regNo);
        navigate('/UserDashboard')
        }).catch((err)=>{
            console.log(err);
        })

    }
    


    return (

<div>
    <NavBar />
    <div className="container text-center mt-5">
        <h1>QBIT</h1>
        <div className="d-flex justify-content-center align-items-center custom-margin-top">
            <form onSubmit={sendData} className='login'>
                <div className="mb-3 form-outline">
                    <input type="text" className="form-control form-control-lg" placeholder="Registration Number" id="regNo" 
                    onChange={(e)=>{
                        setRegNo(e.target.value)
                    }} required/>
                </div>
                <div className="mb-3 form-outline">
                    <input type="text" className="form-control form-control-lg" placeholder="Name" id="uName" onChange={(e)=>{
                        setUName(e.target.value)
                    }} required/>
                </div>
                <div className="mb-3 form-outline">
                    <input type="email" className="form-control form-control-lg" placeholder="Email" id="email" onChange={(e)=>{
                        setEmail(e.target.value)
                    }} required/>
                </div>
                <div className="mb-3">
                    <input type="password" className="form-control form-control-lg" placeholder="password" id="password" onChange={(e)=>{
                        setPassword(e.target.value)
                    }} required/>
                </div>
                <button type="submit" className="btn btn-dark btn-lg px-5 ">Sign Up</button>
            </form>
        </div>
    </div>
</div>

    )
}

export default CreateAcc;