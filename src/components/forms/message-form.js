import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {withRouter} from 'react-router-dom';
import AreaInput from './area-input';
import {required, nonEmpty} from '../../helpers/validators';
import './forms.css';

import {sendMessage, getProfile} from '../../actions/users';

export class SendMessageForm extends React.Component {
    constructor(props){
        super(props);
        this.displayForm = this.displayForm.bind(this);
        this.state = {
            submitted: false,
            visible: false
        }
    }
    
    
    onSubmit(values) {
        if(!(this.props.conversation)){
            this.props.dispatch(sendMessage(this.props.sender.id, this.props.receiver, values));
            this.setState({visible: false});
            this.setState({submitted: true});
        }
        else {
            this.props.dispatch(sendMessage(this.props.sender.id, this.props.receiver, values, this.props.conversation));
        }
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
                <button className="createComment-display-button"onClick={this.displayForm}>Message</button>
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
                    <label htmlFor="body">Send a message</label>
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
                        Send
                    </button>
                </form>            
            );
        }
        


    }
}

export default withRouter(reduxForm({
    form: 'sendMessage',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('sendMessage', Object.keys(errors)[0]))
})(SendMessageForm));