import React from 'react';
import { connect } from 'react-redux';
import {viewHiveByTitle} from '../actions/hives';
import QuickViewPost from '../components/posts/quickview-post';

export class ViewHivePage extends React.Component {

    componentDidMount(){
        this.props.dispatch(viewHiveByTitle(this.props.match.params.title))
    }

    render(){
        const hive = this.props.view.hive;
        const posts = this.props.view.posts.map((post, index) => {
           return <QuickViewPost id={post._id} key={index} title={post.title} author={post.author} hive={post.hive.title} />
        });

        return (
            <div className="viewHive">
                <h2>{hive.title}</h2>
                <h3>{hive.mission}</h3>
                {posts}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        view: state.hive
    };
};

export default connect(mapStateToProps)(ViewHivePage);