import React from 'react';
import {Link, Redirect, withRouter} from 'react-router-dom';
import QuickViewPost from './quickview-post';
import './profileview-post.css';
import slugify from 'slugify';

export class ProfileViewPost extends React.Component {
    constructor(props) {
        super(props);
        this.displayPosts = this.displayPosts.bind(this);
        this.state = {
            visible: false
        }
    }

    displayPosts(){
        if(this.state.visible === false){
            this.setState({visible: true});
        } else {
            this.setState({visible: false});
        }
    }

    render(){

        const posts = this.props.posts.map((post, index) => {
            return <QuickViewPost 
                    id={post._id} 
                    key={index} 
                    title={post.title} 
                    author={post.author} 
                    hive={post.hive.title} 
                    comments={post.comments.length} 
                    tags={post.tags}
                    ratings={post.ratings}
                    body={post.body}  
                    />
         });



        if(this.state.visible === false){
            return (
                <div className="profile-view-post-container" onClick={this.displayPosts}>
                    <p className="profile-view-post-label">POSTS</p>
                </div>
            )
        } else {
            return (
                <div className="profile-view-post-container" onClick={this.displayPosts}>
                    <p className="profile-view-post-label visible">POSTS</p>
                    {posts}
                </div>
            )
        }
    }
}

export default ProfileViewPost;