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
        this.scrollTop = this.scrollTop.bind(this);
        this.state = {
            main: true,
            messages: false,
            notifications: false
        }
    }



    componentDidMount() {
        this.props.dispatch(getProfile());
    }

    scrollTop(){
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
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
                    <div className="profileHome-control-box">
                        <button className="profileHome-control" onClick={this.viewMain}>Main</button>
                        <button className="profileHome-control middle" onClick={this.viewMessages}>Messages</button>
                        <button className="profileHome-control" onClick={this.viewNotifications}>Notifications ({this.props.user.notifications.length})</button>
                    </div>
                    <div className="profileHome-userInfo-container">
                        <p className="profileHome-userInfo-name">⬡ {this.props.user.username}</p>
                    </div>
                    <div className="profileHome-link-container">
                        <Link to="/hives/build" className="profileHome-link">
                            <div className="profileHome-link-content">
                                + Hive
                            </div>
                        </Link>
                    </div>
                    <div className="profilehome-content-box">
                        <ProfileViewHive hives={this.props.user.hives}/>
                        <ProfileViewPost posts={this.props.user.posts}/>
                    </div>
                    <div className="profileHome-pageTop-button" onClick={this.scrollTop}>
                        <div>▲</div>
                    </div>    
                </div>
            )
        } else if(this.state.messages === true){
            return (
                <div className="profileHome-page">
                    <div className="profileHome-control-box">
                        <button className="profileHome-control" onClick={this.viewMain}>Main</button>
                        <button className="profileHome-control middle" onClick={this.viewMessages}>Messages</button>
                        <button className="profileHome-control" onClick={this.viewNotifications}>Notifications ({this.props.user.notifications.length})</button>
                    </div>
                    <p>MESSAGES</p>
                    <div className="conversations-container">
                        {conversations}
                    </div>
                    <div className="profileHome-pageTop-button" onClick={this.scrollTop}>
                        <div>▲</div>
                    </div>
                </div>
            )
        } else if(this.state.notifications === true){
            return (
                <div className="profileHome-page">
                    <div className="profileHome-control-box">
                        <button className="profileHome-control" onClick={this.viewMain}>Main</button>
                        <button className="profileHome-control middle" onClick={this.viewMessages}>Messages</button>
                        <button className="profileHome-control" onClick={this.viewNotifications}>Notifications ({this.props.user.notifications.length})</button>
                    </div>
                    <p>NOTIFICATIONS</p>
                    <div className="profilehome-page-notifications-container">
                        {notifications}    
                    </div>
                    <div className="profileHome-pageTop-button" onClick={this.scrollTop}>
                        <div>▲</div>
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