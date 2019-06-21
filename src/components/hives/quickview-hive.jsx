import React from 'react';
import {Link, Redirect, withRouter} from 'react-router-dom';
import slugify from 'slugify';
import './quickview-hive.css';

export class QuickViewHive extends React.Component {

    render(){
        // let urlTitle = slugify(this.props.title);
        // const urlTitleShorten = (urlTitle) => {
        //     if(urlTitle.length >= 25){
        //         urlTitle = urlTitle.slice(0, 25);
        //     }
        //     return urlTitle;
        // }

        return (
            <div className="quickview-hive" id={this.props.id}>
                <Link className="quickView-hive-link" to={`/hives/view/${slugify(this.props.title)}`}>
                    <h3>{this.props.title}</h3>
                    <p>{this.props.mission}</p>
                    <p>Members: {this.props.members}</p>
                    <p>Posts: {this.props.posts}</p>
                </Link>
            </div>
        )
    }
}

export default withRouter(QuickViewHive);