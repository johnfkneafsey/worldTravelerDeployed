import React from 'react';
import * as Cookies from 'js-cookie';


import { connect } from 'react-redux';
import * as actions from '../actions/index';
import Store from '../store';

export class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    	this.onSubmit = this.onSubmit.bind(this);

    }

    componentDidMount() {
        const accessToken = Cookies.get('accessToken');
        fetch(`/api/questions`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }).then(res => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json();
        }).then(userData => {
            this.props.dispatch(actions.mapUserToStore(userData))
            return "next"
        }).then(next => {
            let questionHistoryObj = this.props.questionHistory;
            
            for (let languages in questionHistoryObj) {
                let mValueTally = 0;
                let mValueMax = 0;
                
                for (let i = 0; i < questionHistoryObj[languages].length; i++) {
                    console.log('TALLYING')
                    mValueTally += questionHistoryObj[languages][i].mValue;
                    mValueMax += 5;
                    console.log('mValueMax', mValueMax)
                    console.log('mValueTally', mValueTally)
                }
                console.log('FINAL M VALUES ', mValueTally, ' OUT OF ' , mValueMax)
                    let flipper = this.props.languageFlipper;
            
                    this.props.dispatch(actions.updateProgress(languages, mValueTally, flipper));
                }
        })
    }
        
    onSubmit(event) {
  		event.preventDefault();
        let language = (this.refs.language).value.trim();
        this.props.dispatch(actions.selectedLanguage(language));
        this.props.dispatch(actions.toggleDashboard());
	}

    render() {

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
        


    <div className="site-wrapper gr__getbootstrap_com">

      <div className="site-wrapper-inner">

        <div className="cover-container">

          <div className="masthead clearfix">
            <div className="inner yellow">
              <h3 className="masthead-brand">Hey {userName.slice(0, userName.indexOf(" "))}!</h3>
              <nav>
                <ul className="nav masthead-nav">
                  <li className="active"><a  onClick={this.updateUserInDatabase} href={`api/auth/logout`}>Log out</a></li>
                </ul>
              </nav>
            </div>
          </div>

          <div className="inner cover">
            <img className="img-responsive globeImageDash" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Globe_icon-white.svg/2000px-Globe_icon-white.svg.png" alt="" />
            <h1 className="cover-heading">World Traveler </h1>
            <p className="lead">Pick a new language or continue learning a previous one.</p>             
                <select placeholder="Language=" name="colour1" id='language' className="colour1 form-group" value={this.value} ref="language" onChange={this.onSubmit}>
                    <option key={0} value="" disabled selected className="center-input-text">Select ↕</option>
                    <option key={1} value="german" className="center-input-text">German</option>
                    <option key={2} value="swedish" className="center-input-text">Swedish</option>
                    <option key={3} value="polish" className="center-input-text">Polish</option>
                    <option key={4} value="portuguese" className="center-input-text">Portuguese</option>
                    <option key={5} value="italian" className="center-input-text">Italian</option>
                    <option key={6} value="french" className="center-input-text">French</option>
                    <option key={7} value="spanish" className="center-input-text">Spanish</option>                                                
                </select>
          <br></br>
          <br></br>
          <br></br>
          <h3>{userName.slice(0, userName.indexOf(" "))}'s Personal Progress</h3>

          <br></br>

          <h5>German</h5>
          <div className="progress transparentProgress dashboardProgress">
            <div className="progress-bar yellowBar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{minWidth: "10px", width: percentageValue.german}} >
            {percentageValue.german}%
            </div>
          </div>

          <h5>Swedish</h5>
          <div className="progress transparentProgress dashboardProgress">
            <div className="progress-bar yellowBar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{minWidth: "10px", width: percentageValue.swedish}} >
            {percentageValue.swedish}%
            </div>
          </div>

          <h5>Polish</h5>
          <div className="progress transparentProgress dashboardProgress">
            <div className="progress-bar yellowBar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{minWidth: "10px", width: percentageValue.polish}} >
            {percentageValue.polish}%
            </div>
          </div>

          <h5>Portuguese</h5>
          <div className="progress transparentProgress dashboardProgress">
            <div className="progress-bar yellowBar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{minWidth: "10px", width: percentageValue.portuguese}} >
            {percentageValue.portuguese}%
            </div>
          </div>

          <h5>Italian</h5>
          <div className="progress transparentProgress dashboardProgress">
            <div className="progress-bar yellowBar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{minWidth: "10px", width: percentageValue.italian}} >
            {percentageValue.italian}%
            </div>
          </div>

          <h5>French</h5>
          <div className="progress transparentProgress dashboardProgress">
            <div className="progress-bar yellowBar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{minWidth: "10px", width: percentageValue.french}} >
            {percentageValue.french}%
            </div>
          </div>

          <h5>Spanish</h5>
          <div className="progress transparentProgress dashboardProgress">
            <div className="progress-bar yellowBar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{minWidth: "10px", width: percentageValue.spanish}} >
            {percentageValue.spanish}%
            </div>
          </div>
            



        </div>
      </div>
    </div>
  </div>


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
        feedback: state.feedback,
        previousAnswer: state.previousAnswer,
        toggleLeaderboard: state.toggleLeaderboard,
        selectedLanguage: state.selectedLanguage,
        languageFlipper: state.languageFlipper,
        progress: state.progress
    });

    export default connect(mapStateToProps)(Dashboard);
