import React from 'react'
import { formatNumber, centsToDollar } from '../../../constants/helpers';
import { BiDollar } from 'react-icons/bi';

const Dollar = (props) => {
    let numText = null;
    if (props.num >= 0) {
        numText = formatNumber(props.num);
    }
    else if (props.cents) {
        numText = centsToDollar(props.cents);
    }
    return (
        <React.Fragment>
            <span><BiDollar className="dollar-sign" /></span>{numText}
        </React.Fragment>
    )
}

export default Dollar;