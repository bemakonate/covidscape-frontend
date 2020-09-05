import React from 'react'
import classes from './styledProductCard.module.scss';
import ProductCard from '../productCard/productCard';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';


const StyledProductCard = (props) => {
    const { onAddToCart, onOpenCartSidebar } = props;

    const cartBtnClicked = () => {
        onAddToCart(props.product, 1);
        onOpenCartSidebar();
    }

    return (
        <ProductCard
            styleClass={classes.Product}
            overlayStyle={classes.ProductOverlay}
            imgContainerStyle={classes.ProductImgContainer}
            imageStyle={classes.ProductImg}
            cartBtnClicked={cartBtnClicked}
            {...props} />
    )
}

const mapDispatchToProps = dispatch => {
    return {
        onAddToCart: (item, quantity) => dispatch(actions.addToCart(item, quantity)),
        onOpenCartSidebar: () => dispatch(actions.openCartSidebar()),
    }
}



export default connect(null, mapDispatchToProps)(StyledProductCard)

