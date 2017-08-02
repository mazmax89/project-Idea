import {isEmpty} from 'lodash';
import {SET_CURRENT_USER} from '../actions/types';

const initialState = {
    isAuthenticated: false,
    user: {},
};

export default (state: any = initialState, action: any) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                isAuthenticated: !isEmpty(action.user),
                user: action.user,
            };
        default: return state;
    }
}