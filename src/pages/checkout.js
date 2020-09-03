import React, { useState, useEffect } from 'react'
import Layout from '../components/layout/layout';
import ContactForm from '../components/checkout/contactForm';
import { connect } from 'react-redux';
import CartItem from '../components/cartItem/cartItem';
import { FaCreditCard, FaApple } from 'react-icons/fa';
import { Link, navigate } from 'gatsby';
import { formatNumber } from '../constants/helpers';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import axios from 'axios';

const stripePromise = loadStripe("pk_test_m1hvQaQOYv4JZTDoURWSNrqI00IEEiULrF");

//Stop the user from the paying twice. Use a state

const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            color: '#32325d',
            fontFamily: '"Josefin Sans", sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '16px',
            '::placeholder': {
                color: '#787878'
            }
        },
        invalid: {
            color: '#fa755a',
            iconColor: '#fa755a'
        }
    }
};


const CheckoutForm = ({ success, billingDetails }) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        })

        if (!error) {
            const { id } = paymentMethod;

            try {
                const response = await axios.post(`http://localhost:1337/orders/payment`, {
                    id,
                    amount: 1099
                });

                const data = response.data;
                // success();
            } catch (err) {
                //Send flash message 
                console.log(err);
            }
        }
    }


    return <form onSubmit={handleSubmit}>
        <div className="card-element">
            <CardElement options={CARD_ELEMENT_OPTIONS} />
        </div>
        <p>Error goes here</p>

        <button type="submit" disabled={!stripe}>Submit</button>
    </form>
}


const Checkout = (props) => {
    const [payOption, setPayOption] = useState('card');
    const { cartItems, totalPrice } = props;

    const [paymentPassed, setPaymentPassed] = useState(false);
    const [billingDetails, setBillingDetails] = useState(null);


    useEffect(() => {
        if (paymentPassed) {
            navigate('/');
        }
    }, [paymentPassed]);

    const updateBillingDetails = (formData) => setBillingDetails(formData);
    const payChangeHandler = (value) => setPayOption(value);




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
                            <div className="checkout__order-details">
                                <div className="cart-items">
                                    <div className="cart__text-container">
                                        {cartItems && cartItems.map(item =>
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
                                </div>
                            </div>
                        </section>


                        <section className="payment-option-section checkout-section">
                            <h3>Payment Option</h3>
                            <article className="payment-option-wrapper">
                                <div className="payment-options">
                                    <div className="payment-option">
                                        <input
                                            type="radio"
                                            name="payment"
                                            id="card"
                                            value="card"
                                            checked={payOption === 'card'}
                                            className="payment-radio"
                                            onChange={() => payChangeHandler('card')} />
                                        <label for="card" className="payment-radio-label"><FaCreditCard className="payment-icon" /> Use Card</label>
                                    </div>

                                    <div className="payment-option">
                                        <input
                                            type="radio"
                                            name="payment"
                                            id="apple-pay"
                                            value="apple-pay"
                                            className="payment-radio"
                                            checked={payOption === 'apple-pay'}
                                            onChange={() => payChangeHandler('apple-pay')} />
                                        <label for="apple-pay" className="payment-radio-label"><FaApple className="payment-icon" /> Apple Pay </label>
                                    </div>
                                </div>

                                {/* ================Stripe elment here================= */}
                                <Elements stripe={stripePromise}>
                                    <CheckoutForm success={() => setPaymentPassed(true)} billingDetails={billingDetails} cartItems={cartItems} />
                                </Elements>
                                {/* ================Stripe elment here================= */}
                            </article>
                        </section>
                    </div>


                    <section className="checkout__summary">

                        <article className="checkout-totals">
                            <div className="checkout__text-container">
                                <h2>Summary</h2>
                                <div className="checkout-subtotal-container">
                                    <div className="subtotal-container">
                                        <p className="subtotal-label">Subtotal</p>
                                        <p className="subtotal-price"><span className="dollar-sign">$</span>{formatNumber(totalPrice)}</p>
                                    </div>
                                    <div className="subtotal-container">
                                        <p className="subtotal-label">Shipping</p>
                                        <p className="subtotal-price">Free</p>
                                    </div>
                                    <div className="line"></div>
                                    <div className="subtotal-container">
                                        <p className="subtotal-label total-label">Total</p>
                                        <p className="subtotal-price total-price">
                                            <span className="dollar-sign">$</span>{formatNumber(totalPrice)}
                                        </p>
                                    </div>
                                </div>

                                <button className="checkout-btn">Pay <span className="dollar-sign">$</span>{formatNumber(totalPrice)} </button>
                            </div>
                        </article>
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
