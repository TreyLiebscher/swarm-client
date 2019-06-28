import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import AreaInput from './area-input';
import {required, nonEmpty} from '../../helpers/validators';
import './forms.css';

import {createComment} from '../../actions/comments';

export class CreateCommentForm extends React.Component {
    constructor(props){
        super(props);
        this.displayForm = this.displayForm.bind(this);
        this.state = {
            submitted: false,
            visible: false
        }
    }
    
    
    onSubmit(values) {
        const post = this.props.post.id;
        this.props.dispatch(createComment(values, post));
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


        // if(this.state.submitted === true){
        //     TODO *Close comment form/display comment form/etc*
        // }

        if(this.state.visible === false){
            return (
                <button className="createComment-display-button"onClick={this.displayForm}>Post a Comment</button>
            )
        }
        else {
            return (
                <form
                    className="createComment"
                    onSubmit={this.props.handleSubmit(values =>
                        this.onSubmit(values)
                    )}>
                    <button type="button" className="createComment-cancel" onClick={this.displayForm}>X</button>
                    <label htmlFor="body">Post a Comment</label>
                    <Field
                        component={AreaInput}
                        type="text"
                        name="body"
                        validate={[required, nonEmpty]}
                    />

                    <button
                        type="submit"
                        disabled={this.props.pristine || this.props.submitting}
                        className="createComment-button">
                        Submit
                    </button>
                </form>            
            );
        }
        


    }
}

export default reduxForm({
    form: 'createComment',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('createComment', Object.keys(errors)[0]))
})(CreateCommentForm);