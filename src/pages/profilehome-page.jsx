import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {getProfile} from '../actions/users';

export class ProfileHomePage extends React.Component {

    componentDidMount() {
        this.props.dispatch(getProfile());
    }

    render(){
        return (
            <div>
                <Link to="/hives/build">Build a Hive!</Link>
                <p>your profile here</p>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.userProfile
    };
};

export default connect(mapStateToProps)(ProfileHomePage);