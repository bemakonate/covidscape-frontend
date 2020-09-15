import React, { useState, useEffect, useContext } from 'react';
import { CardElement, useStripe, useElements, PaymentRequestButtonElement } from '@stripe/react-stripe-js';
import axios from '../../../constants/axios-backend';
import Dollar from '../../reusable/dollar';
import { connect } from 'react-redux';
import * as layoutActions from '../../../store/layout/actions';
import PaymentContext from '../../../context/payment-context';

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


const CheckoutForm = ({ ...props }) => {
    const stripe = useStripe();
    const elements = useElements();

    const [success, setSuccess] = useState(false);
    const [isStripeLoaded, setIsStripeLoaded] = useState(null);
    const [orderData, setOrderData] = useState(null);
    const [paymentBeingProcessed, setPaymentBeingProcessed] = useState(false);

    const paymentContext = useContext(PaymentContext);
    const { billingDetails, serverCart, token, serverSummary, isContactFormValid } = paymentContext;


    //Check to see if stripe data has been loaded into the component
    useEffect(() => setIsStripeLoaded(stripe), [stripe]);


    //==========UPDATE CHECKOUTPAGE PROPS==============
    useEffect(() => {
        if (paymentContext.getIsStripeLoaded) {
            paymentContext.getIsStripeLoaded(isStripeLoaded)
        }
    }, [isStripeLoaded])


    useEffect(() => {
        if (paymentContext.getIsPaymentSuccessful) {
            paymentContext.getIsPaymentSuccessful(success);
        }
    }, [success])

    useEffect(() => {
        if (paymentContext.getOrderData) {
            paymentContext.getOrderData(orderData);
        }
    }, [orderData])

    useEffect(() => {
        if (paymentContext.getIsPaymentBeingProcessed) {
            paymentContext.getIsPaymentBeingProcessed(paymentBeingProcessed)
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
            currentDate: new Date(),
        }

        //Create a new order collection
        try {
            const res = await axios.post('/orders', data);
            setOrderData(res.data);
            setPaymentBeingProcessed(false);
            props.closeFlashMessage();
            setSuccess(true);
        } catch (err) {
            props.openFlashMessage({ message: 'There was a problem with the server, sorry' })
            setPaymentBeingProcessed(false);
        }

    }


    return (
        <form>
            {success && <p>Your order was successfully processed</p>}
            <div className="card-element">
                <CardElement options={CARD_ELEMENT_OPTIONS} />
            </div>
            {!isContactFormValid ? <span className="purchase-warning">Complete Form to purchase</span> : null}
            <button
                className="buy-btn"
                disabled={(!stripe) || (!isContactFormValid)}
                onClick={chargeUserHandler}>Pay <Dollar num={serverSummary.total} /></button>
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