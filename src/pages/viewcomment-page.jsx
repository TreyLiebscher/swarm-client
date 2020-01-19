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

    const displayBackButton = () => {
        // If post was deleted, but comment still exists in form of notification
        // a quick fix, one that will not be necessary once all delete methods
        // are properly built out (TODO)
        if(this.props.comment.post._id !== null){
            return <button className="back-button" onClick={this.goBack}>⇦</button>
        }
    }
        return (
            <div className="viewcomment-page-container">
                {displayBackButton()}
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