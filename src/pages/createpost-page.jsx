import React from 'react';
import {connect} from 'react-redux';
import {withRouter, Redirect} from 'react-router-dom';
import {getProfile} from '../actions/users';
import slugify from 'slugify';

import CreatePostForm from '../components/forms/createPost-form';

export class CreatePostPage extends React.Component {
    componentDidMount(){
        this.props.dispatch(getProfile())
    }

    render(){
        return (
            <div>
                <CreatePostForm hive={this.props.match.params.id}/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.userProfile
});

export default withRouter(connect(mapStateToProps)(CreatePostPage));