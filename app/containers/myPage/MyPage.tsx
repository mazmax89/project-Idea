import * as React from 'react';
import * as reactStyles from 'react-css-modules';
import {connect} from 'react-redux';

interface IMyPageProps {
    auth: object;
}

const style = require('./myPageStyle.scss');
reactStyles(style);
class MyPage extends React.Component<IMyPageProps, {}> {

    public render() {
        let authData: any = {};
        if (this.props.auth) {
            authData = this.props.auth;
        }
        return (
            <div className={style.myPage}>
                <h1 className={style.heading}>User page</h1>
                <div className={style.aboutBlock}>
                    <p>User name:{authData.user.username}</p>
                    <p>id:{authData.user.id}</p>
                    <p>Work place:</p>
                    <p>Position:</p>
                    <p>Some information about you:</p>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state: any) {
    return {
        auth: state.auth,
    };
}
export default connect(mapStateToProps)(MyPage);