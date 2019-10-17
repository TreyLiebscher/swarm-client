import React from 'react';
import { connect } from 'react-redux';
import { getConversation } from '../actions/users';
import SendMessageForm from '../components/forms/message-form';
import './conversation-page.css';

export class ConversationPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            visible: true
        }
    }

    componentDidMount(){
        this.props.dispatch(getConversation(this.props.match.params.id))
    }

    render(){
        
        const findReceiver = () => {
            let receiver;
            for(let i = 0; i < this.props.conversation.users.length; i++){
                if(this.props.conversation.users[i]._id !== this.props.user.id){
                    receiver = this.props.conversation.users[i]._id;
                }
            }
            return receiver;
        }


        const findReceiverName = this.props.conversation.users.map((user) => {
            let receiverName;
            if(user._id !== this.props.user.id){
                receiverName = user.username;
            }
            return receiverName;
        });

        const messages = this.props.conversation.messages.map((message, index) => {

            if(message.user === this.props.user.id){
                return (
                    <div key={index} className="message-sender">
                        <p className="message-body">{message.body}</p>
                    </div>
                )  

            } else {
                return (
                    <div key={index} className="message-receiver">
                        <p className="message-body">{message.body}</p>
                    </div>
                )  
            }
        })

        return (
            <div className="conversation-page">
                <div className="receiver-nameplate">
                    <p className="receiver-name">{findReceiverName}</p>
                </div>
                <div className="message-container">
                    {messages}
                </div>
                <SendMessageForm 
                        sender={this.props.user}
                        receiver={findReceiver()}
                        conversation={this.props.conversation.id}
                    />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        conversation: state.conversation,
        user: state.auth.currentUser
    };
};

export default connect(mapStateToProps)(ConversationPage);

