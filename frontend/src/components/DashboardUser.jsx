import React, { useEffect, useState } from "react";
import NavBarTwo from "./NavBarTwo";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();
  const [uName, setUname] = useState();
  const [dashMarks, setDashMarks] = useState();

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
      .post("http://localhost:8070/dashMarks", {registerNo : localStorage.getItem("regNo")  })
      .then((result) => {
        setDashMarks(result.data);
      })
      .catch((err) => {
        console.error(err);
      });

  },[]);


  
   if(uName === undefined || dashMarks === undefined) return "loading...";



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

          <h3>Your recent Attempts</h3>
          <br />

          { dashMarks.length === 0 ? <p className="fs-3 d-flex justify-content-center noRecodes align-items-center">No recodes Found</p> : 

          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Quiz Name</th>
                <th scope="col">Marks</th>
                <th scope="col">Module Name</th>
                <th scope="col"></th>
              </tr>
            </thead>
            
            
            <tbody>

             

            {dashMarks.map((mark, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{mark.quizName}</td>
                <td>{(mark.score/mark.questionCount)*100}%</td>
                <td>{mark.moduleName}</td>
                <td>
                  <button className="btn btn-success">View quiz</button>
                </td>
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
