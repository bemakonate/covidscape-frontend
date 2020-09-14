import React from 'react'
import Dollar from '../../reusable/dollar';




const Summary = ({ serverSummary, styleClass }) => {

    return (
        <article className={`summary ${styleClass ? styleClass : ''}`}>
            <div className="checkout__text-container">
                <h2>Summary</h2>
                <div className="checkout-subtotal-container">
                    <div className="summary-row">
                        <p className="summary-row-label">Subtotal</p>
                        <p className="summary-row-detail"><Dollar num={serverSummary.subtotal} /></p>
                    </div>
                    <div className="summary-row">
                        <p className="summary-row-label">Shipping</p>
                        <p className="summary-row-detail">
                            {serverSummary.shouldPayShipping ? <Dollar num={serverSummary.shipping} /> : "Free"}
                        </p>
                    </div>

                    <div className="summary-row">
                        <p className="summary-row-label">Estimated Tax</p>
                        <p className="summary-row-detail"><Dollar num={serverSummary.taxes} /></p>
                    </div>
                    <div className="line"></div>

                    <div className="summary-total">
                        <p className="summary-total-label">Total</p>
                        <p className="summary-total-price">
                            <Dollar num={serverSummary.total} />
                        </p>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default Summary
