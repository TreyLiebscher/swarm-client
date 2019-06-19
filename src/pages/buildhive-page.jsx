import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getProfile} from '../actions/users';

import BuildHiveForm from '../components/forms/buildHive-form';

export class BuildHivePage extends React.Component {
    componentDidMount(){
        this.props.dispatch(getProfile())
    }

    render(){
        return (
            <div>
                <p>Build a New Hive</p>
                <BuildHiveForm currentHive={this.props.currentHive}/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.userProfile,
    currentHive: state.buildHive
});

export default withRouter(connect(mapStateToProps)(BuildHivePage));