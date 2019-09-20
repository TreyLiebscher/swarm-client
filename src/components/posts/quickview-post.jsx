import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import Ratings from './ratings';
import slugify from 'slugify';
import FormatDate from '../../helpers/date-format';
import './quickview-post.css';

export class QuickViewPost extends React.Component {



    render(){
        let urlTitle = slugify(this.props.title);
        const urlTitleShorten = (urlTitle) => {
            if(urlTitle.length >= 25){
                urlTitle = urlTitle.slice(0, 25);
            }
            return urlTitle;
        }

        const date = FormatDate(this.props.createdAt);

        const ratings = () => {
            if(this.props.ratings.length !== 0){
                return Math.round(this.props.ratings.reduce((a, b) => a + b) / this.props.ratings.length)
            }
        }
        let tags = this.props.tags.map((tag, index) => <li key={index} className="quickview-post-tag">{tag}</li>);
        const bodyPreview = this.props.body.substring(0, 50);
        return (
            <div className="quickview-post" id={this.props.id}>
                <Link className="quickview-post-link" to={`/posts/view/${this.props.id}/${urlTitleShorten(urlTitle)}`}>
                <h3 className="quickview-post-title">{this.props.title}</h3>
                <p className="quickview-post-author">Posted by <span className="white">&#x2b21; {this.props.author}</span> at</p>
                <p className="quickview-post-date">{date}</p>
                <Ratings ratings={ratings()} length={this.props.ratings.length}/>
                <p className="quickview-post-bodypreview"><i>{bodyPreview}...</i></p>
                <ul className="quickview-post-tags-container">{tags}</ul>
                <p className="quickview-post-comments">({this.props.comments} comments)</p>
                </Link>
            </div>
        )
    }
}

export default withRouter(QuickViewPost);

