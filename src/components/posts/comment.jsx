import React from 'react';
import CommentReplyForm from '../forms/commentReply-form';
import CommentRater from '../comments/comment-rater';
import Ratings from '../posts/ratings';
import './comment.css';

export default class Comment extends React.Component {
    constructor(props){
        super(props);
        this.showReplies = this.showReplies.bind(this);
        this.showRater = this.showRater.bind(this);
        this.state = {
            replies: false,
            rater_visible: false,
            reply_form_visible: false
        }
    }

    showReplies(){
        if(this.state.replies === false){
            this.setState({replies: true});
        } else {
            this.setState({replies: false})
        }
    }

    showRater(){
        if(this.state.rater_visible === false){
            this.setState({replies: false});
            this.setState({reply_form_visible: false});
            this.setState({rater_visible: true});
        } else {
            this.setState({replies: false});
            this.setState({reply_form_visible: false});
            this.setState({rater_visible: false});
        }
    }

    render(){

        const replies = this.props.comment.replies.map((reply, index) => {
            return <li key={index}>
                        <p className="viewpost-comment-author"><i>{reply.author} says:</i></p>
                        <p className="viewpost-comment-body">{reply.body}</p>
                    </li>
        })

        const ratings = () => {
            if(this.props.comment.ratings.length !== 0){
                return Math.round(this.props.comment.ratings.reduce((a, b) => a + b) / this.props.comment.ratings.length)
            }
        }

        const commentRaterDisplay = () => {
            if(!(this.props.comment.raters.includes(this.props.user))){
                return <CommentRater comment={this.props.comment._id} post={this.props.post}/>
            }
        }

        const raterDisplayButton = () => {
            if(!(this.props.comment.raters.includes(this.props.user))){
                return <button className="comment-reply-display-button" onClick={this.showRater}>RATE ({this.props.comment.replies.length})</button>
            }
        }

        if(this.state.replies === false && this.state.rater_visible === false && this.state.reply_form_visible === false){
            return (
                <li >
                    <p className="viewpost-comment-author"><i>{this.props.comment.author} says:</i></p>
                    <Ratings ratings={ratings()} length={this.props.comment.ratings.length}/>


                    <p className="viewpost-comment-body">{this.props.comment.body}</p>
                    <div className="comment-control-container">
                        {raterDisplayButton()}
                        <CommentReplyForm comment={this.props.comment} />
                        <button className="comment-reply-display-button" onClick={this.showReplies}>View Replies ({this.props.comment.replies.length})</button>
                    </div>
                    
                </li>
            )
        }
        else if(this.state.rater_visible === true) {
                return (
                    <li>
                        <p className="viewpost-comment-author"><i>{this.props.comment.author} says:</i></p>
                        <Ratings ratings={ratings()} length={this.props.comment.ratings.length}/>


                        <p className="viewpost-comment-body">{this.props.comment.body}</p>
                        <div className="comment-control-container">
                            <button className="comment-reply-display-button" onClick={this.showRater}>CANCEL</button>
                            {commentRaterDisplay()}
                        </div>
                    </li>
                )
        }
        else {
            return (
                <li >
                    <p className="viewpost-comment-author"><i>{this.props.comment.author} says:</i></p>
                    <p className="viewpost-comment-body">{this.props.comment.body}</p>
                    
                    <div className="comment-control-container">
                        {commentRaterDisplay()}
                        <CommentReplyForm comment={this.props.comment} />
                        <button className="comment-reply-hide-button" onClick={this.showReplies}>Hide Replies ({this.props.comment.replies.length})</button>
                    </div>
                    <ul>
                        {replies}
                    </ul>
                </li>
            )
        }
    }
}