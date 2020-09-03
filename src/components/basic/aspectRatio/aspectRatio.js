import React from 'react';
import styled from 'styled-components';

const aspectRatio = ({ height, children, styleClass }) => {
    return (
        <Wrapper height={height} className={styleClass}>
            <div className='aspectRatio__wrapper'>
                <div className='aspectRatio__container'>
                    {children}
                </div>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    .aspectRatio__wrapper {
        position: relative;
        width: 100%;
        /* margin-bottom: 10px; */
    }

    .aspectRatio__wrapper:after {
        content: "";
        display: block;
        padding-bottom: ${props => props.height || '56.4%'};
    }

    .aspectRatio__container {
        position: absolute;
        width: 100%;
        height: 100%;
    }
`;

export default aspectRatio
