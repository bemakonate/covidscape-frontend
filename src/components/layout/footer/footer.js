import React from 'react';
import { FaFacebookF, FaTwitter, FaPinterest } from 'react-icons/fa';
import { CgInstagram } from 'react-icons/cg';
import footerWidgets from '../../../constants/footer-links';
import PaymentCards from './payment-icons';

const footer = () => {

    return (
        <footer className="layout-footer">
            <div className="footer__info-row">
                <div className="container">
                    {/* For each array create a new footer widget */}
                    <div className="footer__page-links-widgets">
                        {footerWidgets.map((footerWidget, index) => {
                            return (
                                <div className="footer__widget" key={index}>
                                    <ul className="footer__linklist">
                                        {/* For each link in the widget create a new list */}
                                        {footerWidget.map((list, index) =>
                                            <li className="footer__link-item" key={index}>
                                                <a className="footer__link" href={list.link}>{list.label}</a>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            )
                        })}
                    </div>

                    {/* Create Newsletter here */}
                    <div className="footer__newsletter"></div>
                </div>
            </div>


            <div className="site-copyright">
                <div className="container">
                    <div className="copyright-container">

                        <ul className="footer__copyright-widget social-icons">
                            <li className="social-icon"><FaFacebookF /></li>
                            <li className="social-icon"><FaTwitter /></li>
                            <li className="social-icon"><FaPinterest /></li>
                            <li className="social-icon"><CgInstagram /></li>
                        </ul>

                        <div className="coypyright__details-col">
                            <div className="footer__copyright-widget copyright-text">
                                <span>&copy;</span> 2020 <span className="copyright__brand-name">Covidscape</span>. All Rights Reserved.
                            </div>

                            <ul className="footer__copyright-widget payment-cards">
                                {PaymentCards.map((card, index) =>
                                    <li className="payment-card-icon" key={`card-${index}`}>{card}</li>
                                )}
                            </ul>
                        </div>


                    </div>

                </div>
            </div>

        </footer>
    )
}

export default footer
