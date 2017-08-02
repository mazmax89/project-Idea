import * as React from 'react';
import * as reactStyles from 'react-css-modules';
import {connect} from 'react-redux';
import {logoutAction} from '../../actions/loginAction';

const style = require('./style');

interface IHeaderProps {
    auth?: any,
    logoutAction?: any;
};


@reactStyles(style)
class Header extends React.Component<IHeaderProps, {}> {

    private logout(e: any): void {
        e.preventDefault();
        this.props.logoutAction();
    }

    public render(): JSX.Element {

        const {isAuthenticated} = this.props.auth;

        const userLinks = (
            <div>
                <a className={style.link} href='/ideas'>
                    All Ideas
                </a>
                <a className={style.link} href='/myIdeas'>
                    Create Ideas
                </a>
                <a className={style.link} href='/myPage'>
                    My page
                </a>
                <a className={style.link} href='/about'>
                    About project
                </a>
                <a className={style.link} href='#' onClick={this.logout.bind(this)}>
                    Logout
                </a>

            </div>
        );
        const guestLinks: JSX.Element = (
            <div>
                <a className={style.link} href='/about'>
                    About project
                </a>
                <a className={style.link} href='/'>
                    SignUp
                </a>
                <a className={style.link} href='/login'>
                    LogIn
                </a>

            </div>

        );

        return (
            <div className={style.header}>
                { isAuthenticated ? userLinks : guestLinks}
            </div>
        );
    }
}

function mapStateToProps(state: any) {
    return {
        auth: state.auth,
    };
}
export default connect(mapStateToProps, {logoutAction})(Header);