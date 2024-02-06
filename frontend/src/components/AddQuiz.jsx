import React, { useState } from "react";
import NavBarTwo from "./NavBarTwo";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddQuiz(){

    

    const [problems, setproblems] = useState([
        { id: 1, correctAnswer: "", question: "", answer1: "", answer2: "", answer3: "", answer4: "" }
      ]);

    const [quizName,setquizName] = useState();
    const [moduleName,setModuleName] = useState();
    const navigate = useNavigate()



  function sendData(e){
    e.preventDefault();

    const newQuiz = {
        quizName,
        moduleName,
        moduleOwner: localStorage.getItem("regNo"),
        quizStatus: "Ended",
        attempts: 0,
        problems,
        otp:""
    }

    axios.post('http://localhost:8070/newQuiz',newQuiz)
    .then((result)=>{    
    console.log(result);
    }).catch((err)=>{
        console.log(err);
    })

    navigate("/AdminDashboard")
  }


      const addQuestion = () => {
        setproblems(prevQuestions => [
          ...prevQuestions,
          { id: prevQuestions.length + 1, correctAnswer: "", question: "", answer1: "", answer2: "", answer3: "", answer4: "" }
        ]);
      };
    
      const handleInputChange = (questionId, field, value) => {
        setproblems(prevQuestions =>
          prevQuestions.map(q =>
            q.id === questionId ? { ...q, [field]: value } : q
          )
        );
      };


    return(
<div>
    <NavBarTwo />
        <div class="con-box">
        
    <br/>
    
    <div class="container addQuizCont">
        <form onSubmit={sendData}>
            <div class="mb-3">
                <label htmlFor="inputQuizName" class="form-label" ><b>Quiz Name</b></label>
                <input type="text" class="form-control" id="Quiz-name" onChange={(e)=>{
                        setquizName(e.target.value)
                    }} required/>
            </div>
            <div class="mb-3">
                <label htmlFor="inputModuleName" class="form-label"><b>Module Name</b></label>
                <input type="text" class="form-control" id="Module-name" onChange={(e)=>{
                        setModuleName(e.target.value)
                    }} required/>
            </div>
            <br/>

<div className="scroll">

            {problems.map(question => (
              <div key={question.id}>
                <div className="mb-3">
                  <label htmlFor={`inputQustion${question.id}`} className="form-label">
                    <b>Q. {question.id}</b>
                  </label>
                  <br />
                  <label htmlFor={`inputQuizName${question.id}`} className="form-label">
                    <b>Question</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id={`Quiz-name${question.id}`}
                    value={question.question}
                    onChange={(e) => handleInputChange(question.id, "question", e.target.value)}
                  required />
                  <br />
                  <div class="row">
                            <div class="col-md-6">
                                <label htmlFor="answer-A" class="form-label"><b>A.</b></label>
                                <input type="text" class="form-control" id="mcqAnswer-A"
                                onChange={(e) => handleInputChange(question.id, "answer1", e.target.value)}
                                required/>
                            </div>
                            <div class="col-md-6">
                                <label htmlFor="answer-B" class="form-label"><b>B.</b></label>
                                <input type="text" class="form-control" id="mcqAnswer-B"
                                onChange={(e) => handleInputChange(question.id, "answer2", e.target.value)}
                                required/>
                                
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <label htmlFor="answer-C" class="form-label"><b>C.</b></label>
                                <input type="text" class="form-control" id="mcqAnswer-C"
                                onChange={(e) => handleInputChange(question.id, "answer3", e.target.value)}
                                required/>
                            </div>
                            <div class="col-md-6">
                                <label htmlFor="answer-D" class="form-label"><b>D.</b></label>
                                <input type="text" class="form-control" id="mcqAnswer-D"
                                onChange={(e) => handleInputChange(question.id, "answer4", e.target.value)}
                                required/>
                            </div>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <label class="input-group-text" htmlFor="inputGroupSelect01">Correct Answer</label>
                        <select class="form-select" id="inputGroupSelect01" onChange={(e) => handleInputChange(question.id, "correctAnswer", e.target.value)} >
                        <option selected disabled>Choose...</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                        </select>
                    </div>
                </div>
    ))}
    </div>  
        <div class="d-flex justify-content-end">
            <button class="btn btn-primary small-btn" type="button" onClick={addQuestion}><b>+</b></button>
            <button class="btn btn-primary small-btn" type="submit" ><b>Save</b></button>
        </div>
        </form>
    </div>
    </div>
    </div>
    )

}

export default AddQuiz;