import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {getProfile} from '../actions/users';
import ProfileViewHive from '../components/hives/profileview-hive';
import ProfileViewPost from '../components/posts/profileview-post';
import Notification from '../components/notifications/notification';
import './profilehome-page.css';

export class ProfileHomePage extends React.Component {
    
    componentDidMount() {
        this.props.dispatch(getProfile());
    }

    render(){

        const notifications = this.props.user.notifications.map((notification, index) => {
            return (
                <Notification notification={notification} key={index} user={this.props.user.id}/>
            )
        })

        return (
            <div className="profileHome-page">
                <p>Wecome back {this.props.user.username}</p>
                <p>{this.props.user.notifications.length}</p>
                <Link to="/hives/build">Build a Hive!</Link>
                <div className="profilehome-content-box">
                    <ProfileViewHive hives={this.props.user.hives}/>
                    <ProfileViewPost posts={this.props.user.posts}/>
                </div>
                <div className="profilehome-page-notifications-container">
                    {notifications}    
                </div>    
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.userProfile,
        browse: state.hives
    };
};

export default connect(mapStateToProps)(ProfileHomePage);