const mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    googleId: {type: String, required: true},
    accessToken: {type: String, required: true},
    questionHistory: {
        spanish: [{
            question: String,
            answer: String,
            mValue: Number
        }],
        french: [{
            question: String,
            answer: String,
            mValue: Number
        }],
        italian: [{
            question: String,
            answer: String,
            mValue: Number
        }],
        portuguese: [{
            question: String,
            answer: String,
            mValue: Number
        }],
        polish: [{
            question: String,
            answer: String,
            mValue: Number
        }],
        swedish: [{
            question: String,
            answer: String,
            mValue: Number
        }],
        german: [{
            question: String,
            answer: String,
            mValue: Number
        }]
    },
    email: String,
    name: String,
    answerHistory: {
        questions: Number,
        correctAnswers: Number
    }
});


userSchema.methods.apiRepr = function () {
    return {
        id: this._id,      
        googleId: this.googleId,
        accessToken: this.accessToken,
        questionHistory: this.questionHistory,
        email: this.email,
        name: this.name,
        answerHistory: this.answerHistory       
    }
}

var questionSchema = mongoose.Schema({
        spanish: [{
            question: String,
            answer: String,
            mValue: Number
        }],
        french: [{
            question: String,
            answer: String,
            mValue: Number
        }],
        italian: [{
            question: String,
            answer: String,
            mValue: Number
        }],
        portuguese: [{
            question: String,
            answer: String,
            mValue: Number
        }],
        polish: [{
            question: String,
            answer: String,
            mValue: Number
        }],
        swedish: [{
            question: String,
            answer: String,
            mValue: Number
        }],
        german: [{
            question: String,
            answer: String,
            mValue: Number
        }]
    });

questionSchema.methods.apiRepr = function () {
    return {
        spanish: this.spanish,
        french: this.french,
        italian: this.italian,
        portuguese: this.portuguese,
        polish: this.polish,
        swedish: this.swedish,
        german: this.german
    }
}


const Question = mongoose.model('Question', questionSchema)
const User = mongoose.model('User', userSchema);

module.exports = { User, Question }

