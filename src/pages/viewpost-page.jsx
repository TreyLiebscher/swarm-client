import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {viewPostById} from '../actions/posts';
import CreateCommentForm from '../components/forms/createComment-form';
import PostRater from '../components/posts/post-rater';
import { getProfile } from '../actions/users';
import slugify from 'slugify';

export class ViewPostPage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount(){
        this.props.dispatch(viewPostById(this.props.match.params.id))
        .then(res => this.props.dispatch(getProfile()))
    }

    render(){
        const post = this.props.view;
        const comments = this.props.comments.map((comment, index) => {
            return <li key={index}>
                    <p><i>{comment.author} says:</i></p>
                    <p>{comment.body}</p>
                    </li>
        });

        const link = () => {
            if(post.link){
                return <a href={post.link} target="_blank">{post.link}</a>
            }
        }

        const ratings = this.props.ratings.length;
        console.log(this.props.view.link)
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
                <ul>{comments}</ul>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        view: state.post,
        comments: state.post.comments,
        ratings: state.post.ratings,
        user: state.userProfile,

    };
};

export default connect(mapStateToProps)(ViewPostPage);