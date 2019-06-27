import React from 'react';

export default class Ratings extends React.Component {

    render(){
        
        const ratings = this.props.ratings;
        const displayRating = () => {
            if(ratings === 5){
                return <p className="quickview-post-rating five"> &#x2605; &#x2605; &#x2605; &#x2605; &#x2605; <span className="rating-count">({this.props.length} reviews)</span></p>
            }
            else if(ratings === 4){
                return <p className="quickview-post-rating four">&#x2605; &#x2605; &#x2605; &#x2605; &#x2606; <span className="rating-count">({this.props.length} reviews)</span></p>
            }
            else if(ratings === 3){
                return <p className="quickview-post-rating three">&#x2605; &#x2605; &#x2605; &#x2606; &#x2606; <span className="rating-count">({this.props.length} reviews)</span></p>
            }
            else if(ratings === 2){
                return <p className="quickview-post-rating two">&#x2605; &#x2605; &#x2606; &#x2606; &#x2606; <span className="rating-count">({this.props.length} reviews)</span></p>
            }
            else if(ratings === 1){
                return <p className="quickview-post-rating one">&#x2605; &#x2606; &#x2606; &#x2606; &#x2606; <span className="rating-count">({this.props.length} reviews)</span></p>
            }
        }

        return (
            <div className="ratings-container">
                {displayRating()}
            </div>
        );
    }
}