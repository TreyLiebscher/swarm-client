import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getProfile} from '../actions/users';
import './login-page.css';

import BuildHiveForm from '../components/forms/buildHive-form';

export class BuildHivePage extends React.Component {
    componentDidMount(){
        this.props.dispatch(getProfile())
    }

    render(){
        return (
            <div className="form-container">
                <h2 className="form-title">Build a new Hive</h2>
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