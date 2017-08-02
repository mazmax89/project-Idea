import * as React from 'react';
import * as reactStyles from 'react-css-modules';
import {Button, Form, FormGroup} from 'react-bootstrap';
import validateInput from '../../../server/utils/validations/Signup';
import TextFieldGroup from '../common/TextFieldGroup';
import browserHistory from 'react-router/lib/browserHistory';
// імпортування залежностей

interface ISignupFormProps { // властивості классу
    userSignupRequest: (userData: object) => any;
    addFlashMessage: (message: object) => any;
}

const style = require('./SignupFormStyle.scss');
@reactStyles(style) // підключення стилів
class SignupForm extends React.Component<ISignupFormProps, any> {

    constructor(props: any) {
        super(props);
        this.state = { // стан нашого додатку
            username: '',
            firstPassword: '',
            confirmPassword: '',
            errors: {},
            isLoading: false,
        };
        this.onChanged = this.onChanged.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    private onChanged(e: any) { // метод обробник події полів TextField
        let stateName: string = e.target.name;
        if (stateName === 'username') {
            this.setState({username: e.target.value});
        } else if (stateName === 'password') {
            this.setState({firstPassword: e.target.value});
        } else {
            this.setState({confirmPassword: e.target.value});
        }
    }

    private isValid() { // метод валідації вхідних данних
        const {errors, isValid} = validateInput(this.state);

        if (!isValid) {
            this.setState({errors});
        }

        return isValid;
    }

    private onSubmit(e: any) { // метод обробник події форми
        e.preventDefault();

        if (this.isValid()) {
            this.setState({errors: {}, isLoading: true});
            this.props.userSignupRequest(this.state).then(
                () => {
                    browserHistory.push('/login');
                    setInterval(window.location.reload(), 10000);
                }, (data: any) => {
                    this.setState({errors: data.response.data, isLoading: false});
                },
            );
        }

    }

    public render() { // метод рендеру
        const errors = this.state.errors;
        return (
            <Form horizontal onSubmit={this.onSubmit}>
                <div className={style.title}>
                    <h1>Create account</h1>
                </div>
                <FormGroup className={style.formGroup} controlId='formHorizontalEmail'>
                    <TextFieldGroup
                        error={errors.username}
                        label='Username'
                        onChanged={this.onChanged}
                        field='username'
                        type='text'
                    />
                    <TextFieldGroup
                        error={errors.password}
                        label='password'
                        onChanged={this.onChanged}
                        field='password'
                        type='password'
                    />
                    <TextFieldGroup
                        error={errors.confirmPassword}
                        label='confirm Password'
                        onChanged={this.onChanged}
                        field='confirmPassword'
                        type='password'
                    />
                    <Button disabled={this.state.isLoading} className={style.btnDefault} type='submit'>
                        SIGNUP
                    </Button>
                </FormGroup>
                <div className={style.title}>
                    <h1>Or <a href='/login'>login</a></h1>
                </div>
            </Form>
        );
    }
}

export default SignupForm; // єкспорт нашого класу
