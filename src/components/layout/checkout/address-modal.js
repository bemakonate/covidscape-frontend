import React, { useState, useEffect } from 'react'
import Backdrop from '../../basic/Backdrop/Backdrop';
import Mapbox from './mapbox';

const AddressModal = (props) => {
    const [userAddress, setUserAddress] = useState(null);
    // useEffect(() => {
    //     if (props.getAddress) {
    //         props.getAddress(userAddress);
    //     }
    // }, [userAddress])

    const saveAddress = () => {
        if (props.getAddress) {
            props.getAddress(userAddress);
            props.close();
        }
    }
    return (
        <Backdrop show={props.show}>
            <div className="container">
                <div className="address-modal-container">
                    <div className="mapbox-container">
                        <Mapbox
                            getAddress={(address, coordinates) => setUserAddress({ address, coordinates })} />
                    </div>

                    <div className="address-modal-btns">
                        <button className="cancel-address-btn" onClick={props.close}>Cancel</button>
                        <button className="save-address-btn" onClick={saveAddress}>Save</button>

                    </div>
                </div>
            </div>

        </Backdrop>
    )
}

export default AddressModal
