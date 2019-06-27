import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import slugify from 'slugify';
import './quickview-hive.css';

export class QuickViewHive extends React.Component {

    render(){

        return (
            <div className="quickview-hive" id={this.props.id}>
                <Link className="quickview-hive-link" to={`/hives/view/${slugify(this.props.title)}`}>
                    <div className="quickview-hive-icon-container">
                        <p className="quickview-hive-icon">&#x2b21;</p>
                        <h3>{this.props.title}</h3>
                    </div>

                    <p>{this.props.mission}</p>
                    <p>Members: {this.props.members}</p>
                    <p>Posts: {this.props.posts}</p>
                </Link>
            </div>
        )
    }
}

export default withRouter(QuickViewHive);