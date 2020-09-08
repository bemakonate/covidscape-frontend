import React, { useState, useEffect } from 'react'
import Layout from '../components/layout/layout';
import ContactForm from '../components/layout/checkout/contactForm';
import { connect } from 'react-redux';
import { navigate } from 'gatsby';
import Summary from '../components/layout/checkout/summary';
import OrderDetails from '../components/layout/checkout/orderDetails';
import OnlinePayment from '../components/layout/checkout/online-payment';
import * as actions from '../store/actions';
import { shouldPayShipping, cartTotal, getTaxes, SHIPPING_RATE, cartSubtotal } from '../constants/helpers/cart-helpers';


const Checkout = (props) => {
    const { cartItems, totalPrice, onClearCart } = props;
    let checkoutJSX = null;

    // const [hasPaymentPassed, setHasPaymentPassed] = useState(false);
    const [billingDetails, setBillingDetails] = useState(null);
    const [serverTotal, setServerTotal] = useState(null);
    const [isContactFormValid, setIsContactFormValid] = useState(false);
    const [shouldChargeUser, setShouldChargeUser] = useState(false);
    const [isStripeLoaded, setIsStripeLoaded] = useState(null);



    // const setPaymentPassed = () => setPaymentPassed(true);
    const updateBillingDetails = (formData) => setBillingDetails(formData);
    const getServerTotal = (total) => setServerTotal(total);
    const updateContactFormValidity = (boolean) => setIsContactFormValid(boolean);
    const getIsStripeLoaded = (boolean) => setIsStripeLoaded(boolean);
    const updateShouldChargeUser = (boolean) => setShouldChargeUser(boolean);


    // if (!cartItems.length) {
    //     navigate('/cart');
    // }


    // useEffect(() => {
    //     if (hasPaymentPassed) {
    //         navigate('/');
    //     }
    // }, [hasPaymentPassed]);

    if (cartItems) {
        checkoutJSX = (
            <React.Fragment>


                <div className="payment-info">
                    <section className="order-details-section checkout-section">
                        <h3>Order Details</h3>
                        <OrderDetails cartItems={cartItems} />
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
                            // setPaymentPassed={setPaymentPassed}
                            billingDetails={billingDetails}
                            cartItems={cartItems}
                            clearCart={onClearCart}
                            shouldChargeUser={shouldChargeUser}
                            getServerTotal={getServerTotal}
                            getIsStripeLoaded={getIsStripeLoaded}
                            updateShouldChargeUser={updateShouldChargeUser} />
                    </section>
                </div>


                <section className="checkout__summary">
                    <Summary
                        total={serverTotal}
                        taxes={getTaxes(cartItems)}
                        shipping={SHIPPING_RATE}
                        subtotal={cartSubtotal(cartItems)}
                        shouldPayShipping={shouldPayShipping(cartItems)}
                        isContactFormValid={isContactFormValid}

                        isStripeLoaded={isStripeLoaded}
                        updateShouldChargeUser={updateShouldChargeUser}
                    />
                </section>
            </React.Fragment>
        )

    }


    return (
        <Layout addPadding>
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
