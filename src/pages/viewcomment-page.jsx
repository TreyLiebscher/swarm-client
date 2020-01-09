import React from 'react';
import { connect } from 'react-redux';
import {viewComment} from '../actions/comments';
import SingleComment from '../components/comments/single-comment';
import './viewcomment-page.css';

export class ViewCommentPage extends React.Component {

    constructor(props){
        super(props);
        this.goBack = this.goBack.bind(this);
    }

    componentDidMount(){
        window.scrollTo(0, 0);
        this.props.dispatch(viewComment(this.props.match.params.id));
    }

    goBack(){
        this.props.history.push(`/posts/view/${this.props.comment.post._id}/${this.props.comment.post.title}`)
    }

    render(){
        return (
            <div className="viewcomment-page-container">
                <button className="back-button" onClick={this.goBack}>⇦</button>
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