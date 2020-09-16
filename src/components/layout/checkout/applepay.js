import React, { useState, useEffect, useContext } from 'react'
import { PaymentRequestButtonElement, useStripe } from '@stripe/react-stripe-js';
import PaymentContext from './../../../context/apple-pay-context';
import { connect } from 'react-redux';
import * as layoutActions from '../../../store/layout/actions';

const ApplePay = ({ ...props }) => {

    const paymentContext = useContext(PaymentContext);
    const [success, setSuccess] = useState(false);
    const [isStripeLoaded, setIsStripeLoaded] = useState(null);
    const [orderData, setOrderData] = useState(null);
    const [paymentBeingProcessed, setPaymentBeingProcessed] = useState(false);
    const { token } = paymentContext;

    //=====================STRIPE DOCS===================
    const stripe = useStripe();
    const [paymentRequest, setPaymentRequest] = useState(null);


    useEffect(() => {
        if (stripe) {
            const pr = stripe.paymentRequest({
                country: 'US',
                currency: 'usd',
                total: {
                    label: 'Demo total',
                    amount: .50,
                },
                requestPayerName: true,
                requestPayerEmail: true,
            });

            // Check the availability of the Payment Request API.
            pr.canMakePayment().then(result => {
                if (result) {
                    setPaymentRequest(pr);
                }
            });
        }
    }, [stripe]);



    paymentRequest.on('paymentmethod', async (ev) => {
        // Confirm the PaymentIntent without handling potential next actions (yet).
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            token,
            { payment_method: ev.paymentMethod.id },
            { handleActions: false }
        );


        props.openFlashMessage('[applepay.js] paymentIntent', JSON.stringify(paymentIntent));
        if (confirmError) {
            // Report to the browser that the payment failed, prompting it to
            // re-show the payment interface, or show an error message and close
            // the payment interface.
            ev.complete('fail');
        } else {
            // Report to the browser that the confirmation was successful, prompting
            // it to close the browser payment method collection interface.
            ev.complete('success');
            // Check if the PaymentIntent requires any actions and if so let Stripe.js
            // handle the flow. If using an API version older than "2019-02-11" instead
            // instead check for: `paymentIntent.status === "requires_source_action"`.
            if (paymentIntent.status === "requires_action") {
                // Let Stripe.js handle the rest of the payment flow.
                const { error } = await stripe.confirmCardPayment(token);
                if (error) {
                    // The payment failed -- ask your customer for a new payment method.
                } else {
                    // The payment has succeeded.
                }
            } else {
                // The payment has succeeded.
            }
        }
    });

    //=====================STRIPE DOCS===================



    //Defaults 
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



    if (paymentRequest) {
        return <PaymentRequestButtonElement options={{ paymentRequest }} />
    }

    return <p>Can't use apple pay</p>
}

const mapDispatchToProps = dispatch => {
    return {
        openFlashMessage: ({ message, props }) => dispatch(layoutActions.openFlashMessage({ message, props })),
        closeFlashMessage: () => dispatch(layoutActions.closeFlashMessage()),
    }
}
export default connect(null, mapDispatchToProps)(ApplePay)
