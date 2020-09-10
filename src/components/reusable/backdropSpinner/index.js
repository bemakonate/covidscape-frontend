import React from 'react'
import Backdrop from '../../basic/Backdrop/Backdrop';
import Spinner from '../spinner';

const BackdropSpinner = (props) => {
    return (
        <Backdrop show={props.show} styles={props.styleClass} contentClass={props.contentClass}>
            <Spinner color={props.spinnerColor} />
        </Backdrop>
    )
}

export default BackdropSpinner
