import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {getProfile} from '../actions/users';
import ProfileViewHive from '../components/hives/profileview-hive';
import ProfileViewPost from '../components/posts/profileview-post';
import Notification from '../components/notifications/notification';
import Conversation from '../components/conversation';
import './profilehome-page.css';

export class ProfileHomePage extends React.Component {
    constructor(props){
        super(props);
        this.viewMain = this.viewMain.bind(this);
        this.viewMessages = this.viewMessages.bind(this);
        this.viewNotifications = this.viewNotifications.bind(this);
        this.state = {
            main: true,
            messages: false,
            notifications: false
        }
    }



    componentDidMount() {
        this.props.dispatch(getProfile());
    }

    viewMain(){
        this.setState({main: true});
        this.setState({messages: false});
        this.setState({notifications: false});
    }

    viewMessages(){
        this.setState({main: false});
        this.setState({messages: true});
        this.setState({notifications: false});
    }

    viewNotifications(){
        this.setState({main: false});
        this.setState({messages: false});
        this.setState({notifications: true});
    }

    render(){

        const notifications = this.props.user.notifications.map((notification, index) => {
            return (
                <Notification notification={notification} key={index}/>
            )
        });

        const conversations = this.props.user.conversations.map((convo, index) => {
            return <Conversation messages={convo.messages} users={convo.users} key={index} convoId={convo._id} user={this.props.user.id}/>
        });

        if(this.state.main === true){
            return (
                <div className="profileHome-page">
                    <button onClick={this.viewMain}>Main</button>
                    <button onClick={this.viewMessages}>Messages</button>
                    <button onClick={this.viewNotifications}>Notifications</button>
                    <p>Wecome back {this.props.user.username}</p>
                    <p>{this.props.user.notifications.length}</p>
                    <Link to="/hives/build">Build a Hive!</Link>
                    <div className="profilehome-content-box">
                        <ProfileViewHive hives={this.props.user.hives}/>
                        <ProfileViewPost posts={this.props.user.posts}/>
                    </div>    
                </div>
            )
        } else if(this.state.messages === true){
            return (
                <div className="profileHome-page">
                    <button onClick={this.viewMain}>Main</button>
                    <button onClick={this.viewMessages}>Messages</button>
                    <button onClick={this.viewNotifications}>Notifications</button>
                    <p>MESSAGES</p>
                    <div className="conversations-container">
                        {conversations}
                    </div>
                </div>
            )
        } else if(this.state.notifications === true){
            return (
                <div className="profileHome-page">
                    <button onClick={this.viewMain}>Main</button>
                    <button onClick={this.viewMessages}>Messages</button>
                    <button onClick={this.viewNotifications}>Notifications</button>
                    <p>NOTIFICATIONS</p>
                    <div className="profilehome-page-notifications-container">
                        {notifications}    
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        user: state.userProfile,
        browse: state.hives
    };
};

export default connect(mapStateToProps)(ProfileHomePage);