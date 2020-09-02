import React from 'react'
import NavLinks from './navLinks';

//Icons
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { GrSearch } from 'react-icons/gr';
import { RiSurgicalMaskLine } from 'react-icons/ri';

const navigation = (props) => {
    const currentPath = window.location.pathname;
    const ifToOpenCartSidebar = currentPath !== '/cart' ? props.openCartSidebar : null;
    return (
        <nav className="nav">

            <div className="nav__page-links">
                <HiOutlineMenuAlt2 className="nav-icon nav-menu-icon" onClick={props.openSidebar} />
                <NavLinks
                    styleClass="nav-links"
                    navLinkClass="nav-link" />
            </div>
            <div className="nav__brand"><RiSurgicalMaskLine /></div>

            <div className="nav__user-section">
                <GrSearch className="nav__search-icon" />

                <div className="nav__cart" onClick={ifToOpenCartSidebar}>
                    <span>Cart</span>
                    <div className="nav__cart-num">
                        <span>{props.cartTotalItems}</span>
                    </div>
                </div>
            </div>
        </nav>

    )
}

export default navigation
