import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import './conversation.css'

export class Conversation extends React.Component {
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
        const findReceiver = this.props.users.map((user) => {
            let receiver;
            if(user._id !== this.props.user){
                receiver = user.username;
            }
            return receiver;
        });

        return (
            <Link to={`/messages/${this.props.convoId}`}>{findReceiver}</Link>
        )
    }
}

export default withRouter(Conversation);