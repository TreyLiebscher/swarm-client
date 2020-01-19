import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getProfile} from '../actions/users';
import {viewHiveByTitle} from '../actions/hives';
import {deleteHive} from '../actions/hives';
import './login-page.css';

export class DeleteHivePage extends React.Component {
    constructor(props){
        super(props);
        this.cancel = this.cancel.bind(this);
        this.delete = this.delete.bind(this);
    }
    
    componentDidMount(){
        window.scrollTo(0, 0);
        this.props.dispatch(getProfile());
        this.props.dispatch(viewHiveByTitle(this.props.match.params.title));
    }

    cancel(){
        this.props.history.push(`/hives/view/${this.props.currentHive.title}`)
    }

    delete(){
        this.props.dispatch(deleteHive(this.props.currentHive));
    }



    render(){
        return (
            <div className="form-container">
                <h2>Are you sure you want to delete {this.props.currentHive.title}?</h2>
                <button onClick={this.cancel}>Cancel</button>
                <button onClick={this.delete}>Delete</button>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.userProfile,
    currentHive: state.hive
});

export default withRouter(connect(mapStateToProps)(DeleteHivePage));