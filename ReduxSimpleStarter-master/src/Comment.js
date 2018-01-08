import React, { Component } from 'react';
import { form, control, button } from 'react-validation';

export default class Comment extends Component {
    handleSubmit = (event) => {
        event.preventDefault();

        // Emulate async API call
        setTimeout(() => {
            this.form.showError(this.userInput, <span>API error</span>);
        }, 1000);
    };

    removeApiError = () => {
        this.form.hideError(this.userInput);
    };

    render() {
        return <Form ref={c => {
            this.form = c
        }} onSubmit={this.handleSubmit.bind(this)}>
            <div className="row">
                <div className="small-12 columns">
                    <h3>Leave a comment</h3>
                </div>
            </div>
            <div className="row">
                <div className="small-12 medium-4 columns">
                    <label>
                        <Input
                            onFocus={this.removeApiError}
                            ref={c => {
                                this.userInput = c
                            }}
                            placeholder="username"
                            type="text"
                            value="Username"
                            name="username"
                            validations={[required]}
                        />
                    </label>
                </div>
                <div className="small-12 medium-8 columns">
                    <label>
                        <Textarea
                            placeholder="Leave your comment..."
                            value="Comment"
                            name="comment"
                            validations={[required]}
                        />
                    </label>
                </div>
            </div>
            <div className="row">
                <div className="small-12 medium-6 columns">
                    <Button className="button">Submit</Button>
                </div>
            </div>
        </Form>
    }
}

const Form = ({ getValues, validate, validateAll, showError, hideError, children, ...props }) => ( // destruct non-valid props
    <form {...props}>{children}</form>
);

// Define own Input component
const Input = ({ error, isChanged, isUsed, ...props }) => (
    <div>
        <input {...props} />
        {isChanged && isUsed && error}
    </div>
);

// Define own Button component
const Button = ({ hasErrors, ...props }) => {
    return (
        <button {...props} disabled={hasErrors} />
    );
};

// Now call HOCs on components
const MyValidationForm = form(Form);
const MyValidationInput = control(Input);
const MyValidationButton = button(Button);