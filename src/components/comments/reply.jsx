import React from 'react';
import FormatDate from '../../helpers/date-format';

export default class Reply extends React.Component {

    render(){
        return (
            <li className="comment-reply">
                <div className="viewpost-comment-info">
                    <div className="comment-date-container">
                        <p className="comment-date">{FormatDate(this.props.reply.createdAt)}</p>
                    </div>
                    <p className="viewpost-comment-author"><i>{this.props.reply.author}</i></p>                
                </div>
                <p className="viewpost-comment-body">{this.props.reply.body}</p>
            </li>
        )
    }
};