import React, { useState, useEffect } from 'react';
import classes from './itemQuantity.module.scss';

const ItemQuantity = (props) => {
    const [itemQuantity, setItemQuantity] = useState(props.num);

    //Make sure to reset the value when the props change
    useEffect(() => {
        setItemQuantity(props.num);
    }, [props.num])

    //Determine the amount of items the person is allowed to purchase
    useEffect(() => {
        if (itemQuantity <= 1 || !itemQuantity) {
            setItemQuantity(1);
        }

        if (props.getQuantity && itemQuantity >= 1) {
            props.getQuantity(itemQuantity);
        }
    }, [itemQuantity]);


    const subtractQuantity = () => setItemQuantity(itemQuantity - 1);
    const addQuantity = () => setItemQuantity(itemQuantity + 1);

    return (
        <div className={`${classes.ItemQuantity} ${props.styleClass ? props.styleClass : ''}  ${props.expand ? classes.Expand : ''}`}>
            <button className={classes.ChangeBtn} onClick={subtractQuantity}>-</button>
            <input type="text" name="quantity" value={itemQuantity} min="1" className={classes.ItemNum} pattern="[0-9]*" disabled />
            <button className={classes.ChangeBtn} onClick={addQuantity}>+</button>
        </div>
    )
}

export default ItemQuantity
