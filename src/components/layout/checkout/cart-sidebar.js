import React, { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { Link } from 'gatsby';
import CartItem from '../../reusable/cartItem';
import Backdrop from '../../basic/Backdrop/Backdrop';
import Dollar from '../../reusable/dollar';




const CartSidebar = (props) => {

    const cartItems = props.cartItems;
    const [sidebarTranstion, setSidebarTransition] = useState('');
    let cartSidebarContent = null;

    useEffect(() => {
        if (props.isCartSidebarOpen) {
            setSidebarTransition('js-og-position')
        } else {
            setSidebarTransition('')
        }
    }, [props.isCartSidebarOpen]);



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
                    <p className="subtotal-price"><Dollar num={props.cartTotalPrice} /></p>
                </div>
                <Link to="/cart" className="cart-sidebar__cart-link" onClick={props.closeCartSidebar}>View Cart</Link>
            </React.Fragment>
        )
    } else {
        cartSidebarContent = (
            <div>
                No Items in your cart
            </div>
        )
    }
    return (
        <Backdrop show={props.isCartSidebarOpen} click={props.closeCartSidebar}>

            <div className={`cart-sidebar ${sidebarTranstion}`}>
                <div className="cart-sidebar__container">
                    <div className="cart-sidebar__close" onClick={props.closeCartSidebar}><MdClose /></div>
                    {cartSidebarContent}
                </div>
            </div>
        </Backdrop>
    )
}

export default CartSidebar
