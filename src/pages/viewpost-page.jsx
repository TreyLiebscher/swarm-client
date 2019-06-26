import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {viewPostById, postComments} from '../actions/posts';
import CreateCommentForm from '../components/forms/createComment-form';
import PostRater from '../components/posts/post-rater';
import { getProfile } from '../actions/users';
import slugify from 'slugify';
import './viewpost-page.css';

export class ViewPostPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.nextComments = this.nextComments.bind(this);
        this.state = {
            page: 1
        }
    }

    componentDidMount(){
        this.props.dispatch(viewPostById(this.props.match.params.id, 1))
        .then(res => this.props.dispatch(getProfile()))
    }

    nextComments(){
        if((this.props.view.totalComments / 5) > this.state.page){
            this.setState({page: this.state.page + 1});
            return this.props.dispatch(postComments(this.props.match.params.id, this.state.page + 1))
        }
    }

    render(){
        const post = this.props.view;
        const comments = this.props.comments.map((comment, index) => {
            return <li key={index}>
                    <p className="viewpost-comment-author"><i>{comment.author} says:</i></p>
                    <p className="viewpost-comment-body">{comment.body}</p>
                    </li>
        });

        const link = () => {
            if(post.link){
                return <a href={post.link} target="_blank">{post.link}</a>
            }
        }
        return (
            <div className="viewpost">
                <Link to={`/hives/view/${slugify(post.hive_title)}`}><p>{post.hive_title}</p></Link>
                <h2>{post.title}</h2>
                <h3>By: {post.author}</h3>
                <p>Ratings: {post.ratings.length}</p>
                <br />
                {link()}
                <p>{post.body}</p>
                <PostRater post={post.id}/>
                <CreateCommentForm post={post}/>
                <ul className="viewpost-comment-container">{comments}</ul>
                <button onClick={this.nextComments}>NEXT</button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        view: state.post,
        comments: state.post.comments,
        user: state.userProfile
    };
};

export default connect(mapStateToProps)(ViewPostPage);