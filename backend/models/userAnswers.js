const mongoose = require('mongoose');

const userAnswerSchema = new mongoose.Schema({
    quizOTP : String,
    regNo : String,
    moduleName : String,
    quizName : String,
    questionCount : Number,
    score : Number,
    userAnswers : Object
})

const userAnswersModel = mongoose.model("userAnswers",userAnswerSchema)


module.exports =  userAnswersModel