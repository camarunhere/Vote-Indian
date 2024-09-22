import classes from './SideNavBar.module.css';

export default function SideNavBar({className, children}){
    return(
        <div className={className || classes.side_nav}>
            {children}
        </div> 
    )
}