import React from 'react';
import {Link, Redirect, withRouter} from 'react-router-dom';
import slugify from 'slugify';

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
                <Link to={`hives/view/${slugify(this.props.title)}`}><h3>{this.props.title}</h3></Link>
                <p>{this.props.mission}</p>
                <p>{this.props.members}</p>
                <p>{this.props.posts}</p>            
            </div>
        )
    }
}

export default withRouter(QuickViewHive);