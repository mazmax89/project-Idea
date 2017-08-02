import * as React from 'react';
import * as reactStyles from 'react-css-modules';
import {Button, Form, FormGroup} from 'react-bootstrap';
import TextFieldGroup from '../common/TextFieldGroup';
import validateInput from '../../../server/utils/validations/Login';
import browserHistory from 'react-router/lib/browserHistory';
// імпортування залежностей
interface ILoginFormProps { // властивості классу
    loginAction: (userData: object) => any;
}

const style = require('./LoginForm.scss');
@reactStyles(style)  // підключення стилів
class LoginForm extends React.Component<ILoginFormProps, any> {

    constructor(props: any) {
        super(props);
        this.state = { // стан нашого додатку
            identifier: '',
            password: '',
            errors: {},
            isLoading: false,
            form: null,
        };
        this.onChanged = this.onChanged.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    private onChanged(e: any) { // метод обробник події полів TextField
        let stateName: string = e.target.name;
        if (stateName === 'identifier') {
            this.setState({identifier: e.target.value});
        } else {
            this.setState({password: e.target.value});
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
            this.props.loginAction(this.state).then(
                (res: any) => {
                    browserHistory.push('/myPage');
                    setInterval(window.location.reload(), 10000);
                },
                (data: any) => {
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
                    <h1>Login</h1>
                </div>
                <div className={style.warning}>{errors.errors ? errors.errors.form : null}</div>
                <FormGroup className={style.formGroup} controlId='formHorizontalEmail'>
                    <TextFieldGroup
                        error={errors.identifier}
                        label='Username'
                        onChanged={this.onChanged}
                        field='identifier'
                        type='text'
                    />
                    <TextFieldGroup
                        error={errors.password}
                        label='Password'
                        onChanged={this.onChanged}
                        field='password'
                        type='password'
                    />
                    <Button disabled={this.state.isLoading} className={style.btnDefault} type='submit'>
                        Login
                    </Button>
                </FormGroup>
            </Form>
        );
    }
}

export default LoginForm; // єкспорт нашого класу