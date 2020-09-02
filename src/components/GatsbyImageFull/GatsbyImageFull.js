import React from 'react';
import GatsbyImage from 'gatsby-image';

const GatsbyImageFull = (props) => {
    return <GatsbyImage className={`gatsby-image-full ${props.styleClass ? props.styleClass : ''}`} fluid={props.image} />
}



export default GatsbyImageFull
