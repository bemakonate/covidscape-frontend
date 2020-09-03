import React from 'react'
import { formatNumber } from '../../../constants/helpers';

const Summary = ({ totalPrice }) => {
    return (
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
    )
}

export default Summary
