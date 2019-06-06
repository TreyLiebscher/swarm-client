import React, { useState } from 'react';
import './nav-menu.css';

export function NavMenu(){
    const [active, setActive] = useState(false);

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
                <ul className="navmenu-list">
                    <li className="navmenu-item">Log In</li>
                    <li className="navmenu-item">Sign Up</li>
                    <li className="navmenu-item">About</li>
                    <li className="navmenu-item">Your Profile</li>
                    <li className="navmenu-item">Log Out</li>
                </ul>
            </div>
        )
    }
}

export default NavMenu;