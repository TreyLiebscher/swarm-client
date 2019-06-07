import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { browsePosts, viewPostById } from '../actions/posts';
import QuickViewPost from '../components/posts/quickview-post';

export class HomePage extends React.Component {

    componentDidMount() {
        this.props.dispatch(browsePosts(1));

    }

    render(){
        const posts = this.props.browse.posts.map((post, index) => {
           return <QuickViewPost id={post.id} key={index} title={post.title} author={post.author} hive={post.hive.title} />
        });


        return (
            <div>
                {posts}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        browse: state.posts,
        view: state.post
    };
};

export default connect(mapStateToProps)(HomePage);