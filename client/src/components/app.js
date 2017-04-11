import React from 'react';
import * as Cookies from 'js-cookie';

import QuestionPage from './question-page';
import LoginPage from './login-page';
import TopNav from './topNav';
import AnswerInput from './answer-input';
import Dashboard from './dashboard';
import { connect } from 'react-redux';
import store from '../store';


// travel words for different languages
// additional resources
// progress dashboard
// pronunciation
// choose language dashboard

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null
        };
    }

    componentDidMount() {
        const accessToken = Cookies.get('accessToken');
        if (accessToken) {
            fetch(`/api/me`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }).then(res => {
                if (!res.ok) {
                    if (res.status !== 401) {
                        // Unauthorized, clear the cookie and go to
                        // the login page
                        Cookies.remove('accessToken');
                        return;
                    }
                    throw new Error(res.statusText);
                }
                return res.json();
            }).then(currentUser =>
                this.setState({
                    currentUser
                })
            );
        }
    }

    render() {
        if (!this.state.currentUser) {
            return <LoginPage />;
        }

        console.log('PROPS TOGGLE DASH ', this.props.toggleDashboard)        

        if (this.props.toggleDashboard % 2 === 0) {
            console.log(this.props.toggleDashboard)
            console.log('render userSelection')
            return (
                <div>
                    <Dashboard />
                </div>
            )

        } else {

        console.log('render questions')
        return (

            <div>
                <div className="parent">
                <QuestionPage />
                </div>
            </div>
        )
    }}
}



const mapStateToProps = (state, props) => ({
    toggleDashboard: state.toggleDashboard,
    selectedLanguage: state.selectedLanguage
});


export default connect(mapStateToProps)(App)
