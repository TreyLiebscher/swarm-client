import React from 'react';
import { connect } from 'react-redux';
import {viewPostById} from '../actions/posts';
import CreateCommentForm from '../components/forms/createComment-form';
import { getProfile } from '../actions/users';

export class ViewPostPage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount(){
        this.props.dispatch(viewPostById(this.props.match.params.id))
        .then(res => this.props.dispatch(getProfile()))
    }

    render(){
        const post = this.props.view.post;
        const comments = this.props.comments.map((comment, index) => {
            return <li key={index}>
                    <p>{comment.author} says:</p>
                    <p>{comment.body}</p>
                    </li>
        });

        return (
            <div className="viewpost">
                <h2>{post.title}</h2>
                <h3>By: {post.author}</h3>
                <br />
                <p>{post.body}</p>
                <ul>{comments}</ul>
                <CreateCommentForm post={post}/>
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