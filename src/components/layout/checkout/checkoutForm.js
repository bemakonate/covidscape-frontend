import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { centsToDollar } from '../../../constants/helpers';


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


const CheckoutForm = ({ cartItems, billingDetails, ...props }) => {
    const stripe = useStripe();
    const elements = useElements();

    const [token, setToken] = useState(null);
    const [total, setTotal] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isStripeLoaded, setIsStripeLoaded] = useState(null);


    let checkoutFormJSX = null;

    const cart = cartItems.map(product => {
        return {
            id: product.details.id,
            qty: product.quantity
        }
    })

    //Check to see if stripe data has been loaded into the component
    useEffect(() => setIsStripeLoaded(stripe), [stripe])

    //Update checkout page about if stripe data has loaded
    useEffect(() => {
        if (props.getIsStripeLoaded) {
            props.getIsStripeLoaded(isStripeLoaded)
        }
    }, [isStripeLoaded])


    //If checkout page wants to charge user, first check if stripe was loaded. Then you can execute the charge
    useEffect(() => {
        if (props.shouldChargeUser && isStripeLoaded) {
            chargeUserHandler();
        }
    }, [props.shouldChargeUser])


    //Once we get the cart items, make a request to the payment intent api
    /* (We get a token from the api that will store information on the charge we about to create, 
    and the total based on the cart we passed) */
    useEffect(() => {
        const loadToken = async () => {
            const response = await axios.post('http://localhost:1337/orders/payment', { cart });
            const data = response.data;

            setToken(data.client_secret);
            setTotal(data.amount);
        }

        if (cartItems) {
            loadToken();
        }

    }, [cartItems])


    //Upate checkout page on the real total of the cart based from the server data
    //(Make sure we have the total from the server, and the checkout page is asking for the value)
    useEffect(() => {
        if (total && props.getServerTotal) {
            props.getServerTotal(total);
        }
    }, [total])


    //Create the charge on the user card
    const chargeUserHandler = async () => {
        //allow future charges to happen in case if current charge fails
        props.updateShouldChargeUser(false);

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
            console.log(err);
        }


        //Properites need to be same as strapi fields for content type
        const strapiBillingDetails = {
            shipping_name: billingDetails.firstName,
            shipping_address: billingDetails.address,
        }

        const data = {
            paymentIntent: result.paymentIntent,
            ...strapiBillingDetails,
            cart,
        }


        //Create a new order object
        const res = await axios.post('http://localhost:1337/orders', data);
        console.log(res.data);

        setSuccess(true);
        // props.clearCart();
    }




    if (token) {
        checkoutFormJSX = (
            <form>

                {success && <p>Your order was successfully processed</p>}
                <div className="card-element">
                    <CardElement options={CARD_ELEMENT_OPTIONS} />
                </div>
                <p>Error goes here</p>
                {/* 
                <button type="submit" disabled={!stripe} onClick={chargeUser}>Submit</button> */}
            </form>
        );
    } else {
        checkoutFormJSX = <p>Loading....</p>
    }



    return checkoutFormJSX;

}

export default CheckoutForm;