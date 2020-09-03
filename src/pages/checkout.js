import React, { useState, useEffect } from 'react'
import Layout from '../components/layout/layout';
import ContactForm from '../components/layout/checkout/contactForm';
import { connect } from 'react-redux';
import { navigate } from 'gatsby';
import Summary from '../components/layout/checkout/summary';
import OrderDetails from '../components/layout/checkout/orderDetails';
import OnlinePayment from '../components/layout/checkout/online-payment';


const Checkout = (props) => {
    const { cartItems, totalPrice } = props;

    const [hasPaymentPassed, setHasPaymentPassed] = useState(false);
    const [billingDetails, setBillingDetails] = useState(null);

    const setPaymentPassed = () => setPaymentPassed(true);

    useEffect(() => {
        if (hasPaymentPassed) {
            navigate('/');
        }
    }, [hasPaymentPassed]);


    const updateBillingDetails = (formData) => setBillingDetails(formData);


    return (
        <Layout addPadding>
            <div className="container">

                <main className="checkout__wrapper">
                    <div className="payment-info">

                        <section className="contact-info-section checkout-section">
                            <h3>Contact Information</h3>
                            <div className="contact-form__wrapper">
                                <ContactForm getFormData={updateBillingDetails} />
                            </div>
                        </section>

                        <section className="order-details-section checkout-section">
                            <h3>Order Details</h3>
                            <OrderDetails cartItems={cartItems} />
                        </section>


                        <section className="payment-option-section checkout-section">
                            <h3>Payment Option</h3>
                            <OnlinePayment setPaymentPassed={setPaymentPassed} />
                        </section>
                    </div>


                    <section className="checkout__summary">
                        <Summary totalPrice={totalPrice} />
                    </section>
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

export default connect(mapStateToProps)(Checkout);
