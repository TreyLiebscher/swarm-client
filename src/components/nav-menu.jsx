import React, { useState } from 'react';
import {connect} from 'react-redux';
import {Link, Redirect, withRouter} from 'react-router-dom';
import {clearAuth} from '../actions/auth';
import {getProfile} from '../actions/users';
import {clearAuthToken} from '../local-storage';
import './nav-menu.css';

export function NavMenu(props){
    const [active, setActive] = useState(false);

    function logOut(){
        props.dispatch(clearAuth());
        clearAuthToken();
        setActive(false);
        // <Redirect to="/" />
    }



    const button_manager = () => {
        if(props.loggedIn){
            return (
                <ul className="navmenu-list">
                    <li className="navmenu-item"><button onClick={() => logOut()}>Log Out</button></li>                    
                    <li className="navmenu-item">About</li>
                    <li className="navmenu-item" onClick={() => setActive(false)}><Link to="/users/profile/home" className="navmenu-link">Your Profile</Link></li>
                </ul>
            )
        } else {
            return (
                <ul className="navmenu-list">
                    <li className="navmenu-item" onClick={() => setActive(false)}><Link to="/login" className="navmenu-link">Login</Link></li>
                    <li className="navmenu-item" onClick={() => setActive(false)}><Link to="/signup" className="navmenu-link">Signup</Link></li>                    
                    <li className="navmenu-item">About</li>
                </ul>
            )     
        }
    }

    if(active === false){
        return (
            <div className="navmenu">
                <div className="navmenu-button" onClick={() => setActive(true)}>Menu</div>
            </div>
        )
    } else {
        return (
            <div className="navmenu">
                <div className="navmenu-button" onClick={() => setActive(false)}>Close</div>
                    {button_manager()}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    user: state.userProfile
    // loading: state.auth.loading
});

export default withRouter(connect(mapStateToProps)(NavMenu));