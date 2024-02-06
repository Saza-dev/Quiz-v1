import React, { useEffect, useState } from "react";
import NavBar from "./NavBarOne";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Quiz() {
  const [questions, setQuestions] = useState();
  const [modName, setModName] = useState();
  const [quizName, setQuizName] = useState();
  const [quizNum, setQuizNum] = useState(0);
  const [isConditionMet, setConditionMet] = useState(false);
  const [isButtonVisible, setButtonVisibility] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isFinished, setIsFinished] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});
  const [quizStatus,setQuizStatus] = useState();
  
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post("http://localhost:8070/quiz", {
        otpNum: parseInt(localStorage.getItem("otp")),
      })
      .then((result) => {
        setQuestions(result.data.problems);
        setModName(result.data.moduleName);
        setQuizName(result.data.quizName);
        setQuizStatus(result.data.quizStatus)
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);



  useEffect(() => {

    if (isFinished) {
      let correctAnswers = -1
      for (let i=0;i<=questions.length;i++){
        if (userAnswers[i] === answers[i] ){
          correctAnswers++
      }
    }

      const userQuizDetails = {
        quizOTP : localStorage.getItem("otp"),
        regNo : localStorage.getItem("regNo"),
        moduleName : modName,
        quizName : quizName,
        questionCount : questions.length,
        score : correctAnswers,
        userAnswers : userAnswers
      }

      axios.post('http://localhost:8070/quizAnswers',userQuizDetails)
      .then((result)=>{    
      console.log(result);
      }).catch((err)=>{
          console.log(err);
      })

      axios.patch('http://localhost:8070/updateAttempts',{otpNum: parseInt(localStorage.getItem("otp"))})
      
      

      navigate("/QuizResult")
    }
  }, [isFinished]);

  if (questions === undefined) return "loading...";

  const answers = {};

  questions.forEach((question, index) => {
    answers[index + 1] = question.correctAnswer;
  });


  function getRadioAnswers(event) {
    setSelectedAnswer(event.target.value);
  }

  function updateUserAnswer() {
    setUserAnswers((prevAnswers) => (
      { ...prevAnswers, 
        [quizNum + 1]: selectedAnswer }
        ));
  }

if (quizStatus === "Ended") return "Not Available yet...."

  return (
    <div>
      <div className="quizBody">
        <NavBar />

        <main className="container-fluid">
          <div className="left-side">
            <div className="quizNumber container text-center d-flex justify-content-center">
              <div className="col-3">
                <div className="col">
                  <ul>
                    {questions.map((quiz, index) => (
                      <li style={index === quizNum ? { backgroundColor: "#3F51B5" } : {}} key={index}>
                        <button style={index === quizNum ? {color: "white" } : {}} key={index}>{index + 1}</button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="Module-name container text-center d-flex justify-content-center">
              <div className="col-3">
                <div className="row">
                  <label>
                    <h5>
                      <u>Module Name</u>
                    </h5>
                  </label>
                </div>
                <br />
                <div className="row">
                  <label>
                    <h6>{modName}</h6>
                  </label>
                </div>
              </div>
            </div>
            <div className="Quiz-name container text-center d-flex justify-content-center">
              <div className="col-3">
                <div className="col">
                  <label>
                    <h5>
                      <u>Quiz Name</u>
                    </h5>
                  </label>
                </div>
                <br />
                <div className="row">
                  <label>
                    <h6>{quizName}</h6>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="right-side">
            <div className="quizContent">
              <br />
              <h3>Question {quizNum + 1}</h3>

              <br />
              <div className="question">
                <h4>{questions[quizNum].question}</h4>
              </div>

              <div className="form-check" key={quizNum + 1}>
                <div className="MCQ-1">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                    value="A"
                    onChange={getRadioAnswers}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault1"
                  >
                    <h5>A. </h5>
                  </label>
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault1"
                  >
                    <h5>{questions[quizNum].answer1}</h5>
                  </label>
                </div>
                <div className="MCQ-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                    value="B"
                    onChange={getRadioAnswers}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault2"
                  >
                    <h5>B. </h5>
                  </label>
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault2"
                  >
                    <h5>{questions[quizNum].answer2}</h5>
                  </label>
                </div>
                <div className="MCQ-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault3"
                    value="C"
                    onChange={getRadioAnswers}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault3"
                  >
                    <h5>C. </h5>
                  </label>
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault3"
                  >
                    <h5>{questions[quizNum].answer3}</h5>
                  </label>
                </div>
                <div className="MCQ-4">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault4"
                    value="D"
                    onChange={getRadioAnswers}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault4"
                  >
                    <h5>D. </h5>
                  </label>
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault4"
                  >
                    <h5>{questions[quizNum].answer4}</h5>
                  </label>
                </div>
              </div>
            </div>

            <br />
            <br />
            <br />
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <button
                    className="btn btn-primary"
                    style={{ display: isButtonVisible ? "block" : "none" }}
                    id="previous-btn"
                    type="button"
                    onClick={() => {
                      if (quizNum === 1) {
                        setButtonVisibility(false);
                      }
                      if (quizNum > 0) {
                        setConditionMet(false);
                        setQuizNum(quizNum - 1);
                      }
                    }}
                  >
                    {"<<<"}
                  </button>
                </div>
                <div className="col-md-6 d-flex justify-content-end">
                  <button
                    className="btn btn-primary me-md-2"
                    id="next-btn"
                    type="button"
                    onClick={() => {
                      updateUserAnswer();
                      if (isConditionMet) {
                        setIsFinished(true);
                      } else {
                        if (quizNum !== questions.length - 2) {
                          setButtonVisibility(true);
                          setConditionMet(false);
                          setQuizNum(quizNum + 1);
                        } else {
                          setConditionMet(true);
                          setQuizNum(quizNum + 1);
                        }
                      }
                    }}
                  >
                    {isConditionMet ? "Finish" : ">>>"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Quiz;
