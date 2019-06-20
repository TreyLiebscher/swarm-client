import React from 'react';
import { connect } from 'react-redux';
import {ratePost} from '../../actions/posts';

export class PostRater extends React.Component {
    constructor(props){
        super(props);
        this.submitRating = this.submitRating.bind(this)
        this.setRating = this.setRating.bind(this)
        this.state = {
            rating: 1,
            submitted: false,
        }

    }

    submitRating(){
        this.props.dispatch(
            ratePost({
                rating: this.state.rating,
                post: this.props.post
            })
        )
    }

    setRating(e){
        if(e.target.id === '5'){
            this.setState({
                rating: 5
            })
        } else if (e.target.id === '4') {
            this.setState({
                rating: 4
            })
        } else if (e.target.id === '3') {
            this.setState({
                rating: 3
            })
        } else if (e.target.id === '2') {
            this.setState({
                rating: 2
            })
        } else if (e.target.id === '1') {
            this.setState({
                rating: 1
            })
        }
    }

    render(){
        return (
            <div className="post-rater-container">
                <p>Rate this post</p>
                <p>{this.state.rating}</p>
                <button type="button" id="1" onClick={this.setRating}>1</button>
                <button type="button" id="2" onClick={this.setRating}>2</button>
                <button type="button" id="3" onClick={this.setRating}>3</button>
                <button type="button" id="4" onClick={this.setRating}>4</button>
                <button type="button" id="5" onClick={this.setRating}>5</button>
                <button type="button" onClick={this.submitRating}>RATE</button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        view: state.post,
        comments: state.post.comments,
        user: state.userProfile
    };
};

export default connect(mapStateToProps)(PostRater);