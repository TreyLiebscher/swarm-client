import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {getPublicProfile} from '../actions/users';
import ProfileViewHive from '../components/hives/profileview-hive';
import ProfileViewPost from '../components/posts/profileview-post';
import SendMessageForm from '../components/forms/message-form';

export class PublicProfilePage extends React.Component {
    
    componentDidMount() {
        this.props.dispatch(getPublicProfile(this.props.match.params.user));
    }

    render(){


        return (
            <div className="profileHome-page">
                <p>{this.props.user.username}</p>
                <SendMessageForm 
                    sender={this.props.auth.currentUser}
                    receiver={this.props.user.id}
                />
                <div className="profilehome-content-box">
                    <ProfileViewHive hives={this.props.user.hives}/>
                    <ProfileViewPost posts={this.props.user.posts}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        user: state.userProfile,
        browse: state.hives
    };
};

export default connect(mapStateToProps)(PublicProfilePage);