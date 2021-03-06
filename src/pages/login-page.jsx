import React from 'react';
import {connect} from 'react-redux';
import {Redirect, withRouter} from 'react-router-dom';
import './login-page.css'

import LogInForm from '../components/forms/login-form';

export function LogInPage(props) {
    if (props.loggedIn) {
        return <Redirect to="/users/profile/home" />;
    }

    // const demoLogin = () => {
    //     return props.dispatch(login('GuestUser', '1234567890'))
    // }

    return (
        <div className="form-container">
            <h2 className="form-title">Log in to Swarmer</h2>
            <LogInForm />
            {/* <p>Don't have an account? <Link to="/signup" className="form-link">Signup</Link> is free!</p> */}
            {/* <button onClick={demoLogin} className="login-button demo">Demo</button> */}
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    loading: state.auth.loading
});

export default withRouter(connect(mapStateToProps)(LogInPage));