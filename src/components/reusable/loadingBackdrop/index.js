import React from 'react'
import classes from './loadingBackdrop.module.scss';
import Backdrop from '../../basic/Backdrop/Backdrop';
import Spinner from '../spinner';


const loadingBackdrop = (props) => {
    return (
        <Backdrop show={props.show} styles={classes.LoadingBg} contentClass={classes.LoadingContent}>
            <Spinner color="black" />
        </Backdrop>
    )
}

export default loadingBackdrop
