import React from 'react';
import { connect } from 'react-redux';
import {ratePost} from '../../actions/posts';
import './post-rater.css';

export class PostRater extends React.Component {
    constructor(props){
        super(props);
        this.submitRating = this.submitRating.bind(this)
        this.setRating = this.setRating.bind(this)
        this.state = {
            rating: 1,
            submitted: false,
            button1: '\u2605',
            button2: '\u2606',
            button3: '\u2606',
            button4: '\u2606',
            button5: '\u2606',
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
                rating: 5,
                button1: '\u2605',
                button2: '\u2605',
                button3: '\u2605',
                button4: '\u2605',
                button5: '\u2605',
            })
        } else if (e.target.id === '4') {
            this.setState({
                rating: 4,
                button1: '\u2605',
                button2: '\u2605',
                button3: '\u2605',
                button4: '\u2605',
                button5: '\u2606',
            })
        } else if (e.target.id === '3') {
            this.setState({
                rating: 3,
                button1: '\u2605',
                button2: '\u2605',
                button3: '\u2605',
                button4: '\u2606',
                button5: '\u2606',
            })
        } else if (e.target.id === '2') {
            this.setState({
                rating: 2,
                button1: '\u2605',
                button2: '\u2605',
                button3: '\u2606',
                button4: '\u2606',
                button5: '\u2606',
            })
        } else if (e.target.id === '1') {
            this.setState({
                rating: 1,
                button1: '\u2605',
                button2: '\u2606',
                button3: '\u2606',
                button4: '\u2606',
                button5: '\u2606',
            })
        }
    }

    render(){
        
        

        return (
            <div className="post-rater-container">
                {/* <p className="post-rater-message">Rate this post</p> */}
                <div className="post-rater-button-container">
                    <button className="post-rater-button" type="button" id="1" onClick={this.setRating}>{this.state.button1}</button>
                    <button className="post-rater-button" type="button" id="2" onClick={this.setRating}>{this.state.button2}</button>
                    <button className="post-rater-button" type="button" id="3" onClick={this.setRating}>{this.state.button3}</button>
                    <button className="post-rater-button" type="button" id="4" onClick={this.setRating}>{this.state.button4}</button>
                    <button className="post-rater-button" type="button" id="5" onClick={this.setRating}>{this.state.button5}</button>
                </div>
                <button className="post-rater-submit-button" type="button" onClick={this.submitRating}>RATE</button>
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