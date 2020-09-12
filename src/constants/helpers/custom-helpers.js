export const getTotalItems = (cart) => {
    let totalItems = 0;
    cart.forEach(item => {
        totalItems += item.quantity;
    })


    return totalItems;
}

export const getTotalPrice = (cart) => {
    let totalPrice = 0;

    cart.forEach(item => {
        totalPrice += item.details.price * item.quantity
    })

    return totalPrice
}

export const getTotalItemsAndPrice = (cart) => {
    const items = getTotalItems(cart);
    const price = getTotalPrice(cart);

    return { items, price }
}

