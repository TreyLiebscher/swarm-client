import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import Conversation from '../components/conversation';
import {getProfile} from '../actions/users';
import './profilehome-page.css';

export class MessagesPage extends React.Component {

    componentDidMount(){
        console.log('KIWI MessagesPage has mounted');
        this.props.dispatch(getProfile());
    }

    render(){

        const conversations = this.props.user.conversations.map((convo, index) => {
            return <Conversation messages={convo.messages} users={convo.users} key={index} convoId={convo._id} user={this.props.user.id}/>
        });


        return (
            <div className="messages-page-container">
                <div className="profileHome-control-box">
                    <button className="profileHome-control"><Link className="messages-page-button-link" to="/users/profile/home">Main</Link></button>
                    <button className="profileHome-control middle"><Link className="messages-page-button-link" to="/users/inbox">Messages</Link></button>
                    <button className="profileHome-control">Notifications ({this.props.user.notifications.length})</button>
                </div>
                <p>MESSAGES PAGE</p>
                <div className="conversations-container">
                {conversations}
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        user: state.userProfile
    }
}

export default connect(mapStateToProps)(MessagesPage);