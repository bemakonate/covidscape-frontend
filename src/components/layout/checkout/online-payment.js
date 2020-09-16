import React, { useState } from 'react';
import { FaCreditCard, FaApple } from 'react-icons/fa';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './checkoutForm';
import ApplePay from './applepay';


const stripePromise = loadStripe("pk_test_m1hvQaQOYv4JZTDoURWSNrqI00IEEiULrF");

const OnlinePayment = () => {
    const [payOption, setPayOption] = useState('card');
    const payChangeHandler = (value) => setPayOption(value);

    const cardPaymentJSX = <CheckoutForm />


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
            <Elements stripe={stripePromise}>
                {payOption === 'card' ? cardPaymentJSX : null}
                {payOption === 'apple-pay' ? <ApplePay /> : null}
            </Elements>

        </article>
    )
}

export default OnlinePayment
