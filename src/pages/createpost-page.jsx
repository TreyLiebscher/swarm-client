import React from 'react';
import {connect} from 'react-redux';
import {withRouter, Redirect, Link} from 'react-router-dom';
import {getProfile} from '../actions/users';
import slugify from 'slugify';

import CreatePostForm from '../components/forms/createPost-form';

export class CreatePostPage extends React.Component {
    componentDidMount(){
        this.props.dispatch(getProfile())
    }

    render(){

        if(this.props.loggedIn === false){
            return (
                <div>
                    <p>Login to create posts</p>
                    <Link to="/login">Login</Link>
                </div>
            )
        }

        else {
            return (
                <div>
                    <CreatePostForm hive={this.props.match.params.id} currentPost={this.props.post.post.post}/>
                </div>
            )
        }
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    user: state.userProfile,
    post: state.createPost
});

export default withRouter(connect(mapStateToProps)(CreatePostPage));