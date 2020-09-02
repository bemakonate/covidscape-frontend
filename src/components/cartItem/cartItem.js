import React, { useState, useEffect } from 'react'
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { Link } from 'gatsby';
import AspectRatio from '../aspectRatio/aspectRatio';
import GatsbyImageFull from '../GatsbyImageFull/GatsbyImageFull';
import ItemQuantity from '../itemQuantity/itemQuantity';
import { formatNumber } from '../../constants/helpers';

const CartItem = ({ quantity = 1, price, image, title, id, slug, ...props }) => {
    //Update the component state when the item quantity was changed
    const [itemQuantity, setItemQuantity] = useState(quantity);

    //If the quantity of the item change update the global state
    useEffect(() => {
        if (props.changeItemQuantity) {
            props.changeItemQuantity(id, itemQuantity);
        }

    }, [itemQuantity])


    return (
        <div className={`cart__item ${props.expand ? 'cart__item--expand' : ''}`}>
            {!props.fixed ? <div className="remove-item" onClick={() => props.removeItem(id)}><IoIosCloseCircleOutline /></div> : null}
            <Link to={slug}>
                <AspectRatio height="100%" styleClass={props.imageWrapperClass ? props.imageWrapperClass : ''}>
                    <GatsbyImageFull image={image} />
                    <div className="cart__item-overlay"></div>
                </AspectRatio>
            </Link>

            <div className="item__content">
                <div>
                    <Link to="#" className="item-title">{title || 'Product Title'}</Link>
                    {!props.fixed ? <ItemQuantity num={quantity} getQuantity={setItemQuantity} /> : null}
                    {props.fixed ? (
                        <React.Fragment>
                            <p className="item__og-price">Price: ${price}</p>
                            <p className="item__fixed-quantity">Qty: {quantity}</p>
                        </React.Fragment>
                    ) : null}
                </div>


                <p className="item-price">${formatNumber(price * quantity)}</p>
            </div>
        </div>
    )
}

export default CartItem
