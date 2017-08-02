import 'bootstrap-sass';
import 'es6-shim';
import * as React from 'react';
import {AppContainer} from 'react-hot-loader';
import {Provider} from 'react-redux';
import * as ReactDOM from 'react-dom';
import Router from './router';
import store from './store';
import setAuthorizationToken from '../server/utils/setAuthorizationToken';
import {setCurrentUser} from './actions/loginAction';
import * as jwt from 'jsonwebtoken';

declare const module: any;

const DefaultStore = store();

const renderNode = document.getElementById('app');

if (localStorage.jwtToken) {
    setAuthorizationToken(localStorage.jwtToken);
    DefaultStore.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)))
}


const renderIntoDOM = (Node: any) => {
    ReactDOM.render(
        <Provider store={DefaultStore}>
            <AppContainer>
                <Node />
            </AppContainer>
        </Provider>,
        renderNode,
    );
};
const renderPage = () => {
    if (process.env.NODE_ENV !== 'production' && module.hot) {
        module.hot.accept('./router.tsx', () => {
            const NextRouter: any = require('./router.tsx').default;
            renderIntoDOM(NextRouter);
        });
    }
    renderIntoDOM(Router);
};

renderPage();
