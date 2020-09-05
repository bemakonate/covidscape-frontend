import React from 'react'
import { formatNumber } from '../../../constants/helpers';
import { BiDollar } from 'react-icons/bi';

const Dollar = (props) => {
    return (
        <React.Fragment>
            <span><BiDollar className="dollar-sign" /></span>{formatNumber(props.num)}
        </React.Fragment>
    )
}

export default Dollar;