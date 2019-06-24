import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {Redirect} from 'react-router-dom';
import Input from './input';
import {required, nonEmpty, matches, length, isTrimmed} from '../../helpers/validators';
import slugify from 'slugify';

import {createPost} from '../../actions/posts';

const titleLength = length({min: 1, max: 60});

export class CreatePostForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            submitted: false
        }
    }
    
    
    onSubmit(values) {
        const hive = this.props.hive;
        this.props.dispatch(createPost(values, hive))
        .then(res => {
            this.setState({
                submitted: true
        });
        })

    }

    render(){


        if(this.state.submitted === true){
            let urlTitle = slugify(this.props.currentPost.title);
            const urlTitleShorten = (urlTitle) => {
                if(urlTitle.length >= 25){
                    urlTitle = urlTitle.slice(0, 25);
                }
                return urlTitle;
            }
            
            return (
                <Redirect to={`/posts/view/${this.props.currentPost.id}/${urlTitleShorten(urlTitle)}`} />
            )
        }
        

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
                <label htmlFor="link">Link</label>
                <Field
                    component={Input}
                    type="text"
                    name="link"
                />
                <label htmlFor="tags">Tags</label>
                <Field
                    component={Input}
                    type="text"
                    name="tags"
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