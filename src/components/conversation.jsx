import React from 'react';
import SendMessageForm from '../components/forms/message-form';
import {connect} from 'react-redux';
import './conversation.css'

export default class Conversation extends React.Component {




    render(){
        const messages = this.props.messages.map((message, index) => {
            if(message.user === this.props.user){
                return <p className="user-message">{message.body}</p>
            } else {
                return <p className="receiver-message">{message.body}</p>
            }

        });
        let receiver;
        const users = this.props.users.map((user) => {
            if(user._id === this.props.user){
                return <p>You</p>
            } else {
                receiver = user._id
                return <p>{user.username}</p>
            }
        })

        return (
            <div className="conversation-container">
                <div className="conversation-people">
                    <p>Conversation with</p>
                    {users}
                </div>
                {messages}
                <SendMessageForm 
                    sender={this.props.user}
                    receiver={receiver}
                    conversation={this.props.convoId}
                />
            </div>
        )
    }
}