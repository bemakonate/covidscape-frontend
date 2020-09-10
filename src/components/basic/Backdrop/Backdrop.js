import React, { useEffect } from 'react';
import classes from './Backdrop.module.scss';
import '../../../styles/5-state/_5-state.scss';

const Backdrop = (props) => {
    let backdropClasses = [classes.Backdrop, props.styles, "js-hide"];
    let backdropContentClasses = [classes.BackdropContent, props.contentClass, "js-hide"];

    useEffect(() => {
        const body = document.querySelector('body');

        if (props.show) {
            body.classList.add(classes.Freeze);
        } else {
            body.classList.remove(classes.Freeze);
        }
    }, [props.show])


    if (props.show) {
        backdropClasses.pop("js-hide");
        backdropContentClasses.pop("js-hide");
    }

    return (
        <React.Fragment>
            <div onClick={props.click} className={backdropClasses.join(' ')}> </div>
            <div className={backdropContentClasses.join(' ')}>
                {props.children}
            </div>
        </React.Fragment>



    )
}

export default Backdrop
