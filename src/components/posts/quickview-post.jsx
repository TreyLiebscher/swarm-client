import React from 'react';
import {Link, Redirect, withRouter} from 'react-router-dom';
import slugify from 'slugify';

export class QuickViewPost extends React.Component {



    render(){
        let urlTitle = slugify(this.props.title);
        const urlTitleShorten = (urlTitle) => {
            if(urlTitle.length >= 25){
                urlTitle = urlTitle.slice(0, 25);
            }
            return urlTitle;
        }
        let tags = this.props.tags.map((tag, index) => <li key={index}>{tag}</li>)
        return (
            <div className="quickview-post" id={this.props.id}>
                <Link to={`/posts/view/${this.props.id}/${urlTitleShorten(urlTitle)}`}><h3>{this.props.title}</h3></Link>
                <p>{this.props.hive}</p>
                <p>{this.props.author}</p>
                <ul>{tags}</ul>
                <p>Comments: {this.props.comments}</p>
            </div>
        )
    }
}

export default withRouter(QuickViewPost);

