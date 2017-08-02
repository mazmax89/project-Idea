import {ADD_FLASH_MESSAGE} from '../actions/types';
import * as shortid from 'shortid';

export default (state: any = [], action: any = {}) => {
    switch (action.type) {
        case ADD_FLASH_MESSAGE:
            return [
                ...state,
                {
                    id: shortid.generate(),
                    type: action.message.type,
                    text: action.message.text,
                },
            ];
    }
    return state;
}