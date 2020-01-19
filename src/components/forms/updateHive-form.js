import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm, focus} from 'redux-form';
import { withRouter, Redirect} from 'react-router-dom';
import Input from './input';
import {required, nonEmpty, length, isTrimmed} from '../../helpers/validators';
import slugify from 'slugify';

import {updateHive} from '../../actions/hives';

const titleLength = length({min: 1, max: 25});

export class UpdateHiveForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            submitted: false
        }
    }

    onSubmit(values) {
        this.props.dispatch(updateHive(values, this.props.currentHive))
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
                className="updateHive"
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
                    className="updateHive-button">
                    Update Hive
                </button>
            </form>   
        );
    }
}

UpdateHiveForm = withRouter(UpdateHiveForm);

const mapStateToProps = state => ({
    currentHive: state.hive,
    initialValues: {title: state.hive.title, mission: state.hive.mission}
});

let formComponent = reduxForm({
    form: 'updateHive',
    enableReinitialize: true,
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('updateHive', Object.keys(errors)[0]))
})(UpdateHiveForm);

export default connect(mapStateToProps)(formComponent);