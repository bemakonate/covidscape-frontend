import React from 'react';
import { Link } from 'gatsby';


const data = [
    {
        label: 'Home',
        link: '/'
    },
    {
        label: 'Shop',
        link: '/products',
    },
    {
        label: 'Blog',
        link: '#'
    }
]
const navLinks = (props) => {
    return (
        <ul className={props.styleClass}>
            {data.map((item, index) => {
                return <li onClick={props.click} key={`navLink-${index}`}>
                    <Link to={item.link} className={props.navLinkClass}>{item.label}</Link>
                </li>
            })}
        </ul>
    )
}

export default navLinks
