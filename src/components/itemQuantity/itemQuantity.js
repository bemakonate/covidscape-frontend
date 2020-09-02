import React, { useState, useEffect } from 'react'

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


    const subtractQuantity = () => setItemQuantity(itemQuantity - 1)
    const addQuantity = () => setItemQuantity(itemQuantity + 1);

    return (
        <div className={`item-quantity ${props.styleClass ? props.styleClass : ''}  ${props.expand ? 'item-quantity--expand' : ''}`}>
            <button className="item-quantity__change" onClick={subtractQuantity}>-</button>
            <input type="text" name="quantity" value={itemQuantity} min="1" className="item-quantity__num" pattern="[0-9]*" disabled />
            <button className="item-quantity__change" onClick={addQuantity}>+</button>
        </div>
    )
}

export default ItemQuantity
