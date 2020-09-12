import * as actionTypes from './actionTypes';

export const openFlashMessage = ({ message, props }) => {
    return {
        type: actionTypes.OPEN_FLASH_MESSAGE,
        payload: {
            message,
            props
        }

    }
}

export const closeFlashMessage = () => {
    return {
        type: actionTypes.CLOSE_FLASH_MESSAGE,
    }
}