import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {viewPostById, postComments} from '../actions/posts';
import CreateCommentForm from '../components/forms/createComment-form';
import Comment from '../components/posts/comment';
import PostRater from '../components/posts/post-rater';
import { getProfile } from '../actions/users';
import slugify from 'slugify';
import Ratings from '../components/posts/ratings';
import './viewpost-page.css';
import FormatDate from '../helpers/date-format';

export class ViewPostPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.nextComments = this.nextComments.bind(this);
        this.state = {
            page: 1
        }
    }

    componentDidMount(){
        window.scrollTo(0, 0);
        this.props.dispatch(viewPostById(this.props.match.params.id))
        .then((res) => {
            if(this.props.loggedIn === true){
                this.props.dispatch(getProfile());
            }
        });
    }

    nextComments(){
        if((this.props.view.totalComments / 5) > this.state.page){
            this.setState({page: this.state.page + 1});
            return this.props.dispatch(postComments(this.props.match.params.id, this.state.page + 1))
        }
    }

    render(){
        const post = this.props.view;

        const date = FormatDate(this.props.view.createdAt);

        const userId = () => {
            if(this.props.auth === null){
                return;
            } else {
                return this.props.auth.id;
            }
        }

        const comments = this.props.comments.map((comment, index) => {
            return <Comment key={index} comment={comment} post={post} postAuthor={post.author} user={userId()}/>
        });

        const link = () => {
            if(post.link){
                return <a href={post.link} target="_blank" rel="noopener noreferrer">{post.link}</a>
            }
        }

        const postRaterDisplay = () => {
            if(!(this.props.view.raters.includes(this.props.user.id))){
                return <PostRater post={post.id}/>
            }
        }

        const ratings = () => {
            if(this.props.view.ratings.length !== 0){
                return Math.round(this.props.view.ratings.reduce((a, b) => a + b) / this.props.view.ratings.length)
            }
        }

        const moreCommentDisplayButton = () => {
            if((this.props.view.totalComments / 5) > this.state.page){
                return <button className="viewpost-more-button" onClick={this.nextComments}>More</button>
            }
        }
        return (
            <div className="viewpost">
                <Link className="viewpost-hive-link" to={`/hives/view/${slugify(post.hive_title)}`}><p>&#x2b21; {post.hive_title}</p></Link>
                <h2>{post.title}</h2>
                <p>By: <Link className="quickview-post-author-link" to={`/users/${post.author}`}><span className="viewpost-author">&#x2b21; {post.author}</span></Link></p>
                <p className="viewpost-date">{date}</p>
                <Ratings ratings={ratings()} length={this.props.view.ratings.length}/>
                <br />
                {link()}
                <p className="viewpost-body">{post.body}</p>
                {postRaterDisplay()}
                <CreateCommentForm post={post}/>
                <ul className="viewpost-comment-container">{comments}</ul>
                {moreCommentDisplayButton()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.auth.currentUser !== null,
        view: state.post,
        comments: state.post.comments,
        user: state.userProfile,
        auth: state.auth.currentUser
    };
};

export default connect(mapStateToProps)(ViewPostPage);