import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements, PaymentRequestButtonElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import Dollar from '../../reusable/dollar';
import { connect } from 'react-redux';
import * as layoutActions from '../../../store/layout/actions';

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


const CheckoutForm = ({ billingDetails, serverCart, token, ...props }) => {
    const stripe = useStripe();
    const elements = useElements();

    const [success, setSuccess] = useState(false);
    const [isStripeLoaded, setIsStripeLoaded] = useState(null);
    const [orderData, setOrderData] = useState(null);
    const [paymentBeingProcessed, setPaymentBeingProcessed] = useState(false);



    //Check to see if stripe data has been loaded into the component
    useEffect(() => setIsStripeLoaded(stripe), [stripe]);


    //==========UPDATE CHECKOUTPAGE PROPS==============
    useEffect(() => {
        if (props.getIsStripeLoaded) {
            props.getIsStripeLoaded(isStripeLoaded)
        }
    }, [isStripeLoaded])


    useEffect(() => {
        if (props.getIsPaymentSuccessful) {
            props.getIsPaymentSuccessful(success);
        }
    }, [success])

    useEffect(() => {
        if (props.getOrderData) {
            props.getOrderData(orderData);
        }
    }, [orderData])

    useEffect(() => {
        if (props.getIsPaymentBeingProcessed) {
            props.getIsPaymentBeingProcessed(paymentBeingProcessed)
        }
    }, [paymentBeingProcessed])

    //==========CREATE CHARGE FOR USER==============
    const chargeUserHandler = async (e) => {
        e.preventDefault();
        setPaymentBeingProcessed(true);

        //Create a new payment with the card element data. And see if the payment is passed
        let result;
        try {
            result = await stripe.confirmCardPayment(token, {
                payment_method: {
                    card: elements.getElement(CardElement)
                }
            })

            //If the card payment had a problem throw the error
            if (result.error) {
                throw new Error(result.error.message);
            }

        } catch (err) {
            //Deal with card error here
            setPaymentBeingProcessed(false);
            props.openFlashMessage({ message: err.message })
            console.log(err);
        }


        //Properites need to be same as strapi fields for content type
        const customerBillingDetails = {
            customerName: billingDetails.firstName,
            customerAddress: billingDetails.address,
            customerEmail: billingDetails.email,
            customerPhone: billingDetails.phoneNum,
        }

        const data = {
            paymentIntent: result.paymentIntent,
            ...customerBillingDetails,
            cart: serverCart,
        }

        //Create a new order collection
        const res = await axios.post('http://localhost:1337/orders', data);

        setOrderData(res.data);
        setPaymentBeingProcessed(false);
        props.closeFlashMessage();
        setSuccess(true);
    }


    return (
        <form>
            {success && <p>Your order was successfully processed</p>}
            <div className="card-element">
                <CardElement options={CARD_ELEMENT_OPTIONS} />
            </div>
            {!props.isContactFormValid ? <span className="purchase-warning">Complete Form to purchase</span> : null}
            <button
                className="buy-btn"
                disabled={(!stripe) || (!props.isContactFormValid)}
                onClick={chargeUserHandler}>Pay <Dollar cents={props.serverTotal} /></button>
        </form>
    );

}


const mapDispatchToProps = dispatch => {
    return {
        openFlashMessage: ({ message, props }) => dispatch(layoutActions.openFlashMessage({ message, props })),
        closeFlashMessage: () => dispatch(layoutActions.closeFlashMessage()),
    }

}
export default connect(null, mapDispatchToProps)(CheckoutForm);