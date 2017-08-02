import * as React from 'react';
import * as reactStyles from 'react-css-modules';
import FlashMessagesList from '../components/flashMessage/FlashMessagesList';

import {actions} from '../actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Header from '../components/header/Header';
import Footer from '../components/footer';
import {setInterval} from 'timers';

const Bootstrap = require('global-styles');
const styles = require('./RootStyle');

declare const Object: any;

interface IProps {

}

interface IUi {
    ui: IProps
}

interface IStates {
    reducer: Object;
}

export interface IActions {
    actions: {}
}

const uiStates: (states: IStates) => Object = states => ({
    ui: states.reducer,
});

const uiActions: (dispatch: any) => IActions = dispatch => ({
    actions: bindActionCreators(
        {...actions},
        dispatch,
    ),
});


@reactStyles({...styles, ...Bootstrap})
class Root extends React.Component<IUi & IActions, any> {

    private loading(): any {
        setTimeout(args => {}, 700);
        return this.props.children;
    }

    render() {
        return (
            <div id='layout'>
                <Header/>
                <div className={styles.page}>
                    <div className='container'>
                        {/* [56:14]
                         You can also pass the states and actions as a props to the children.
                         You need to replace the below line with:

                         { React.cloneElement(this.props.children, {...this.props}) }

                         By doing this you don't need to use @connect() in every component to retrive
                         the states and the actions from redux.
                         */}
                        <FlashMessagesList/>
                        {this.loading()}
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default connect(uiStates, uiActions)(Root);