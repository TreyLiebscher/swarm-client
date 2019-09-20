import React from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import './login-page.css';
import SignupForm from '../components/forms/signup-form';

// import './signupPage.css';

export function SignupPage(props) {
    // if (props.loggedIn) {
    //     return <Redirect to="/profile/home" />;
    // }

    // const demoLogin = () => {
    //     return props.dispatch(login('GuestUser', '1234567890'))
    // }

    return (
        <div className="form-container">
            <h2 className="form-title">Signup for Swarmer</h2>
            <SignupForm />
            <p className="redirect-message">Already have an account? <Link to="/login" className="form-link">Login</Link></p>
            {/* <button onClick={demoLogin} className="login-button demo">Demo</button> */}
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default withRouter(connect(mapStateToProps)(SignupPage));