export const TAX_RATE = process.env.GATSBY_TAX_RATE || .01;
export const FREE_SHIPPING_THRESHOLD = process.env.GATSBY_FREE_SHIPPING_THRESHOLD || 100;
export const SHIPPING_RATE = process.env.GATSBY_SHIPPING_RATE || 5;

export const cartSubtotal = (cart) => {

    const subtotal = cart.reduce((counter, product) => {
        return counter + (product.details.price * product.quantity)
    }, 0)
    return subtotal;
}


export const shouldPayShipping = (cart) => {
    const subtotal = cartSubtotal(cart);
    return subtotal < FREE_SHIPPING_THRESHOLD
}

export const getTaxes = (cart) => {
    const subtotal = cartSubtotal(cart);
    return subtotal * TAX_RATE;
}


export const cartTotal = (cart) => {
    if (!cart.length) {
        return 0;
    }
    const subtotal = cartSubtotal(cart);
    const shipping = shouldPayShipping(cart) ? SHIPPING_RATE : 0;
    const total = (subtotal * (1 + TAX_RATE)) + shipping;

    return total;
}
