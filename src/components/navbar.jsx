import React from 'react';
import './navbar.css';
import NavMenu from './nav-menu';

export class NavBar extends React.Component {

    render(){
        return (
            <div className="navbar">
                <h1 className="title">
                    <span className="s1 logo">S</span><span className="s2 logo">W</span><span className="s3 logo">A</span><span className="s4 logo">R</span><span className="s5 logo">M</span><span className="s6 logo">E</span><span className="s7 logo">R</span>
                </h1>
                <NavMenu />
            </div>
        )
    }
}

export default NavBar;