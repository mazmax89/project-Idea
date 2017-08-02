import axios from '../../node_modules/axios';
import setAuthorizationToken from '../../server/utils/setAuthorizationToken';
import * as jwt from 'jsonwebtoken';
import {SET_CURRENT_USER} from './types';
import browserHistory from 'react-router/lib/browserHistory';


export function setCurrentUser(user: any): any {  // функція  встановлення поточного користувача
    return {
        type: SET_CURRENT_USER,
        user,
    };
}

export function logoutAction(): object { // action вихіду з систему
    return (dispatch: object): any => {
        localStorage.removeItem('jwtToken'); // видалення tokena
        setAuthorizationToken({}); // встановлення  tokena
        let isAuth2: any = setCurrentUser({});
        browserHistory.push('/login');
        setInterval(window.location.reload(), 1000); // оновлення сторінки
        dispatch = isAuth2;
    };
}

export function loginAction(userData: object): object { // action входу в систему
    return (dispatch: object): any => (axios.post('/api/auth', userData).then((res: any) => {// метод POST до API
        const token = res.data.token;
        localStorage.setItem('jwtToken', token); // встановлення tokena
        setAuthorizationToken(token);
        let isAuth: any = setCurrentUser(jwt.decode(token));
        dispatch = isAuth;
    }));
}