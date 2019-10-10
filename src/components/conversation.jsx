import React from 'react';
import SendMessageForm from '../components/forms/message-form';
import {connect} from 'react-redux';
import './conversation.css'

export default class Conversation extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false
        }
        this.displayMessages = this.displayMessages.bind(this);
    }

    displayMessages(){
        if(this.state.visible === false){
            this.setState({visible: true})
        }
        else {
            this.setState({visible: false})            
        }
    }



    render(){
        const messages = this.props.messages.map((message, index) => {
            if(message.user === this.props.user){
                return <p className="user-message" key={index}>{message.body}</p>
            } else {
                return <p className="receiver-message" key={index}>{message.body}</p>
            }

        });
        let receiver;
        const users = this.props.users.map((user, index) => {
            if(user._id === this.props.user){
                return;
            } else {
                receiver = user._id
                return <p key={index}>{user.username}</p>
            }
        })

        if(this.state.visible === true){
            return (
                <div className="conversation-container">
                    <div className="conversation-people" onClick={this.displayMessages}>
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
        else {
            return (
                <div className="conversation-container">
                    <div className="conversation-people" onClick={this.displayMessages}>
                        {users}
                    </div>
                </div>
            )
        }
    }
}