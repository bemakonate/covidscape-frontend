import React, { useEffect, useState } from 'react'
import { MdClose } from 'react-icons/md';
import NavLinks from './navLinks';
import Backdrop from '../../basic/Backdrop/Backdrop';
const Sidebar = (props) => {
    const [sidebarTranstion, setSidebarTransition] = useState('');

    useEffect(() => {
        if (props.isSidebarOpen) {
            setSidebarTransition('js-og-position')
        } else {
            setSidebarTransition('')
        }
    }, [props.isSidebarOpen]);

    return (
        <Backdrop show={props.isSidebarOpen} click={props.closeSidebar}>
            <div className={`nav-sidebar ${sidebarTranstion}`}>
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
        </Backdrop>
    )
}

export default Sidebar
