import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import {required, nonEmpty, matches, length, isTrimmed} from '../../helpers/validators';

import {createPost} from '../../actions/posts';

const titleLength = length({min: 1, max: 25});

export class CreatePostForm extends React.Component {
    onSubmit(values) {
        const hive = this.props.hive;
        return this.props.dispatch(createPost(values, hive))
    }

    // componentDidMount(){
    //     console.log(this.props.hive)
    // }

    render(){
        return (
            <form
                className="createPost"
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                <label htmlFor="title">Title</label>
                <Field
                    component={Input}
                    type="text"
                    name="title"
                    validate={[required, nonEmpty, titleLength, isTrimmed]}
                />
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
                    className="createPost-button">
                    Build Hive
                </button>
            </form>            
        );
    }
}

export default reduxForm({
    form: 'createPost',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('createPost', Object.keys(errors)[0]))
})(CreatePostForm);