import React from 'react';
import { connect } from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import {clearNotification} from '../../actions/users'
import slugify from 'slugify';
import './notifications.css';

export class Notification extends React.Component {

    constructor(props){
        super(props);
        this.handleClearNotification = this.handleClearNotification.bind(this);
    }

    handleClearNotification(){
        console.log(this.props.notification)
        this.props.dispatch(clearNotification(this.props.user, this.props.notification))
    }


    render(){
        if(this.props.notification.type === 'NewComment'){
            let urlTitle = slugify(this.props.notification.postTitle);
            const urlTitleShorten = (urlTitle) => {
                if(urlTitle.length >= 25){
                    urlTitle = urlTitle.slice(0, 25);
                }
                return urlTitle;
            }
            return (
                <div className="notification-container">
                    <button className="notification-clear-button" onClick={this.handleClearNotification}>
                        <div className="notification-info">
                            <Link to={`/posts/view/${this.props.notification.post}/${urlTitleShorten(urlTitle)}`} className="notification-link">{this.props.notification.message} <span className="notification-post-title">{this.props.notification.postTitle}</span></Link>
                        </div>
                    </button>               
                    <div className="notification-info content">
                        <p>{this.props.notification.comment.body}</p>
                    </div>
                </div>
            )
        }
        else if(this.props.notification.type === 'NewReply'){
            let urlTitle = slugify(this.props.notification.postTitle);
            const urlTitleShorten = (urlTitle) => {
                if(urlTitle.length >= 25){
                    urlTitle = urlTitle.slice(0, 25);
                }
                return urlTitle;
            }
            return (
                <div className="notification-container">
                    <button className="notification-clear-button" onClick={this.handleClearNotification}>
                        <div className="notification-info">
                            <Link to={`/posts/view/${this.props.notification.post}/${urlTitleShorten(urlTitle)}`} className="notification-link">{this.props.notification.message} <span className="notification-post-title">{this.props.notification.postTitle}</span></Link>               
                        </div>
                    </button>
                    <div className="notification-info content">
                        <p>{this.props.notification.comment.body}</p>
                    </div>
                    <button onClick={this.handleClearNotification}>clear</button>
                </div>
            )
        }    
    }
}

const mapStateToProps = state => {
    return {
        user: state.userProfile
    };
};

export default connect(mapStateToProps)(withRouter(Notification));
