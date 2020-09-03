import React from 'react';
import GatsbyImage from 'gatsby-image';
import classes from './GatsbyImageFull.module.scss'

const GatsbyImageFull = (props) => {
    return <GatsbyImage className={`${classes.GatsbyImageFull} ${props.styleClass ? props.styleClass : ''}`} fluid={props.image} />
}



export default GatsbyImageFull
