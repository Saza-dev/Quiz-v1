import React,{useEffect, useState} from 'react'
import axios from 'axios'
import NavBarOne from './NavBarOne';
import NavBarTwo from './NavBarTwo';
import { Link } from 'react-router-dom';


function QuizResult(){

    const[details,setDetails]= useState()

    useEffect(()=>{
    axios
      .post("http://localhost:8070/quizResult", {registerNo : localStorage.getItem("regNo"),otpNum:localStorage.getItem("otp")})
      .then((result) => {
        setDetails(result.data);
        console.log(result.data)
      })
      .catch((err) => {
        console.error(err);
      });
    },[])




    const isStatusTrue = localStorage.getItem("status") === "true";

    if(details=== undefined) return "loading...";
    console.log(details)
return(
    <div>
        {isStatusTrue ? <NavBarTwo />:<NavBarOne /> }

        <div id="finishText">
            <h2><b>Quiz Is Finished.</b></h2>
        </div>

    <div class="container text-center" id="resultCenter">
        <div class="resultItems ">
            <p class="fs-4"><b>Module Name :</b>  {details.moduleName}</p>
            <br/>
            <p class="fs-4"><b>Quiz Name : </b>  {details.quizName}</p>
            <br/>
            <p class="fs-4"><b>Question Count : </b>  {details.questionCount}</p>
            <br/>
            <p class="fs-4"><b>Correct Answer Count : </b>  {details.score}</p>
            <br/>
            <p class="fs-4"><b>Marks : </b>  {(details.score/details.questionCount)*100}%</p>
            <br/>
        {isStatusTrue ? (
            <div className="d-grid gap-2 justify-content-md-end">
              <Link to="/UserDashboard" className="btn btn-primary me-md-2" type="button"><b>Dashboard</b></Link>
            </div>
          ) : (
            <div className="d-grid gap-2 justify-content-md-end">
              <Link to="/" className="btn btn-primary me-md-2" type="button"><b>Home</b></Link>
            </div>
          )}
            
        </div>
    </div>

    </div>
)



}

export default QuizResult;