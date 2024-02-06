import React, { useEffect, useState } from "react";
import NavBarTwo from "./NavBarTwo";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();
  const [uName, setUname] = useState();
  const[dashData,setDashData] = useState();
  


  function UpdateQuizStatus (value,selectedOTP){
    axios
    .patch("http://localhost:8070/quizStatusUpdate",{statusQuiz : value, quizOTP:selectedOTP})
    .then((updateStatus) => {
      console.log(updateStatus);
    })
    .catch((err) => {
      console.error(err);
    });

    }

  useEffect(() => {

    if(localStorage.getItem("status") !== "true")
      return  navigate("/Login");

    axios
      .post("http://localhost:8070/dashboard", { registerNo : localStorage.getItem("regNo") })
      .then((result) => {
        setUname(result.data.uName);
      })
      .catch((err) => {
        console.error(err);
      });

    axios
      .post("http://localhost:8070/adminDashboard",{registerNo : localStorage.getItem("regNo")})
      .then((quizDetails) => {
        setDashData(quizDetails.data);
        console.log(dashData)
      })
      .catch((err) => {
        console.error(err);
      });
      
  },[dashData]);

  
   if(uName === undefined || dashData === undefined ) return "loading...";

    return (
      <div>
        <NavBarTwo />

        <div className="container">
          <br />
          <br />
          <br />
          <h2>Welcome {uName}!</h2>
          <br />
          <br />
          <br />

          <h3>Quizes</h3>
          <br /><br/>
          <div class="d-grid gap-2 -flex justify-content-md-end">
            <Link to="/AddQuiz" class="btn btn-primary me-md-2" type="button" id="addQuizButton"><b>+ Add Quiz</b></Link>
          </div>



          { dashData.length === 0 ? <p className="fs-3 d-flex justify-content-center noRecodes align-items-center">No recodes Found</p> : 

          <table className="table table-hover " id="addQuizTable">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Quiz Name</th>
              <th scope="col">OTP</th>
              <th scope="col">Module Name</th>
              <th scope="col">Attempts Count</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
            
            
          <tbody>
          {dashData.map((mark, index) =>
           (
              <tr key={index}>
                <th scope="row">{index+1}</th>
                <td>{mark.quizName}</td>
                <td>{mark.otp}</td>
                <td>{mark.moduleName}</td>
                <td>{mark.attempts}</td>
                <td>{mark.quizStatus}</td>
                <td><button class="btn btn-primary " type="button" id="buttonStart"  onClick={()=>UpdateQuizStatus("Started",mark.otp) }>Start</button></td>
                <td><button class="btn btn-primary " type="button" id="buttonEnd"  onClick={()=>UpdateQuizStatus("Ended",mark.otp)}>End</button></td>
              </tr>
            ))}
          </tbody>
          </table>
            }
        </div>
      </div>
    );
  
}

export default Dashboard;
