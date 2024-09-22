import { NavLink } from 'react-router-dom';
import classes from './ImageNavLink.module.css';

export default function ImageNavLink({to, src, alt, imageLabel, imgStyle}){
    return(
        <div className={classes.link_block}>
            <NavLink to={to}>
                <img src={src} alt={alt} className={imgStyle ? imgStyle : classes.img}></img>
                <p>{imageLabel}</p>
            </NavLink>
        </div>
    )
}