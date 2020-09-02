import React, { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { Link } from 'gatsby';
import CartItem from '../../cartItem/cartItem';
import { formatNumber } from '../../../constants/helpers';




const CartSidebar = (props) => {
    const [cartItems, setCartItems] = useState(props.cartItems);
    let cartSidebarContent = null;


    useEffect(() => {
        setCartItems(props.cartItems)
    }, [props.cartItems])


    if (cartItems.length > 0) {
        cartSidebarContent = (
            <React.Fragment>
                <div className="cart-items">
                    {cartItems.map(item =>
                        <CartItem
                            key={item.details.id}
                            id={item.details.id}
                            image={item.details.image.childImageSharp.fluid}
                            price={item.details.price}
                            title={item.details.title}
                            slug={`/products/${item.details.slug}`}
                            quantity={item.quantity}
                            removeItem={props.removeItem}
                            changeItemQuantity={props.changeItemQuantity} />)}
                </div>


                <div className="line"></div>
                <div className="subtotal-container">
                    <p className="subtotal-label">Subtotal</p>
                    <p className="subtotal-price">${formatNumber(props.cartTotalPrice || 0)}</p>
                </div>
                <Link to="/cart" className="cart-sidebar__cart-link" onClick={props.closeCartSidebar}>View Cart</Link>
            </React.Fragment>
        )
    }
    return (
        <div className={`cart-sidebar ${props.isCartSidebarOpen ? 'js-og-position' : ''}`}>
            <div className="cart-sidebar__container">
                <div className="cart-sidebar__close" onClick={props.closeCartSidebar}><MdClose /></div>
                {cartSidebarContent}

            </div>

        </div>
    )
}

export default CartSidebar
