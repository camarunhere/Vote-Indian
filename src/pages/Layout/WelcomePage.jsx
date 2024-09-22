import Home from "../../components/UI/Home";
import classes from './WelcomePage.module.css';

export default function WelcomePage(){
    return(
        <div className={classes.welcome_page}>
            <Home/>
        </div>
    )
}