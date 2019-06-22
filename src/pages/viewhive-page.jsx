import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {viewHiveByTitle, joinHive} from '../actions/hives';
import QuickViewPost from '../components/posts/quickview-post';
import slugify from 'slugify';

export class ViewHivePage extends React.Component {
    constructor(props){
        super(props);
        this.joinHive = this.joinHive.bind(this)
    }


    componentDidMount(){
        this.props.dispatch(viewHiveByTitle(this.props.match.params.title))
    }

    joinHive(){
        return this.props.dispatch(joinHive(this.props.view))
    }


    render(){
        const hive = this.props.view;
        const posts = this.props.view.posts.map((post, index) => {
           return <QuickViewPost id={post._id} key={index} title={post.title} author={post.author} hive={post.hive.title} comments={post.comments.length} tags={post.tags} />
        });
        const members = hive.members.length;

        return (
            <div className="viewHive">
                <h2>{hive.title}</h2>
                <h3>{hive.mission}</h3>
                <p>Members: {members}</p>
                <button onClick={this.joinHive}>Join</button>
                <Link to={`/posts/create/${hive.id}`}>Create Post</Link>
                {posts}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        view: state.hive,
        user: state.userProfile
    };
};

export default connect(mapStateToProps)(ViewHivePage);