import React, { useState } from 'react';
import './nav-menu.css';

// export class NavMenu extends React.Component {
//     constructor(props) {
//         super(props);
//         this.toggleMenu = this.toggleMenu.bind(this);
//         this.state = {
//             visible: false
//         };
//     }

//     toggleMenu(){
//         const {visible} = this.state;
//         if(visible === false){
//             this.setState({visible: true});
//         } else {
//             this.setState({visible: false});
//         }
//     }

//     render(){
//         const {visible} = this.state; 
//         if(visible === false){
//             console.log('The Menu is hidden');
//             return (
//                 <div className="navmenu" onClick={this.toggleMenu}>Hi</div>
//             )
//         } else {
//             console.log('The Menu is visible');
//             return (
//                 <div className="navmenu" onClick={this.toggleMenu}>HELLLO</div>
//             )
//         }
//     }
// }

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