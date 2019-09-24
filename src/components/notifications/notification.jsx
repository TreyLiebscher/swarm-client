import React from 'react';
import QuickViewPost from '../posts/quickview-post';
import {Link, withRouter} from 'react-router-dom';
import slugify from 'slugify';
import './notifications.css';

export class Notification extends React.Component {




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
                    <div className="notification-info">
                        <Link to={`/posts/view/${this.props.notification.post}/${urlTitleShorten(urlTitle)}`} className="notification-link">{this.props.notification.message} <span className="notification-post-title">{this.props.notification.postTitle}</span></Link>
                    </div>               
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
                    <div className="notification-info">
                        <Link to={`/posts/view/${this.props.notification.post}/${urlTitleShorten(urlTitle)}`} className="notification-link">{this.props.notification.message} <span className="notification-post-title">{this.props.notification.postTitle}</span></Link>               
                    </div>
                    <div className="notification-info content">
                        <p>{this.props.notification.comment.body}</p>
                    </div>
                </div>
            )
        }    
    }
}

export default withRouter(Notification);