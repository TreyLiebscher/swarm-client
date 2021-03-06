import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {BorderedAreaInput} from './area-input';
import {required, nonEmpty} from '../../helpers/validators';
import './forms.css';

import {commentReply} from '../../actions/comments';

export class CommentReplyForm extends React.Component {
    constructor(props){
        super(props);
        this.displayForm = this.displayForm.bind(this);
        this.state = {
            submitted: false,
            visible: true
        }
    }
    
    
    onSubmit(values) {
        const homePost = this.props.post;
        const post = this.props.comment._id;

        this.props.dispatch(commentReply(values, post, homePost));
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

        if(this.state.visible === false){
            return (
                <div></div>
            )
        }
        else {
            return (
                <form
                    className="commentReply"
                    onSubmit={this.props.handleSubmit(values =>
                        this.onSubmit(values)
                    )}>
                    <label htmlFor="body">Reply</label>
                    <Field
                        component={BorderedAreaInput}
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