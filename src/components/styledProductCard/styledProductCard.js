import React from 'react'
import classes from './styledProductCard.module.scss';
import ProductCard from '../productCard/productCard';


const StyledProductCard = (props) => {
    return (
        <ProductCard
            styleClass={classes.Product}
            overlayStyle={classes.ProductOverlay}
            imgContainerStyle={classes.ProductImgContainer}
            imageStyle={classes.ProductImg}
            {...props} />
    )
}



export default StyledProductCard

