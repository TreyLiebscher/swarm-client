import React from 'react';
import { connect } from 'react-redux';
import {viewPostById} from '../actions/posts';

export class ViewPostPage extends React.Component {

    componentDidMount(){
        return this.props.dispatch(viewPostById(this.props.match.params.id))
    }

    render(){
        const post = this.props.view.post;
        // TODO Hive is being populated during request and wont render, must solve this
        return (
            <div className="viewpost">
                <h2>{post.title}</h2>
                <h3>By: {post.author}</h3>
                <br />
                <p>{post.body}</p>
                <p>Comments: {post.comments}</p>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        view: state.post
    };
};

export default connect(mapStateToProps)(ViewPostPage);