import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {getProfile} from '../actions/users';

export class ProfileHomePage extends React.Component {

    componentDidMount() {
        this.props.dispatch(getProfile());
    }

    render(){
        console.log(this.props.user.username)
        return (
            <div className="profileHome-page">
                <p>Wecome back {this.props.user.username}</p>
                <Link to="/hives/build">Build a Hive!</Link>
                
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