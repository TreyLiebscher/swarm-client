import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getProfile} from '../actions/users';
import {viewHiveByTitle} from '../actions/hives';
import './login-page.css';

import UpdateHiveForm from '../components/forms/updateHive-form';

export class EditHivePage extends React.Component {
    componentDidMount(){
        window.scrollTo(0, 0);
        this.props.dispatch(getProfile());
        this.props.dispatch(viewHiveByTitle(this.props.match.params.title));
    }



    render(){
        return (
            <div className="form-container">
                <h2 className="form-title">Edit Hive</h2>
                <UpdateHiveForm currentHive={this.props.currentHive}/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.userProfile,
    currentHive: state.hive
});

export default withRouter(connect(mapStateToProps)(EditHivePage));