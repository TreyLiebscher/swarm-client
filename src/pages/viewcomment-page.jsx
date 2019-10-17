import React from 'react';
import { connect } from 'react-redux';
import {viewComment} from '../actions/comments';
import Comment from '../components/posts/comment';
import SingleComment from '../components/comments/single-comment';

export class ViewCommentPage extends React.Component {
    constructor(props){
        super(props);
    };

    componentDidMount(){
        window.scrollTo(0, 0);
        this.props.dispatch(viewComment(this.props.match.params.id));
    }

    render(){
        return (
            <div className="viewcomment-page-container">
                <SingleComment comment={this.props.comment} post={this.props.comment.post} user={this.props.user.id}/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth.currentUser,
        comment: state.comment,
        user: state.userProfile
    };
}

export default connect(mapStateToProps)(ViewCommentPage);