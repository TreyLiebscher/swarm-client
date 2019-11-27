import React from 'react';
import { Link } from 'react-router-dom';
import CommentRater from '../comments/comment-rater';
import CommentRatings from './comment-ratings';
import Reply from '../comments/reply';
import FormatDate from '../../helpers/date-format';
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
            this.setState({reply_form_visible: false});
            this.setState({rater_visible: false});
        } else {
            this.setState({replies: false});
            this.setState({reply_form_visible: false});
            this.setState({rater_visible: false});
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

        const date = FormatDate(this.props.comment.createdAt);

        const replies = this.props.comment.replies.map((reply, index) => {
            return <Reply key={index} reply={reply}/>
        });

        const displayOriginalPoster = () => {
            if(this.props.comment.author === this.props.postAuthor){
                return (
                    <div className="viewpost-comment-info">
                        <p className="viewpost-comment-author original">&#x2b21; {this.props.comment.author} </p>
                        <CommentRatings ratings={ratings()} length={this.props.comment.ratings.length}/>
                    </div>
                )
            } else {
                return (
                    <div className="viewpost-comment-info">
                        <p className="viewpost-comment-author">&#x2b21; {this.props.comment.author} </p>
                        <CommentRatings ratings={ratings()} length={this.props.comment.ratings.length}/>
                    </div>
                )
            }
        }

        const displayRepliesButton = () => {
            if(this.props.comment.replies.length !== 0){
                return <button className="comment-reply-display-button" onClick={this.showReplies}>View Replies ({this.props.comment.replies.length})</button>
            }
        }

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
                return <button className="comment-reply-display-button" onClick={this.showRater}>RATE</button>
            }
        }

        if(this.state.replies === false && this.state.rater_visible === false && this.state.reply_form_visible === false){
            return (
                <li className="comment-container">
                    <div className="comment-date-container">
                        <p className="comment-date">{date}</p>
                    </div>
                    {displayOriginalPoster()}
                    <p className="viewpost-comment-body">{this.props.comment.body}</p>
                    <div className="comment-control-box">
                        {raterDisplayButton()}
                        <button className="comment-reply-display-button"><Link className="comment-reply-link" to={`/posts/comments/${this.props.comment._id}`}>Reply</Link></button>
                        {displayRepliesButton()}
                    </div>
                    <div className="comment-control-container">
                    </div>
                    
                </li>
            )
        }
        else if(this.state.rater_visible === true) {
                return (
                    <li className="comment-container">
                        <div className="comment-date-container">
                            <p className="comment-date">{date}</p>
                        </div>
                        {displayOriginalPoster()}
                        <p className="viewpost-comment-body">{this.props.comment.body}</p>
                        <div className="comment-control-box">
                            <button className="comment-reply-display-button" onClick={this.showRater}>CANCEL</button>
                            <button className="comment-reply-display-button"><Link className="comment-reply-link" to={`/posts/comments/${this.props.comment._id}`}>Reply</Link></button>
                            {displayRepliesButton()}
                        </div>
                        <div className="comment-control-container">
                            {commentRaterDisplay()}
                        </div>
                    </li>
                )
        }

        else {
            return (
                <li className="comment-container">
                    <div className="comment-date-container">
                        <p className="comment-date">{date}</p>
                    </div>
                    {displayOriginalPoster()}
                    <p className="viewpost-comment-body">{this.props.comment.body}</p>
                    <div className="comment-control-box">
                        {raterDisplayButton()}
                        <button className="comment-reply-display-button"><Link className="comment-reply-link" to={`/posts/comments/${this.props.comment._id}`}>Reply</Link></button>
                        <button className="comment-reply-display-button" onClick={this.showReplies}>Hide Replies</button>
                    </div>
                    <div className="comment-control-container">
                    <ul className="comment-reply-container">
                        {replies}
                    </ul>
                    </div>
                </li>
            )
        }
    }
}