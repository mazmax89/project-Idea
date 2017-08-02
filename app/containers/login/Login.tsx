import * as React from 'react';
import * as reactStyles from 'react-css-modules';
import LoginForm from '../../components/loginForm/LoginForm';
import loginAction from '../../actions/actions';
import {connect} from 'react-redux';
// імпортування залежностей

interface ILoginFormProps { // властивості классу
    loginAction: (userData: object) => any;
}

const style = require('./LoginStyle.scss');
@reactStyles(style) // підключення стилів
class Login extends React.Component<ILoginFormProps, any> {

    public render() { // функція рендеру
        return (
            <div className={style.intro}>
                <h1 className={style.heading}>Mad ideas</h1>
                <div className={style.verticalAlignBlock}>
                    <LoginForm loginAction={this.props.loginAction}/> {/*виклик 'loginForm'*/}
                </div>
            </div>
        );
    }
}

export default  connect(null, loginAction)(Login); // єкспорт нашого класу