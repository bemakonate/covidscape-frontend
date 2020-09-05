import React from 'react'
import Dollar from '../../reusable/dollar';




const Summary = ({ totalPrice }) => {
    return (
        <article className="summary">
            <div className="checkout__text-container">
                <h2>Summary</h2>
                <div className="checkout-subtotal-container">
                    <div className="summary-row">
                        <p className="summary-row-label">Subtotal</p>
                        <p className="summary-row-detail"><Dollar num={totalPrice} /></p>
                    </div>
                    <div className="summary-row">
                        <p className="summary-row-label">Shipping</p>
                        <p className="summary-row-detail">Free</p>
                    </div>

                    <div className="summary-row">
                        <p className="summary-row-label">Estimated Tax</p>
                        <p className="summary-row-detail"><Dollar num={0} /></p>
                    </div>
                    <div className="line"></div>

                    <div className="summary-total">
                        <p className="summary-total-label">Total</p>
                        <p className="summary-total-price">
                            <Dollar num={totalPrice} />
                        </p>
                    </div>
                </div>
                <span className="purchase-warning">Complete Form to purchase</span>
                <button className="buy-btn" disabled>Pay <Dollar num={totalPrice} /> </button>

            </div>
        </article>
    )
}

export default Summary
