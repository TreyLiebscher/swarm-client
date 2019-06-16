import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { browsePosts, viewPostById } from '../actions/posts';
import {browseHives} from '../actions/hives';
import QuickViewPost from '../components/posts/quickview-post';
import QuickViewHive from '../components/hives/quickview-hive';
import './home-page.css';

export class HomePage extends React.Component {

    componentDidMount() {
        // this.props.dispatch(browsePosts(1));
        this.props.dispatch(browseHives(1));
    }

    render(){
        // const posts = this.props.browse.posts.map((post, index) => {
        //    return <QuickViewPost id={post.id} key={index} title={post.title} author={post.author} hive={post.hive.title} />
        // });

        const hives = this.props.browse.hives.map((hive, index) => {
            return <QuickViewHive 
                    id={hive.id} 
                    key={index} 
                    title={hive.title} 
                    mission={hive.mission} 
                    members={hive.members} 
                    posts={hive.posts} 
                    />
        });

        return (
            <div className="home-page-container">
                {hives}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        browse: state.hives,
        view: state.post
    };
};

export default connect(mapStateToProps)(HomePage);