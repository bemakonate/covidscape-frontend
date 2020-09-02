import React from 'react';
import Layout from '../components/layout/layout';
import CartItem from '../components/cartItem/cartItem';
import { Link } from 'gatsby';
import { connect } from 'react-redux';
import { formatNumber } from '../constants/helpers';
import * as actions from '../store/actions';


const Cart = (props) => {
    const { cartItems, onChangeItemQuantity, onRemoveItem, totalPrice, loadedCart } = props;
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
                                changeItemQuantity={onChangeItemQuantity} />)}
                    </div>
                </div>

                <div className="cart__redirect-to-checkout">
                    <div className="cart__text-container cart-subtotal-container">
                        <div className="cart__subtotal">
                            <p className="cart__subtotal-label">Subtotal:</p>
                            <p className="cart__subtotal-price"><span className="dollar-sign">$</span>{formatNumber(totalPrice)}</p>
                        </div>
                        <Link className="checkout-btn" to="/checkout">Checkout</Link>
                    </div>

                </div>
            </section>


        )
    }
    return (
        <Layout addPadding>
            <header className="cart-header">
                <h2 className="cart-header__title">Cart</h2>
                <p className="cart-header__tagline">View the items you saved to your cart</p>
            </header>
            <div className="container">
                {cartJSX}
            </div>




        </Layout>
    )
}

const mapStateToProps = state => {
    return {
        cartItems: state.cart,
        totalPrice: state.totalPrice,
        loadedCart: state.loadedCart
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onChangeItemQuantity: (id, quantity) => dispatch(actions.changeItemQuantity(id, quantity)),
        onRemoveItem: (id) => dispatch(actions.removeItem(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
