import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {viewHiveByTitle} from '../actions/hives';
import QuickViewPost from '../components/posts/quickview-post';
import slugify from 'slugify';

export class ViewHivePage extends React.Component {

    componentDidMount(){
        window.scrollTo(0, 0);
        this.props.dispatch(viewHiveByTitle(this.props.match.params.title))
    }

    render(){
        const hive = this.props.view.hive;
        const posts = this.props.view.posts.map((post, index) => {
           return <QuickViewPost id={post._id} key={index} title={post.title} author={post.author} hive={post.hive.title} comments={post.comments.length} tags={post.tags} />
        });

        return (
            <div className="viewHive">
                <h2>{hive.title}</h2>
                <h3>{hive.mission}</h3>
                <Link to={`/posts/create/${hive.id}`}>Create Post</Link>
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