import React from 'react'
import { MdClose } from 'react-icons/md';
import NavLinks from './navLinks';

const sidebar = (props) => {
    return (
        <div className={`nav-sidebar ${props.isSidebarOpen ? 'js-og-position' : ''}`}>
            <div className="nav-sidebar__container">
                <div className="nav-sidebar__close" onClick={props.closeSidebar}><MdClose /></div>
                <NavLinks
                    styleClass="nav-sidebar__links"
                    navLinkClass="nav-sidebar__link"
                    click={props.closeSidebar} />

                <div className="nav-sidebar__line line"></div>
                <div className="nav-sidebar__contact">
                    <p className="nav-sidebar__contact__text">+(34) 098-765-4321</p>
                    <p className="nav-sidebar__contact__text"><a href="mailto:info@covidscape.com">info@covidescape.com</a></p>
                </div>

            </div>


        </div>
    )
}

export default sidebar
