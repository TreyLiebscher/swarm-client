import React from 'react';
import './navbar.css';
import NavMenu from './nav-menu';
import {connect} from 'react-redux';
import {Link, Redirect, withRouter} from 'react-router-dom';

export class NavBar extends React.Component {

    render(){
        return (
            <div className="navbar">
                <h1 className="title">
                    <span className="s1 logo">S</span><span className="s2 logo">W</span><span className="s3 logo">A</span><span className="s4 logo">R</span><span className="s5 logo">M</span><span className="s6 logo">E</span><span className="s7 logo">R</span>
                </h1>
                <NavMenu props={this.props}/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    // loading: state.auth.loading
});

export default withRouter(connect(mapStateToProps)(NavBar));