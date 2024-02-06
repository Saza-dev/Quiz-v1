const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const userModel = require('./models/User')
const quizModel = require('./models/Quiz')
const userAnswersModel = require('./models/userAnswers')

const app=express();
app.use(express.json())
app.use(cors())


mongoose.connect("mongodb://127.0.0.1:27017/quizDB")


app.post('/CreateAcc',(req,res)=>{
    userModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.post('/newQuiz', async (req,res)=>{
    let newQuiz = new quizModel(req.body);

    const fetchOTP = async () => {
        const count = await quizModel.find({})
        newQuiz.otp = count.length+1;        
    }
    await fetchOTP();

    quizModel.create(newQuiz)
    .then(users => res.json(users))
    .catch(err => res.json(err))

})



app.post('/Login',(req,res)=>{
    const{regNo,password} = req.body;
    userModel.findOne({regNo:regNo })
    .then(user => {
        if(user){
            if(user.password === password){
                res.json("Success")
            } else {
                res.json("Password is Wrong")
            }
        } else {
            res.json("No recode existed")
        }
    })
})


app.post('/dashboard',(req,res)=>{
    const{registerNo} = req.body;
    userModel.findOne({regNo:registerNo })
    .then(user => {
        res.json(user)
    })
})

app.post('/adminDashboard',(req,res)=>{
    const{registerNo} = req.body;
    quizModel.find({moduleOwner:registerNo })
    .then(user => {
        res.json(user)
    })
    
})


app.post('/dashMarks', (req, res) => {
    const {registerNo} = req.body;
    userAnswersModel.find({regNo:registerNo})

    .then(quiz => {
        if (quiz) {
            res.json(quiz);
        } else {
            res.json("No record found for the given OTP");
        }
    })
    .catch(err => {
        console.error(err);
        res.status(500).json("Internal Server Error");
    });
});



app.post("/quiz", (req,res) => {
    const {otpNum} = req.body;

    quizModel.findOne({otp:otpNum})

    .then(quiz => {
        if (quiz) {
            res.json(quiz);
        } else {
            res.json("No record found for the given OTP");
        }
    })
    .catch(err => {
        console.error(err);
        res.status(500).json("Internal Server Error");
    });



})

app.post("/quizAnswers",(req,res) => {
    userAnswersModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.post("/quizResult",(req,res) => {
    const {otpNum,registerNo} = req.body;
    userAnswersModel.findOne({quizOTP:otpNum,regNo:registerNo})

    .then(quiz => {
        if (quiz) {
            res.json(quiz);
        } else {
            res.json("No record found for the given OTP");
        }
    })
    .catch(err => {
        console.error(err);
        res.status(500).json("Internal Server Error");
    });
})


app.patch('/quizStatusUpdate',(req,res)=>{
    const {quizOTP,statusQuiz}=(req.body)
    quizModel.updateOne({otp:quizOTP},{quizStatus:statusQuiz})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.patch('/updateAttempts',(req,res)=>{
    const{otpNum} = (req.body)
    quizModel.findOne({otp:otpNum})
        .then(c => {
            const updatedAttempts = c.attempts + 1;
            quizModel.updateOne({otp:otpNum},{attempts:updatedAttempts})
            .then(() => {
                res.send('Attempts updated successfully');
            })
        })
    
})


app.listen(8070,()=>{
    console.log("Server is running")
})
