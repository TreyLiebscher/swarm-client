import React, { useState } from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import {clearAuth} from '../actions/auth';
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
                    <li className="navmenu-item" onClick={() => logOut()}>Log Out</li>                    
                    <li className="navmenu-item">About</li>
                    <Link to="/users/profile/home" className="navmenu-link"><li className="navmenu-item" onClick={() => setActive(false)}>Your Profile</li></Link>
                </ul>
            )
        } else {
            return (
                <ul className="navmenu-list">
                    <Link to="/login" className="navmenu-link"><li className="navmenu-item" onClick={() => setActive(false)}>Login</li></Link>
                    <Link to="/signup" className="navmenu-link"><li className="navmenu-item" onClick={() => setActive(false)}>Signup</li></Link>                    
                    <li className="navmenu-item">About</li>
                </ul>
            )     
        }
    }

    const name_manager = () => {
        if(props.loggedIn){
            return `${props.user.username}`
        } else {
            return 'Menu'
        }
    }

    const notificationManager = () => {

        if(props.loggedIn && props.user.notifications.length !== 0){
            return <div className="navmenu-notification-count"><p className="navmenu-notification-text">{props.user.notifications.length}</p></div>            
        }
    }

    if(active === false){
        return (
            <div className="navmenu">
                <div className="navmenu-button" onClick={() => setActive(true)}>&#x2b21;</div>
                {notificationManager()}
            </div>
        )
    } else {
        return (
            <div className="navmenu">
                <div className="navmenu-button" onClick={() => setActive(false)}>&#x2b21;</div>
                    {notificationManager()}
                    {button_manager()}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    user: state.auth.currentUser
});

export default withRouter(connect(mapStateToProps)(NavMenu));