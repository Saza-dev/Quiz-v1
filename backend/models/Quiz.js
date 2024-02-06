const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    otp : Number,
    quizName : String,
    moduleName : String,
    moduleOwner: String,
    quizStatus: String,
    attempts: Number,
    problems:[
        {
        id:Number,
        question: String,
        answer1: String,
        answer2: String,
        answer3: String,
        answer4: String,
        correctAnswer: String
        }
    ]

})

const quizModel = mongoose.model("quizes", quizSchema);

module.exports = quizModel;

