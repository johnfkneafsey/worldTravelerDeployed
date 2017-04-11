import React from 'react';
import * as Cookies from 'js-cookie';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import Store from '../store';
import AnswerInput from './answer-input';

export class QuestionPage extends React.Component {
    constructor(props) {
        super(props);
        this.onFlipLanguage = this.onFlipLanguage.bind(this);
	    this.updateUserInDatabase = this.updateUserInDatabase.bind(this);
        this.startOver = this.startOver.bind(this);
        this.toggleDashboard = this.toggleDashboard.bind(this);

    }

    onFlipLanguage() {
        this.props.dispatch(actions.flipLanguage());
    }

    updateUserInDatabase() {
        this.props.dispatch(actions.updateUserInDatabase(this.props)) 
    }

    startOver() {
        this.props.dispatch(actions.startOver());
    }

    toggleDashboard () {
        this.props.dispatch(actions.selectedLanguage(null));
        this.props.dispatch(actions.toggleDashboard());
        this.props.dispatch(actions.updateUserInDatabase(this.props))
    }


    render() {
          let questionDatabase = this.props.questionHistory;
          let language = this.props.selectedLanguage;
          let topLanguage;
          let currentQuestion;
          if (this.props.languageFlipper % 2 === 0) { 
            currentQuestion = questionDatabase[language][0]['question'];
            topLanguage = "English";

          } else {
            currentQuestion = questionDatabase[language][0]['answer'];

            topLanguage = language.toUpperCase();
          }

          String.prototype.toProperCase = function () {
                return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
          };


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

        return (

    <div className="container">
      <div className="header clearfix">
        <nav>
          <ul className="nav nav-pills pull-right">
            <li className="rightIcons" role="presentation" ><a onClick={this.toggleDashboard} >Dashboard</a></li>
            <li className="rightIcons" role="presentation"><a onClick={this.updateUserInDatabase} href={`/api/auth/logout`} >Log out</a></li>
          </ul>

          <ul className="nav nav-pills pull-left">
            <li className="rightIcons" role="presentation" ><h3 className="leftIcons">World Traveler </h3></li>
            <img className="img-responsive globeImageQPage" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Globe_icon-white.svg/2000px-Globe_icon-white.svg.png" alt="" />
           
          </ul>
        </nav>

      </div>

      <h4 className="topLanguage" >What is the {topLanguage.toProperCase()} phrase:</h4>
      <div className="jumbotron">
        <h1 className="phrase" >"{currentQuestion}"</h1>
        <div className="col">   
            <a className="btn   flipButton" href="#" role="button" onClick={this.onFlipLanguage}>Flip ↕</a>
        </div>
      </div>


      <div className="row marketing">
        <AnswerInput />
      </div>



    </div>




            
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
    selectedLanguage: state.selectedLanguage,
    languageFlipper: state.languageFlipper,
    progress: state.progress,

});

export default connect(mapStateToProps)(QuestionPage);