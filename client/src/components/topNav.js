import React from 'react';
import * as actions from '../actions/index';
import { connect } from 'react-redux';
import store from '../store';


export class TopNav extends React.Component {
	constructor(props) {
    	super(props)
	    this.updateUserInDatabase = this.updateUserInDatabase.bind(this);
        this.startOver = this.startOver.bind(this);
        this.toggleDashboard = this.toggleDashboard.bind(this);
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

    render () {

        let userName = this.props.name;

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

        <nav className="navbar navbar-inverse navbar-fixed-top">
            <div className="container">
                <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                    <a className="navbar-brand" href="#">World Traveler</a>
                    <a className="navbar-brand title_message" href="#">Hey {userName.slice(0, userName.indexOf(" "))}!</a>
                </div>
                <div id="navbar" className="navbar-collapse collapse">
                    <form className="navbar-form navbar-right">
                        <button className="btn btn-success"   ><a  onClick={this.toggleDashboard} >Dashboard</a></button>  
                        <button  className="btn btn-success"><a onClick={this.updateUserInDatabase} href={`/api/auth/logout`}>Sign out</a></button>
                    </form>
                </div>
            </div>
        </nav>
  );
}}


const mapStateToProps = (state, props) => ({
    _id: state._id,
    googleId: state.googleId,
    accessToken: state.accessToken,
    questionHistory: state.questionHistory,
    email: state.email,
    name: state.name,
    answerHistory: state.answerHistory,
    sessionHistory: state.sessionHistory,
    progress: state.progress,
    selectedLanguage: state.selectedLanguage,

});

export default connect(mapStateToProps)(TopNav);





