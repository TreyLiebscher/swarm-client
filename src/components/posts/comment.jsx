import React from 'react';
import CommentReplyForm from '../forms/commentReply-form';

export default class Comment extends React.Component {
    constructor(props){
        super(props);
        this.showReplies = this.showReplies.bind(this);
        this.state = {
            replies: false
        }
    }

    showReplies(){
        if(this.state.replies === false){
            this.setState({replies: true});
        } else {
            this.setState({replies: false})
        }
    }

    render(){

        const replies = this.props.comment.replies.map((reply, index) => {
            return <li key={index}>
                        <p className="viewpost-comment-author"><i>{reply.author} says:</i></p>
                        <p className="viewpost-comment-body">{reply.body}</p>
                    </li>
        })

        if(this.state.replies === false){
            return (
                <li >
                    <p className="viewpost-comment-author"><i>{this.props.comment.author} says:</i></p>
                    <p className="viewpost-comment-body">{this.props.comment.body}</p>
                    <CommentReplyForm comment={this.props.comment} />
                    <button onClick={this.showReplies}>View Replies ({this.props.comment.replies.length})</button>
                </li>
            )
        }
        else {
            return (
                <li >
                    <p className="viewpost-comment-author"><i>{this.props.comment.author} says:</i></p>
                    <p className="viewpost-comment-body">{this.props.comment.body}</p>
                    <CommentReplyForm comment={this.props.comment} />
                    <button onClick={this.showReplies}>Hide Replies ({this.props.comment.replies.length})</button>
                    <ul>
                        {replies}
                    </ul>
                </li>
            )
        }
    }
}