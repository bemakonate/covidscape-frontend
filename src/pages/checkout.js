import React, { useState, useEffect } from 'react'
import Layout from '../components/layout/layout';
import axios from '../constants/axios-backend';
import { connect } from 'react-redux';
import * as actions from '../store/cart/actions';
import { navigate } from 'gatsby';
import PaymentContext from '../context/payment-context';

import SEO from '../components/reusable/SEO';
import Summary from '../components/layout/checkout/summary';
import OrderDetails from '../components/layout/checkout/orderDetails';
import OnlinePayment from '../components/layout/checkout/online-payment';
import ContactForm from '../components/layout/checkout/contactForm';
import LoadingBackdrop from '../components/reusable/loadingBackdrop';
import AddressModal from '../components/layout/checkout/address-modal';


const Checkout = (props) => {
    const { cartItems, onAddOrderData, onAddOrderCart } = props;
    let checkoutJSX = null;

    //Component stages and position state
    const [loading, setLoading] = useState(true);
    const [isPaymentBeingProcessed, setIsPaymentBeingProcessed] = useState(false);
    const [isContactFormValid, setIsContactFormValid] = useState(false);
    const [isStripeLoaded, setIsStripeLoaded] = useState(null);
    const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(null);
    const [showAddressModal, setShowAddressModal] = useState(false);

    //Component data state
    const [billingDetails, setBillingDetails] = useState(null);
    const [serverSummary, setServerSummary] = useState(null);
    const [token, setToken] = useState(null);
    const [orderData, setOrderData] = useState(null);
    const [userAddress, setUserAddress] = useState({ address: '', coordinates: [] });





    const getIsPaymentSuccessful = (boolean) => setIsPaymentSuccessful(boolean);
    const updateContactFormValidity = (boolean) => setIsContactFormValid(boolean);
    const getIsStripeLoaded = (boolean) => setIsStripeLoaded(boolean);
    const getIsPaymentBeingProcessed = (boolean) => setIsPaymentBeingProcessed(boolean);
    const updateBillingDetails = (formData) => setBillingDetails(formData);
    const getOrderData = (data) => setOrderData(data);


    if (!cartItems.length) {
        navigate('/cart');
    }

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
            const response = await axios.post('/orders/payment', { cart });
            const data = response.data;

            setToken(data.paymentIntent.client_secret);
            setServerSummary(data.summary);
            setLoading(false);
        }


        if (cartItems.length > 0) {
            loadToken(serverCart);
        }

    }, [cartItems])






    if (cartItems && serverSummary) {
        const checkoutSummary = <Summary serverSummary={serverSummary} />;

        checkoutJSX = (
            <React.Fragment>

                <div className="payment-info">
                    <section className="order-details-section checkout-section">
                        <h3>Order Details</h3>
                        <OrderDetails cartItems={cartItems} />
                    </section>


                    <section className="checkout__summary checkout__summary--mb">
                        <Summary serverSummary={serverSummary} />
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

                        <PaymentContext.Provider value={{
                            serverSummary,
                            billingDetails,
                            serverCart,
                            token,
                            isContactFormValid,
                            getIsPaymentSuccessful,
                            getIsStripeLoaded,
                            getIsPaymentBeingProcessed,
                            getOrderData,
                        }}>
                            <OnlinePayment />

                        </PaymentContext.Provider>

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
            <SEO title="Checkout" />
            <LoadingBackdrop show={loading} />
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
