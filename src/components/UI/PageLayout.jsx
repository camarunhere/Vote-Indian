import classes from './PageLayout.module.css';


export default function PageLayout({children}){
    return(
        <div className={classes.page_layout}>
            {children}
        </div>  
    )
}