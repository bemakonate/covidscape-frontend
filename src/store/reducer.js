import * as actionTypes from './actionTypes';
import { updatedObj } from '../constants/updatedObj';


const intialState = {
    cart: [],
    isCartSidebarOpen: false,
    totalItems: null,
    totalPrice: null,
    loadedCart: false,
}


const addToCart = (state, action) => {
    const { details, quantity } = action.payload;
    const itemAlreadyAdded = state.cart.find(item => item.details.id === details.id);

    //If the item is already added to the cart
    if (itemAlreadyAdded) {
        const oldCart = [...state.cart];
        //Loop through each item in the cart, and find already added item in the cart and update the item quantity to the new value
        const newCart = oldCart.map(item => {
            if (item.details.id === itemAlreadyAdded.details.id) {
                return updatedObj(item, { quantity: item.quantity + quantity })
            }
            return item;
        })

        return updatedObj(state, { cart: newCart });
    }


    return updatedObj(state, {
        cart: state.cart.concat({ details, quantity })
    })
}

const removeItem = (state, action) => {
    const { id } = action.payload;
    const newCart = [...state.cart].filter(item => item.details.id !== id);

    return updatedObj(state, { cart: newCart })
}



const changeItemQuantity = (state, action) => {
    const { newQuantity, id } = action.payload;

    const newCart = [...state.cart].map(item => {
        if (item.details.id === id) {
            return updatedObj(item, { quantity: newQuantity })
        }
        return item;
    })

    return updatedObj(state, { cart: newCart });
}

const openCartSidebar = (state, action) => updatedObj(state, { isCartSidebarOpen: true });
const closeCartSidebar = (state, action) => updatedObj(state, { isCartSidebarOpen: false });


const updateTotalPrice = (state, action) => updatedObj(state, { totalPrice: action.payload.price });
const updateTotalItems = (state, action) => updatedObj(state, { totalItems: action.payload.items });

const getUserCart = (state, action) => updatedObj(state, { cart: action.payload.cart, loadedCart: true })

const reducer = (state = intialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_ITEM: return addToCart(state, action);
        case actionTypes.REMOVE_ITEM: return removeItem(state, action);
        case actionTypes.OPEN_CART_SIDEBAR: return openCartSidebar(state, action);
        case actionTypes.CLOSE_CART_SIDEBAR: return closeCartSidebar(state, action);
        case actionTypes.CHANGE_ITEM_QUANTITY: return changeItemQuantity(state, action);
        case actionTypes.UPDATE_TOTAL_ITEMS: return updateTotalItems(state, action);
        case actionTypes.UPDATE_TOTAL_PRICE: return updateTotalPrice(state, action);
        case actionTypes.GET_USER_CART: return getUserCart(state, action);
        default:
            return state
    }
}

export default reducer;
