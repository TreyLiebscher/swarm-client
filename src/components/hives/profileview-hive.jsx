import React from 'react';
import QuickViewHive from './quickview-hive';
import './profileview-hive.css';

export class ProfileViewHive extends React.Component {
    constructor(props) {
        super(props);
        this.displayHives = this.displayHives.bind(this);
        this.state = {
            visible: false
        }
    }

    displayHives(){
        if(this.state.visible === false){
            this.setState({visible: true});
        } else {
            this.setState({visible: false});
        }
    }

    render(){

        const hives = this.props.hives.map((hive, index) => {
            return <QuickViewHive 
            id={hive.id} 
            key={index} 
            title={hive.title} 
            mission={hive.mission} 
            members={hive.members.length} 
            posts={hive.posts.length} 
            />
        })

        if(this.state.visible === false){
            return (
                <div className="profile-view-hive-container" onClick={this.displayHives}>
                    <p className="profile-view-hive-label">HIVES</p>
                </div>
            )
        } else {
            return (
                <div className="profile-view-hive-container" onClick={this.displayHives}>
                    <p className="profile-view-hive-label visible">HIVES</p>
                    {hives}
                </div>
            )
        }
    }
}

export default ProfileViewHive;