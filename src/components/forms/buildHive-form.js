import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import { withRouter, Redirect} from 'react-router-dom';
import Input from './input';
import {required, nonEmpty, length, isTrimmed} from '../../helpers/validators';
import slugify from 'slugify';

import {buildHive} from '../../actions/hives';

const titleLength = length({min: 1, max: 25});

export class BuildHiveForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            submitted: false
        }
    }
    
    
    onSubmit(values) {
        this.props.dispatch(buildHive(values))
        .then(res => {
            this.setState({
                submitted: true
            });
        });
    }

    render(){

        if(this.state.submitted === true){
            let urlTitle = slugify(this.props.currentHive.title);
            
            return (
                <Redirect to={`/hives/view/${urlTitle}`} />
            )
        }


        return (
            <form
                className="buildHive"
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
                <label htmlFor="mission">Mission</label>
                <Field
                    component={Input}
                    type="text"
                    name="mission"
                    validate={[required, nonEmpty, isTrimmed]}
                />
                <button
                    type="submit"
                    disabled={this.props.pristine || this.props.submitting}
                    className="buildHive-button">
                    Build Hive
                </button>
            </form>            
        );
    }
}

BuildHiveForm = withRouter(BuildHiveForm);

export default reduxForm({
    form: 'buildHive',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('buildHive', Object.keys(errors)[0]))
})(BuildHiveForm);