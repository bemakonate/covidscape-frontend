import React, { useState, useEffect } from 'react'
import Layout from '../components/layout/layout';
import { connect } from 'react-redux';
import * as actions from '../store/cart/actions';
import { navigate } from 'gatsby';
import Summary from '../components/layout/checkout/summary';
import OrderDetails from '../components/layout/checkout/orderDetails';
import OnlinePayment from '../components/layout/checkout/online-payment';
import ContactForm from '../components/layout/checkout/contactForm';
import { shouldPayShipping, getTaxes, SHIPPING_RATE, cartSubtotal } from '../constants/helpers/cart-helpers';
import BackdropSpinner from '../components/reusable/backdropSpinner';
import axios from 'axios';
import AddressModal from '../components/layout/checkout/address-modal';

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
    const [userAddress, setUserAddress] = useState({ address: '', coordinates: [] });
    const [showAddressModal, setShowAddressModal] = useState(false);



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
            props.onClearCart();
            navigate('/confirmation');
        }
    }, [isPaymentSuccessful])


    //Once we get the cart items, make a request to the payment intent api
    /* (We get a token from the api that will store information on the charge we about to create, 
    and the total based on the cart we passed) */

    useEffect(() => {
        const loadToken = async (cart) => {
            const response = await axios.post('http://localhost:1337/orders/payment', { cart });
            const data = response.data;

            setToken(data.client_secret);
            setServerTotal(data.amount);
            setLoading(false);
        }


        if (cartItems.length > 0) {
            loadToken(serverCart);
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
                            <ContactForm
                                getFormData={updateBillingDetails}
                                getIsFormValid={updateContactFormValidity}
                                addressInput={userAddress ? userAddress.address : null}
                                openAddressModal={() => setShowAddressModal(true)} />
                        </div>
                    </section>




                    <section className="payment-option-section checkout-section">
                        <h3>Payment Option</h3>
                        <OnlinePayment
                            serverTotal={serverTotal}
                            billingDetails={billingDetails}
                            serverCart={serverCart}
                            token={token}
                            isContactFormValid={isContactFormValid}
                            getIsPaymentSuccessful={getIsPaymentSuccessful}
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

            <AddressModal
                show={showAddressModal}
                getAddress={(address) => setUserAddress(address)}
                coordinates={userAddress ? userAddress.coordinates : null}
                close={() => setShowAddressModal(false)} />

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
        cartItems: state.cart.cart,
        totalPrice: state.cart.totalPrice
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
