import axios from '../../node_modules/axios';
// імпортування залежностей

export function userSignupRequest(userData: object): object { // action(дія) реєстрації
    return (dispatch: object) => (axios.post('/api/users', userData)); // запрос к API
}
