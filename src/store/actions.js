import * as actionTypes from './actionTypes';
import { getTotalItemsAndPrice } from '../constants/custom-helpers';


export const openCartSidebar = () => {
    return {
        type: actionTypes.OPEN_CART_SIDEBAR,
    }
}

export const closeCartSidebar = () => {
    return {
        type: actionTypes.CLOSE_CART_SIDEBAR,
    }
}

//Add item to cart
export const addToCart = (details, quantity) => {
    return async (dispatch, getState) => {
        await dispatch(addToCartDispatch(details, quantity));
        const cartData = getState().cart
        updateItemsAndPrice(dispatch, cartData);
        updateCartLocalStorage(cartData);
    }
}

export const addToCartDispatch = (details, quantity) => {
    return {
        type: actionTypes.ADD_ITEM,
        payload: { details, quantity },
    }
}

//Remove item
export const removeItem = (id) => {
    return async (dispatch, getState) => {
        await dispatch(removeItemDispatch(id));
        updateItemsAndPrice(dispatch, getState().cart);
        updateCartLocalStorage(getState().cart);
    }
}
export const removeItemDispatch = (id) => {
    return {
        type: actionTypes.REMOVE_ITEM,
        payload: { id }
    }
}


//Change item quanity
export const changeItemQuantity = (id, newQuantity) => {
    return async (dispatch, getState) => {
        await dispatch(changeItemQuantityDispatch(id, newQuantity));
        updateItemsAndPrice(dispatch, getState().cart);
        updateCartLocalStorage(getState().cart);
    }
}

export const changeItemQuantityDispatch = (id, newQuantity) => {
    return {
        type: actionTypes.CHANGE_ITEM_QUANTITY,
        payload: { id, newQuantity },
    }
}


//Update the price and items in cart
const updateTotalPrice = (price) => {
    return {
        type: actionTypes.UPDATE_TOTAL_PRICE,
        payload: { price }
    }
}

const updateTotalItems = (items) => {
    return {
        type: actionTypes.UPDATE_TOTAL_ITEMS,
        payload: { items }
    }
}

//get the local storage
export const getUserCart = (newProductsData) => {
    return async (dispatch, getState) => {
        const savedCart = JSON.parse(localStorage.getItem('cart'));

        const newCart = [];
        savedCart.forEach(savedItem => {
            const savedItemNewData = newProductsData.find(itemData => itemData.id === savedItem.details.id);
            if (savedItemNewData) {
                newCart.push({ details: savedItemNewData, quantity: savedItem.quantity });
            }
        });
        await dispatch(getUserCartDispatch(newCart));
        updateItemsAndPrice(dispatch, getState().cart);
    }



}


export const getUserCartDispatch = (newCart) => {
    return {
        type: actionTypes.GET_USER_CART,
        payload: {
            cart: newCart,
        }
    }
}
//update the local storage
const updateCartLocalStorage = (cartData) => {
    localStorage.setItem('cart', JSON.stringify(cartData));
}




//============HELPERS=================

const updateItemsAndPrice = (dispatch, cart) => {
    const result = getTotalItemsAndPrice(cart);
    dispatch(updateTotalPrice(result.price));
    dispatch(updateTotalItems(result.items));
}


