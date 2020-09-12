import React from 'react'
import Layout from '../components/layout/layout';
import { connect } from 'react-redux';
import * as actions from '../store/cart/actions';
import CartItem from '../components/reusable/cartItem';
import Dollar from '../components/reusable/dollar';

const Confirmation = (props) => {
    const { orderData, orderCart } = props;
    let pageJSX = <p>If you alredy have an order check your email for confirmation</p>


    if (orderData && orderCart) {
        pageJSX = (
            <React.Fragment>

                <div className="confirmation-page__container">
                    <header className="page-header">
                        <h2 className="page-header__title">Thank you!</h2>
                        <p className="page-header__details">Your order has been processed. Check email for confirmation of your order</p>

                        <button className="back-home-btn">Continue Shopping</button>
                    </header>


                    <h3>Order Id: #{orderData.order_id}</h3>
                    <div className="first-row">

                        <section className="order-details-section sect">
                            <h3 className="order-details__title sect-title">Order Details</h3>
                            <div className="order-details">
                                <div className="order-detail">
                                    <p className="order-detail__title">Customer name</p>
                                    <p className="order-detail__desc">{orderData.customer_name}</p>
                                </div>

                                <div className="order-detail">
                                    <p className="order-detail__title">Address</p>
                                    <p className="order-detail__desc">{orderData.customer_details.address}</p>
                                </div>

                                <div className="order-detail">
                                    <p className="order-detail__title">Email</p>
                                    <p className="order-detail__desc">{orderData.customer_details.email}</p>
                                </div>
                                <div className="order-detail">
                                    <p className="order-detail__title">Phone</p>
                                    <p className="order-detail__desc">{orderData.customer_details.phone}</p>
                                </div>
                                <div className="order-detail">
                                    <p className="order-detail__title">Order Date</p>
                                    <p className="order-detail__desc">{orderData.order_date}</p>
                                </div>
                            </div>
                        </section>


                        <section className="order-summary-section sect">
                            <h3 className="sect-title">Order Summary</h3>
                            <div className="order-summary">
                                <div className="checkout-subtotal-container">
                                    <div className="summary-row">
                                        <p className="summary-row-label">Subtotal</p>
                                        <p className="summary-row-detail"><Dollar num={orderData.subtotal} /></p>
                                    </div>
                                    <div className="summary-row">
                                        <p className="summary-row-label">Shipping</p>
                                        <p className="summary-row-detail">
                                            <Dollar num={orderData.shipping_cost} />
                                        </p>
                                    </div>

                                    <div className="summary-row">
                                        <p className="summary-row-label"> Tax</p>
                                        <p className="summary-row-detail"><Dollar num={orderData.taxes} /></p>
                                    </div>
                                    <div className="line"></div>

                                    <div className="summary-total">
                                        <p className="summary-total-label">Total</p>
                                        <p className="summary-total-price">
                                            <Dollar num={orderData.total} />
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </section>
                    </div>

                    <section className="order-cart-section sect">
                        <h3 className="sect-title">Order Cart</h3>
                        <div className="cart-items">
                            {orderCart && orderCart.map(item =>
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
                    </section>
                </div>
            </React.Fragment>
        )

    }

    return (
        <Layout addPadding>
            <div className="confirmation-page">
                {pageJSX}
            </div>
        </Layout >
    )
}

const mapStateToProps = state => {
    return {
        // cartItems: state.cart.cart,
        // totalPrice: state.cart.totalPrice,
        orderData: state.cart.orderData,
        orderCart: state.cart.orderCart,
    }
}

export default connect(mapStateToProps)(Confirmation)
