import React, { useEffect } from 'react';
import classes from './Backdrop.module.scss';

const Backdrop = (props) => {
    let backdropClasses = [props.styles, classes.Backdrop, classes.JsHide];

    useEffect(() => {
        const body = document.querySelector('body');

        if (props.show) {
            body.classList.add(classes.Freeze);
        } else {
            body.classList.remove(classes.Freeze);
        }
    }, [props.show])


    if (props.show) {
        backdropClasses.pop(classes.JsHide);
    }
    return (
        <React.Fragment>
            <div onClick={props.click} className={backdropClasses.join(' ')}> </div>
            <div className={classes.BackdropContent}>
                {props.children}
            </div>
        </React.Fragment>



    )
}

export default Backdrop
