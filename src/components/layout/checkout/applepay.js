import React, { useState, useEffect } from 'react'
import { PaymentRequestButtonElement, useStripe } from '@stripe/react-stripe-js';

const ApplePay = () => {
    const stripe = useStripe();
    const [paymentRequest, setPaymentRequest] = useState(null);


    useEffect(() => {
        if (stripe) {
            const pr = stripe.paymentRequest({
                country: 'US',
                currency: 'usd',
                total: {
                    label: 'Demo total',
                    amount: 1099,
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

    if (paymentRequest) {
        return <PaymentRequestButtonElement options={{ paymentRequest }} />
    }

    return <p>Can't use apple pay</p>
}

export default ApplePay
