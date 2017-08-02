declare const module: any;
import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import addFlashMessage from '../reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

export default function configureStore() {
    const store = createStore(addFlashMessage, composeWithDevTools(
        applyMiddleware(thunk),

    ));
    if (process.env.NODE_ENV !== 'production' && module.hot) {
        module.hot.accept('../reducers/', () => {
            const nextRootReducer = require('../reducers').default;
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
