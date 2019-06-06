import React from 'react';

export default class QuickViewPost extends React.Component {



    render(){
        let image;
        // let tags = this.props.tags.map((tag) => {<p>{tag}</p>})
        return (
            <div className="quickview-post" id={this.props.id}>
                <h3>{this.props.title}</h3>
                <p>{this.props.hive}</p>
                <p>{this.props.author}</p>
            </div>
        )
    }
}