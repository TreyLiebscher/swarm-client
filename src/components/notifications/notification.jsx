import React from 'react';
import QuickViewPost from '../posts/quickview-post';
import {Link, withRouter} from 'react-router-dom';
import slugify from 'slugify';

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
            console.log(this.props.notification.comment)
            return (
                <div className="notification-container">
                    <p>{this.props.notification.message} <Link to={`/posts/view/${this.props.notification.post}/${urlTitleShorten(urlTitle)}`}>{this.props.notification.postTitle}</Link></p>               
                    <div>
                        <p>{this.props.notification.comment.body}</p>
                    </div>
                </div>
            )
        }    
    }
}

export default withRouter(Notification);