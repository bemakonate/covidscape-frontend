import React from 'react'
import Dollar from '../../reusable/dollar';




const Summary = ({ total, shipping, taxes, subtotal, shouldPayShipping, styleClass }) => {

    return (
        <article className={`summary ${styleClass ? styleClass : ''}`}>
            <div className="checkout__text-container">
                <h2>Summary</h2>
                <div className="checkout-subtotal-container">
                    <div className="summary-row">
                        <p className="summary-row-label">Subtotal</p>
                        <p className="summary-row-detail"><Dollar num={subtotal} /></p>
                    </div>
                    <div className="summary-row">
                        <p className="summary-row-label">Shipping</p>
                        <p className="summary-row-detail">
                            {shouldPayShipping ? <Dollar num={shipping} /> : "Free"}
                        </p>
                    </div>

                    <div className="summary-row">
                        <p className="summary-row-label">Estimated Tax</p>
                        <p className="summary-row-detail"><Dollar num={taxes} /></p>
                    </div>
                    <div className="line"></div>

                    <div className="summary-total">
                        <p className="summary-total-label">Total</p>
                        <p className="summary-total-price">
                            <Dollar cents={total} />
                        </p>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default Summary
