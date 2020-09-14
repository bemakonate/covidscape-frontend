import React from 'react';
import Layout from '../components/layout/layout';
import CartItem from '../components/reusable/cartItem';
import { Link } from 'gatsby';
import { connect } from 'react-redux';
import * as actions from '../store/cart/actions';
import Dollar from '../components/reusable/dollar';
import Spinner from '../components/reusable/spinner';
import { cartSubtotal } from '../constants/helpers/cart-helpers';
import BackdropSpinner from '../components/reusable/loadingBackdrop';
import SEO from '../components/reusable/SEO';

const Cart = (props) => {
    const { cartItems, onChangeItemQuantity, onRemoveItem } = props;
    let cartJSX = null;

    if (cartItems.length > 0) {
        cartJSX = (
            <section className="cart-section">
                <div className="cart-items">
                    <div className="cart__text-container">
                        {cartItems.map(item =>
                            <CartItem
                                expand
                                key={item.details.id}
                                id={item.details.id}
                                image={item.details.image.childImageSharp.fluid}
                                price={item.details.price}
                                title={item.details.title}
                                quantity={item.quantity}
                                removeItem={onRemoveItem}
                                slug={`/products/${item.details.slug}`}
                                changeItemQuantity={onChangeItemQuantity} />)}
                    </div>
                </div>

                <div className="cart__redirect-to-checkout">
                    <div className="cart__text-container cart-subtotal-container">
                        <div className="cart__subtotal">
                            <p className="cart__subtotal-label">Subtotal:</p>
                            <p className="cart__subtotal-price"><Dollar num={cartSubtotal(cartItems)} /></p>
                        </div>
                        <Link className="checkout-btn" to="/checkout">Checkout</Link>
                    </div>

                </div>
            </section>


        )
    } else {
        cartJSX = (
            <React.Fragment>
                No Items in the cart
            </React.Fragment>
        )
    }
    return (
        <Layout addPadding>
            <SEO title="Cart" />
            <header className="cart-header">
                <h2 className="cart-header__title">Cart</h2>
                <p className="cart-header__tagline">View the items you saved to your cart</p>
            </header>
            <div className="container">
                {cartJSX}
            </div>
        </Layout>
    )

    // return <BackdropSpinner show styleClass="loading-bg" spinnerColor="black"></BackdropSpinner>
}

const mapStateToProps = state => {
    return {
        cartItems: state.cart.cart,
        totalPrice: state.cart.totalPrice,
        loadedCart: state.cart.loadedCart
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onChangeItemQuantity: (id, quantity) => dispatch(actions.changeItemQuantity(id, quantity)),
        onRemoveItem: (id) => dispatch(actions.removeItem(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
