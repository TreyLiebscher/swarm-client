import React from 'react';
import './loading-message.css';

export default class LoadingMessage extends React.Component {




    render(){

        const displayLoading = () => {
            if(this.props.loading === true){
                return <p className="message">Loading...</p>
            }
        }

        return (
            <div>
                {displayLoading()}
            </div>
        )
    }
}