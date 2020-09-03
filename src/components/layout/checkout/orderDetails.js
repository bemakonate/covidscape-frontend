import React from 'react'
import CartItem from '../../reusable/cartItem';

const orderDetails = ({ cartItems }) => {
    return (
        <div className="checkout__order-details">
            <div className="cart-items">
                <div className="cart__text-container">
                    {cartItems && cartItems.map(item =>
                        <CartItem
                            expand
                            fixed
                            imageWrapperClass="checkout__order-img"
                            key={item.details.id}
                            id={item.details.id}
                            image={item.details.image.childImageSharp.fluid}
                            price={item.details.price}
                            title={item.details.title}
                            quantity={item.quantity} />)}
                </div>
            </div>
        </div>
    )
}

export default orderDetails
