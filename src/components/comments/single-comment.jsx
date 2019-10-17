import React from 'react';
import CommentReplyForm from '../forms/commentReply-form';
import Ratings from '../posts/ratings';
import FormatDate from '../../helpers/date-format';
import '../posts/comment.css';

export default class SingleComment extends React.Component {
    constructor(props){
        super(props);
        this.showReplies = this.showReplies.bind(this);
        this.state = {
            replies: false
        }
    }

    showReplies(){
        // const element = document.getElementById('comment-replies')
        
        if(this.state.replies === false){
            this.setState({replies: true})
        } else {
            this.setState({replies: false});
        }
    }


    render(){

        const date = FormatDate(this.props.comment.createdAt);

        const replies = this.props.comment.replies.map((reply, index) => {
            return  <li className="comment-reply" key={index}>
                        <p className="viewpost-comment-author"><i>{reply.author} says:</i></p>
                        <p className="viewpost-comment-body">{reply.body}</p>
                    </li>
        });

        const displayOriginalPoster = () => {
            if(this.props.comment.author === this.props.postAuthor){
                return (
                    <div className="viewpost-comment-info">
                        <p className="viewpost-comment-author original">&#x2b21; {this.props.comment.author} - </p>
                        <p className="viewpost-comment-date">- {date}</p>
                    </div>
                )
            } else {
                return (
                    <div className="viewpost-comment-info">
                        <p className="viewpost-comment-author">&#x2b21; {this.props.comment.author} - </p>
                        <p className="viewpost-comment-date">- {date}</p>
                    </div>
                )
            }
        }

        const displayRepliesButton = () => {
            if(this.props.comment.replies.length !== 0 && this.state.replies === false){
                return <button className="comment-reply-display-button" onClick={this.showReplies}>View Replies ({this.props.comment.replies.length})</button>
            }
            else if(this.props.comment.replies.length !== 0 && this.state.replies === true){
                return <button className="comment-reply-display-button" onClick={this.showReplies}>Hide Replies</button>
            }
        }

        const ratings = () => {
            if(this.props.comment.ratings.length !== 0){
                return Math.round(this.props.comment.ratings.reduce((a, b) => a + b) / this.props.comment.ratings.length)
            }
        }

        if(this.state.replies === true){
            return (
                <div className="comment-container">
                    {displayOriginalPoster()}
                    <Ratings ratings={ratings()} length={this.props.comment.ratings.length}/>
                    <p className="viewpost-comment-body">{this.props.comment.body}</p>
                    <div className="comment-control-box">
                        {displayRepliesButton()}
                    </div>
                    <div className="comment-control-container">
                        <ul className="comment-reply-container" id="comment-replies">
                            {replies}
                        </ul>
                        <CommentReplyForm comment={this.props.comment} post={this.props.post}/>
                    </div>
                    
                </div>
            )
        }
        else  {
            return (
                <div className="comment-container">
                    {displayOriginalPoster()}
                    <Ratings ratings={ratings()} length={this.props.comment.ratings.length}/>
                    <p className="viewpost-comment-body">{this.props.comment.body}</p>
                    <div className="comment-control-box">
                        {displayRepliesButton()}
                    </div>
                    <div className="comment-control-container">
                        <ul className="comment-reply-container" id="comment-replies">
                        </ul>
                        <CommentReplyForm comment={this.props.comment} post={this.props.post}/>
                    </div>
                </div>
            )
    }
    }
}