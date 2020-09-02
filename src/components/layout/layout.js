import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import Navbar from './navigation/navbar';
import Sidebar from './navigation/sidebar';
import Footer from './footer/footer';
import CartSidebar from './cart/cart-sidebar';
import '../../styles/main.scss';

const Layout = ({ children, addPadding = false, ...props }) => {

    //Cart Sidebar props
    const { onOpenCartSidebar, onCloseCartSidebar, isCartSidebarOpen, cartItems, onChangeItemQuantity, onRemoveItem, cartTotalPrice, cartTotalItems } = props;


    //Sidebar props
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const openSidebar = () => setIsSidebarOpen(true);
    const closeSidebar = () => setIsSidebarOpen(false);

    return (
        <div className={`layout ${addPadding ? 'layout-padding' : null}`}>
            <Navbar
                openSidebar={openSidebar}
                openCartSidebar={onOpenCartSidebar}
                cartTotalItems={cartTotalItems} />

            <Sidebar
                isSidebarOpen={isSidebarOpen}
                closeSidebar={closeSidebar} />

            <CartSidebar
                isCartSidebarOpen={isCartSidebarOpen}
                closeCartSidebar={onCloseCartSidebar}
                cartItems={cartItems}
                changeItemQuantity={onChangeItemQuantity}
                removeItem={onRemoveItem}
                cartTotalPrice={cartTotalPrice} />

            <div className="site-content">
                {children}
            </div>

            <Footer />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isCartSidebarOpen: state.isCartSidebarOpen,
        cartItems: state.cart,
        cartTotalPrice: state.totalPrice,
        cartTotalItems: state.totalItems,
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onOpenCartSidebar: () => dispatch(actions.openCartSidebar()),
        onCloseCartSidebar: () => dispatch(actions.closeCartSidebar()),
        onChangeItemQuantity: (id, quantity) => dispatch(actions.changeItemQuantity(id, quantity)),
        onRemoveItem: (id) => dispatch(actions.removeItem(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
