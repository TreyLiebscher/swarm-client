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
                        <h3 className="quickview-hive-title">{this.props.title}</h3>
                    </div>
                    <p className="quickview-hive-mission">{this.props.mission}</p>
                    <div className="quickview-hive-info-container">
                        <p className="quickview-hive-info"><span className="white">{this.props.members}</span> members</p>
                        <p className="quickview-hive-info"><span className="white">{this.props.posts}</span> posts</p>
                    </div>
                    {/* <p className="member-count">{this.props.members}</p> */}
                </Link>
            </div>
        )
    }
}

export default withRouter(QuickViewHive);