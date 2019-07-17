import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import AreaInput from './area-input';
import {required, nonEmpty} from '../../helpers/validators';
import './forms.css';

import {commentReply} from '../../actions/comments';

export class CommentReplyForm extends React.Component {
    constructor(props){
        super(props);
        this.displayForm = this.displayForm.bind(this);
        this.state = {
            submitted: false,
            visible: false
        }
    }
    
    
    onSubmit(values) {
        const post = this.props.comment._id;
        this.props.dispatch(commentReply(values, post));
        this.setState({visible: false});
    }

    displayForm(){
        if(this.state.visible === false){
            this.setState({visible: true});
        } else {
            this.setState({visible: false});
        }
    }

    render(){

        console.log('kiwi', this.props.comment)
        // if(this.state.submitted === true){
        //     TODO *Close comment form/display comment form/etc*
        // }

        if(this.state.visible === false){
            return (
                <button className="commentReply-display-button"onClick={this.displayForm}>Reply</button>
            )
        }
        else {
            return (
                <form
                    className="commentReply"
                    onSubmit={this.props.handleSubmit(values =>
                        this.onSubmit(values)
                    )}>
                    <button type="button" className="commentReply-cancel" onClick={this.displayForm}>X</button>
                    <label htmlFor="body">Reply</label>
                    <Field
                        component={AreaInput}
                        type="text"
                        name="body"
                        validate={[required, nonEmpty]}
                    />

                    <button
                        type="submit"
                        disabled={this.props.pristine || this.props.submitting}
                        className="commentReply-button">
                        Submit
                    </button>
                </form>            
            );
        }
        


    }
}

export default reduxForm({
    form: 'commentReply',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('commentReply', Object.keys(errors)[0]))
})(CommentReplyForm);