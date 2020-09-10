import React, { useState, useEffect } from 'react'
import Layout from '../components/layout/layout';
import { connect } from 'react-redux';
import * as actions from '../store/actions';
import { navigate } from 'gatsby';
import Summary from '../components/layout/checkout/summary';
import OrderDetails from '../components/layout/checkout/orderDetails';
import OnlinePayment from '../components/layout/checkout/online-payment';
import ContactForm from '../components/layout/checkout/contactForm';
import { shouldPayShipping, getTaxes, SHIPPING_RATE, cartSubtotal } from '../constants/helpers/cart-helpers';
import BackdropSpinner from '../components/reusable/backdropSpinner';
import axios from 'axios';

const Checkout = (props) => {
    const { cartItems, onAddOrderData, onAddOrderCart } = props;
    let checkoutJSX = null;

    const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(null);
    const [billingDetails, setBillingDetails] = useState(null);
    const [serverTotal, setServerTotal] = useState(null);
    const [isContactFormValid, setIsContactFormValid] = useState(false);
    const [isStripeLoaded, setIsStripeLoaded] = useState(null);
    const [token, setToken] = useState(null);
    const [orderData, setOrderData] = useState(null);
    const [isPaymentBeingProcessed, setIsPaymentBeingProcessed] = useState(false);
    const [loading, setLoading] = useState(true);



    const getIsPaymentSuccessful = (boolean) => setIsPaymentSuccessful(boolean);
    const updateBillingDetails = (formData) => setBillingDetails(formData);
    const updateContactFormValidity = (boolean) => setIsContactFormValid(boolean);
    const getIsStripeLoaded = (boolean) => setIsStripeLoaded(boolean);
    const getOrderData = (data) => setOrderData(data);
    const getIsPaymentBeingProcessed = (boolean) => setIsPaymentBeingProcessed(boolean);


    // if (!cartItems.length) {
    //     navigate('/cart');
    // }



    useEffect(() => {
        if (isStripeLoaded && token && cartItems) {
            if (isPaymentBeingProcessed) {
                setLoading(true);
            } else {
                setLoading(false);
            }
        }

    }, [isPaymentBeingProcessed])



    const serverCart = cartItems.map(product => {
        return {
            id: product.details.id,
            qty: product.quantity
        }
    })


    useEffect(() => {
        if (isPaymentSuccessful && orderData) {
            onAddOrderData(orderData)
            onAddOrderCart(cartItems)
            navigate('/confirmation');
        }
    }, [isPaymentSuccessful])


    //Once we get the cart items, make a request to the payment intent api
    /* (We get a token from the api that will store information on the charge we about to create, 
    and the total based on the cart we passed) */

    useEffect(() => {
        const loadToken = async () => {
            const response = await axios.post('http://localhost:1337/orders/payment', { cart: serverCart });
            const data = response.data;

            setToken(data.client_secret);
            setServerTotal(data.amount);
            setLoading(false);
        }


        if (cartItems.length > 0) {
            loadToken();
        }

    }, [cartItems])






    if (cartItems && serverTotal) {
        const checkoutSummary = (
            <Summary
                total={serverTotal}
                taxes={getTaxes(cartItems)}
                shipping={SHIPPING_RATE}
                subtotal={cartSubtotal(cartItems)}
                shouldPayShipping={shouldPayShipping(cartItems)} />
        )


        checkoutJSX = (
            <React.Fragment>
                <div className="payment-info">
                    <section className="order-details-section checkout-section">
                        <h3>Order Details</h3>
                        <OrderDetails cartItems={cartItems} />
                    </section>


                    <section className="checkout__summary checkout__summary--mb">
                        {checkoutSummary}
                    </section>

                    <section className="contact-info-section checkout-section">
                        <h3>Contact Information</h3>
                        <div className="contact-form__wrapper">
                            <ContactForm getFormData={updateBillingDetails} getIsFormValid={updateContactFormValidity} />
                        </div>
                    </section>




                    <section className="payment-option-section checkout-section">
                        <h3>Payment Option</h3>
                        <OnlinePayment
                            serverTotal={serverTotal}
                            getIsPaymentSuccessful={getIsPaymentSuccessful}
                            billingDetails={billingDetails}
                            serverCart={serverCart}
                            token={token}
                            getIsStripeLoaded={getIsStripeLoaded}
                            getOrderData={getOrderData}
                            getIsPaymentBeingProcessed={getIsPaymentBeingProcessed} />
                    </section>
                </div>


                <section className="checkout__summary checkout__summary--med">
                    {checkoutSummary}
                </section>

            </React.Fragment>
        )

    }


    return (
        <Layout addPadding>
            <BackdropSpinner show={loading} styleClass="loading-bg" contentClass="loading-content" spinnerColor="black"></BackdropSpinner>;
            <div className="container">
                <main className="checkout__wrapper">
                    {checkoutJSX}
                </main>
            </div>

        </Layout >
    )
}

const mapStateToProps = state => {
    return {
        cartItems: state.cart,
        totalPrice: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onClearCart: () => dispatch(actions.clearCart()),
        onAddOrderData: (orderData) => dispatch(actions.addOrderData(orderData)),
        onAddOrderCart: (orderCart) => dispatch(actions.addOrderCart(orderCart)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
