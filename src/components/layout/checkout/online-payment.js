import React, { useState } from 'react';
import { FaCreditCard, FaApple } from 'react-icons/fa';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './checkoutForm';


const stripePromise = loadStripe("pk_test_m1hvQaQOYv4JZTDoURWSNrqI00IEEiULrF");

const OnlinePayment = ({ setPaymentPassed, cartItems, getServerTotal, billingDetails, clearCart, shouldChargeUser, getIsStripeLoaded, updateShouldChargeUser }) => {
    const [payOption, setPayOption] = useState('card');
    const payChangeHandler = (value) => setPayOption(value);

    return (
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
                    <label htmlFor="card" className="payment-radio-label"><FaCreditCard className="payment-icon" /> Use Card</label>
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
                    <label htmlFor="apple-pay" className="payment-radio-label"><FaApple className="payment-icon" /> Apple Pay </label>
                </div>
            </div>

            {/* ================Stripe elment here================= */}
            <Elements stripe={stripePromise}>
                <CheckoutForm
                    success={setPaymentPassed}
                    cartItems={cartItems}
                    getServerTotal={getServerTotal}
                    billingDetails={billingDetails}
                    clearCart={clearCart}
                    shouldChargeUser={shouldChargeUser}
                    getIsStripeLoaded={getIsStripeLoaded}
                    updateShouldChargeUser={updateShouldChargeUser} />
            </Elements>
            {/* ================Stripe elment here================= */}
        </article>
    )
}

export default OnlinePayment
