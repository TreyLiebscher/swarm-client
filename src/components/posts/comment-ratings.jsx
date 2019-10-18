import React from 'react';
import './comment.css';

export default class CommentRatings extends React.Component {
    render(){
        
        const ratings = this.props.ratings;
        const displayRating = () => {
            if(ratings === 5){
                return <p className="comment-rating"> &#x2605; &#x2605; &#x2605; &#x2605; &#x2605; <span className="comment-rating-count">({this.props.length})</span></p>
            }
            else if(ratings === 4){
                return <p className="comment-rating"> &#x2605; &#x2605; &#x2605; &#x2605; &#x2606; <span className="comment-rating-count">({this.props.length})</span></p>
            }
            else if(ratings === 3){
                return <p className="comment-rating"> &#x2605; &#x2605; &#x2605; &#x2606; &#x2606; <span className="comment-rating-count">({this.props.length})</span></p>
            }
            else if(ratings === 2){
                return <p className="comment-rating"> &#x2605; &#x2605; &#x2606; &#x2606; &#x2606; <span className="comment-rating-count">({this.props.length})</span></p>
            }
            else if(ratings === 1){
                return <p className="comment-rating"> &#x2605; &#x2606; &#x2606; &#x2606; &#x2606; <span className="comment-rating-count">({this.props.length})</span></p>
            }
        }

        return (
            <div className="comment-rating-container">
                {displayRating()}
            </div>
        );
    }
}