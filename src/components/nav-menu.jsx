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

    if(active === false){
        return (
            <div className="navmenu">
                <div className="navmenu-button" onClick={() => setActive(true)}>{name_manager()}</div>
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
    user: state.auth.currentUser
});

export default withRouter(connect(mapStateToProps)(NavMenu));