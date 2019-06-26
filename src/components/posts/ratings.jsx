import React from 'react';

export default class Ratings extends React.Component {

    render(){
        
        const ratings = this.props.ratings;
        const displayRating = () => {
            if(ratings === 5){
                return <p className="quickview-post-rating five">O O O O O <span className="rating-count">({this.props.length})</span></p>
            }
            else if(ratings === 4){
                return <p className="quickview-post-rating four">O O O O <span className="rating-count">({this.props.length})</span></p>
            }
            else if(ratings === 3){
                return <p className="quickview-post-rating three">O O O <span className="rating-count">({this.props.length})</span></p>
            }
            else if(ratings === 2){
                return <p className="quickview-post-rating two">O O <span className="rating-count">({this.props.length})</span></p>
            }
            else if(ratings === 1){
                return <p className="quickview-post-rating one">O <span className="rating-count">({this.props.length})</span></p>
            }
        }

        return (
            <div className="ratings-container">
                {displayRating()}
            </div>
        );
    }
}