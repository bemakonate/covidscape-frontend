import React from 'react'
import GatsbyImage from 'gatsby-image';
import AspectRatio from '../aspectRatio/aspectRatio';
import classes from './productCard.module.scss';
import { AiOutlineEye } from 'react-icons/ai';
import { RiShoppingCart2Line } from 'react-icons/ri';
import { FiInfo } from 'react-icons/fi';
import { BsHeart } from 'react-icons/bs';
import { Link } from 'gatsby';

const productCard = ({ image, type = 'product', ...props }) => {


    const productClasses = `${classes.Product} ${props.styleClass}`;
    const imgClasses = `${classes.ProductImg} ${props.imageStyle}`;
    let cardInfo = null;
    let productBtns = null;

    switch (type) {
        case 'category':

            const categoryInfo = (
                <div className={`${classes.CategoryDetails} ${classes.CardDetails}`}>
                    <p className={classes.CategoryItems}>{props.items} products</p>
                    <h3 className={classes.CategoryTitle}><span className={classes.CategoryTitleText}>{props.title || 'Category'}</span></h3>
                </div>
            );

            cardInfo = categoryInfo;
            break;

        default:
            productBtns = (
                <div className={classes.ProductBtns}>
                    <button className={classes.ProductBtn}><Link to={props.link}><FiInfo /></Link></button>
                    <button className={classes.ProductBtn}><RiShoppingCart2Line /></button>
                    <button className={classes.ProductBtn}><BsHeart /></button>
                </div>
            )
            const productInfo = (
                <div className={`${classes.ProductDetails} ${classes.CardDetails}`}>
                    <p className={classes.ProductTitle}>{props.title || 'Product'}</p>
                    <h3 className={classes.ProductPrice}>{props.price ? `$${props.price}` : 'Price May Vary'}</h3>
                </div>
            );
            cardInfo = productInfo;
    }




    return (
        <div className={productClasses} >
            <AspectRatio height="133%" styleClass={props.imgContainerStyle}>
                <Link to={props.link}>
                    <GatsbyImage fluid={image} className={imgClasses}></GatsbyImage>
                    <div className={`${classes.ProductOverlay} ${props.overlayStyle ? props.overlayStyle : null}`}></div>
                </Link>
                {productBtns}
            </AspectRatio>

            <Link to={props.link}>{cardInfo}</Link>
        </div>
    )
}

export default productCard
