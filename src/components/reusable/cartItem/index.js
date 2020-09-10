import React, { useState, useEffect } from 'react'
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { Link } from 'gatsby';
import AspectRatio from '../../basic/aspectRatio/aspectRatio';
import GatsbyImageFull from '../../basic/GatsbyImageFull/GatsbyImageFull';
import ItemQuantity from '../itemQuantity';
import { formatNumber } from '../../../constants/helpers';
import classes from './cartItem.module.scss';
import Dollar from '../dollar';

const CartItem = ({ quantity = 1, price, image, title, id, slug, ...props }) => {
    //Update the component state when the item quantity was changed
    const [itemQuantity, setItemQuantity] = useState(quantity);
    const cartItemPrice = price * quantity;

    //If the quantity of the item change update the global state
    useEffect(() => {
        if (props.changeItemQuantity) {
            props.changeItemQuantity(id, itemQuantity);
        }
        return () => null;

    }, [itemQuantity])


    return (
        <div className={`${classes.CartItem} ${props.expand ? classes.Expand : ''}`}>

            {!props.fixed ? <div className={classes.RemoveBtn} onClick={() => props.removeItem(id)}><IoIosCloseCircleOutline /></div> : null}
            <Link to={!props.fixed ? slug : '#'}>
                <AspectRatio height="100%" styleClass={props.imageWrapperClass ? props.imageWrapperClass : ''}>
                    <GatsbyImageFull image={image} />
                    <div className={classes.ItemOverlay}></div>
                </AspectRatio>
            </Link>

            <div className={classes.ItemContent}>
                <div>
                    <Link to="#" className={classes.Title}>{title || 'Product Title'}</Link>
                    {!props.fixed ? <ItemQuantity num={quantity} getQuantity={setItemQuantity} /> : null}
                    {props.fixed ? (
                        <React.Fragment>
                            <p className={classes.FixedPrice}>Price: <Dollar num={price} /></p>
                            <p className={classes.FixedQuantity}>Qty: {quantity}</p>
                        </React.Fragment>
                    ) : null}
                </div>


                <p className={classes.Price}><Dollar num={cartItemPrice} /></p>
            </div>
        </div>
    )
}

export default CartItem
