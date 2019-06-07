import React from 'react';
import {Link, Redirect, withRouter} from 'react-router-dom';

export class QuickViewPost extends React.Component {



    render(){
        let image;
        // let tags = this.props.tags.map((tag) => {<p>{tag}</p>})
        return (
            <div className="quickview-post" id={this.props.id}>
                <Link to={`posts/view/${this.props.id}`}><h3>{this.props.title}</h3></Link>
                <p>{this.props.hive}</p>
                <p>{this.props.author}</p>
            </div>
        )
    }
}

export default withRouter(QuickViewPost);

