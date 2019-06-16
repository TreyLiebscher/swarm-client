import React from 'react';
import {connect} from 'react-redux';
import {withRouter, Redirect} from 'react-router-dom';
import {getProfile} from '../actions/users';
import slugify from 'slugify';

import BuildHiveForm from '../components/forms/buildHive-form';

export class BuildHivePage extends React.Component {
    componentDidMount(){
        this.props.dispatch(getProfile())
    }

    render(){

        if(this.props.currentHive.title != ""){
            return <Redirect to={`view/${slugify(this.props.currentHive.title)}`} />
        }
        return (
            <div>
                <p>Build a New Hive</p>
                <BuildHiveForm />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.userProfile,
    currentHive: state.buildHive
});

export default withRouter(connect(mapStateToProps)(BuildHivePage));