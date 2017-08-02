import * as React from 'react';
import * as reactStyles from 'react-css-modules';
import SignupForm from '../../components/signupForm/SignupForm';
import {connect} from 'react-redux';
import {userSignupRequest} from '../../actions/signupActions';
import {addFlashMessage} from '../../actions/flashMessageAction';
// імпортування залежностей

interface ISignupProps { // властивості классу
    userSignupRequest: (userData: object) => any;
    addFlashMessage: (message: object) => any;
}

const style = require('./SignupStyle.scss');
@reactStyles(style) // підключення стилів
class Signup extends React.Component<ISignupProps, any> {

    public render() { // функція рендеру
        return (
            <div className={style.intro}>
                <h1 className={style.heading}>Mad ideas</h1>
                <div className={style.verticalAlignBlock}>
                    <SignupForm userSignupRequest={this.props.userSignupRequest} addFlashMessage={this.props.addFlashMessage}/>
                </div>
            </div>
        );
    }
}

export default connect(null, {userSignupRequest, addFlashMessage})(Signup); // єкспорт нашого класу