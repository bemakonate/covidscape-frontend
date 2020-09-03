import React, { useState } from 'react';
import { FaCreditCard, FaApple } from 'react-icons/fa';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';


const stripePromise = loadStripe("pk_test_m1hvQaQOYv4JZTDoURWSNrqI00IEEiULrF");

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


const CheckoutForm = ({ success }) => {
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



const OnlinePayment = ({ setPaymentPassed }) => {
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
                <CheckoutForm success={setPaymentPassed} />
            </Elements>
            {/* ================Stripe elment here================= */}
        </article>
    )
}

export default OnlinePayment
