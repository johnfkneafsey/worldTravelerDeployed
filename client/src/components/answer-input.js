import React from 'react';
import * as actions from '../actions/index';
import { connect } from 'react-redux';
import store from '../store';

export class AnswerInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        previousAnswer : "",
        feedback: ""
    }
    this.submitAnswer = this.submitAnswer.bind(this);
  }

  submitAnswer(e) {
    e.preventDefault();
    let questionDatabase = this.props.questionHistory;
    let language = this.props.selectedLanguage;
    let currentAnswer;
    let bottomLanguage;
    if (this.props.languageFlipper % 2 === 0) { 
      currentAnswer = questionDatabase[language][0]['answer'];
    } else {
      currentAnswer = questionDatabase[language][0]['question'];
    }   
    let userGuess = (this.refs.userGuess).value.toLowerCase();

    this.props.dispatch(actions.previousAnswer(currentAnswer));
    this.props.dispatch(actions.incrementQuestionCount());
    if (userGuess === currentAnswer) {
      this.props.dispatch(actions.feedback("That's correct, the answer was: "))
      this.props.dispatch(actions.incrementCorrectCount());
    } else {
      this.props.dispatch(actions.feedback("That's incorrect, the answer was: "))
    }
    this.props.dispatch(actions.submitUserAnswerToAlgo(this.props.questionHistory[language], userGuess, language, this.props.languageFlipper))
    this.refs.userGuess.value = "";
}

  render() {
    let language = this.props.selectedLanguage;

    let bottomLanguage;
    if (this.props.languageFlipper % 2 === 0) { 
      bottomLanguage = this.props.selectedLanguage.toUpperCase();
    } else {
      bottomLanguage = "English"
    }

    let currentSessionQuestionCount = this.props.sessionHistory.questions;
    let currentSessionCorrectCount = this.props.sessionHistory.correctAnswers;

    let lifetimeQuestionCount = this.props.answerHistory.questions;
    let lifetimeCorrectCount = this.props.answerHistory.correctAnswers;

    let sectionTotal = 80;

    let percentageValue = {
        german: this.props.progress.german / sectionTotal * 100,
        portuguese: this.props.progress.portuguese / sectionTotal * 100,
        polish: this.props.progress.polish / sectionTotal * 100,
        spanish: this.props.progress.spanish / sectionTotal * 100,
        swedish: this.props.progress.swedish / sectionTotal * 100,
        italian: this.props.progress.italian / sectionTotal * 100,
        french: this.props.progress.french / sectionTotal * 100        
    }

    String.prototype.toProperCase = function () {
          return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    };

    let progressBarStyle = {
      "width": percentageValue[language] + "%",
      "minWidth": "10px"
    }
    console.log('PERCENTAE VAL LANG' ,percentageValue[language])

    return (

      <div>
        <div className="col-lg-6">
          <h4>...in {bottomLanguage.toProperCase()}?</h4>
        </div>

        <div className="col-lg-6">
          <p>{this.props.feedback}</p>
          <p className="yellowText">{this.props.previousAnswer}</p>
        </div>
        <div className="col-lg-6">
          <div className="form-style-4">
            <form onSubmit={this.submitAnswer}>
              <input type="text" placeholder="Enter an answer" ref="userGuess" className="textInput" />
              <br></br>
              <button className="btn flipButton">Submit</button>
            </form>
          </div>
        </div>
        <div className="col-lg-6">
          <h4>Progress</h4>
          <div className="progress transparentProgress">
            <div className="progress-bar yellowBar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={progressBarStyle} >
            {percentageValue[language]}%
            </div>
          </div>


        </div>
      </div>  
      
          /*<div className="progress">
            <div className="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style={{width: `${percentageValue.language}%`}} >
              {percentageValue.language}%
            </div>
          </div>*/

    );
  }
}

const mapStateToProps = (state, props) => ({
    _id: state._id,
    googleId: state.googleId,
    accessToken: state.accessToken,
    questionHistory: state.questionHistory,
    email: state.email,
    name: state.name,
    answerHistory: state.answerHistory,
    feedback: state.feedback,
    previousAnswer: state.previousAnswer,
    selectedLanguage: state.selectedLanguage,
    languageFlipper: state.languageFlipper,
    sessionHistory: state.sessionHistory,
    answerHistory: state.answerHistory,
    progress: state.progress
});

export default connect(mapStateToProps)(AnswerInput);




      