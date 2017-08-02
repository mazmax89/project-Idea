import {ADD_FLASH_MESSAGE} from './types'

export function  addFlashMessage (message: any) {
    return {
        type: ADD_FLASH_MESSAGE,
        message,
    }
}