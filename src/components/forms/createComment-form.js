import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {Redirect} from 'react-router-dom';
import Input from './input';
import {required, nonEmpty, matches, length, isTrimmed} from '../../helpers/validators';
import slugify from 'slugify';

import {createComment} from '../../actions/comments';
import {viewPostById} from '../../actions/posts';


export class CreateCommentForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            submitted: false
        }
    }
    
    
    onSubmit(values) {
        const post = this.props.post.id;
        this.props.dispatch(createComment(values, post))
    }

    render(){


        // if(this.state.submitted === true){
        //     TODO *Close comment form/display comment form/etc*
        // }
        

        return (
            <form
                className="createComment"
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                <label htmlFor="body">Body</label>
                <Field
                    component={Input}
                    type="text"
                    name="body"
                    validate={[required, nonEmpty, isTrimmed]}
                />
                <button
                    type="submit"
                    disabled={this.props.pristine || this.props.submitting}
                    className="createComment-button">
                    Comment
                </button>
            </form>            
        );
    }
}

export default reduxForm({
    form: 'createComment',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('createComment', Object.keys(errors)[0]))
})(CreateCommentForm);