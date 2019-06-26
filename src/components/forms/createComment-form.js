import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {Redirect} from 'react-router-dom';
import AreaInput from './area-input';
import {required, nonEmpty, matches, length, isTrimmed} from '../../helpers/validators';
import slugify from 'slugify';

import {createComment} from '../../actions/comments';
import {viewPostById} from '../../actions/posts';

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
                <button onClick={this.displayForm}>Post a Comment</button>
            )
        }
        else {
            return (
                // <button onClick={this.displayForm}>Hide</button>
                <form
                    className="createComment"
                    onSubmit={this.props.handleSubmit(values =>
                        this.onSubmit(values)
                    )}>
                    <label htmlFor="body">Body</label>
                    <Field
                        component={AreaInput}
                        type="text"
                        name="body"
                        validate={[required, nonEmpty, isTrimmed]}
                    />
                    <button type="button" onClick={this.displayForm}>Cancel</button>
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
}

export default reduxForm({
    form: 'createComment',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('createComment', Object.keys(errors)[0]))
})(CreateCommentForm);