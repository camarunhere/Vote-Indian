import { NavLink } from "react-router-dom";
import classes from './Home.module.css';
import welcomeImg from '../../assets/images/background_images/voters_hands.webp'
import welcomeImg1 from '../../assets/images/background_images/national-voters-day-2024-wishes-removebg-preview.png'
import inspirationQuoteImg from '../../assets/images/background_images/Inspirational_quotes.jpg'


export default function Home(){
    return(
        <>
            <div style={{display:'flex', flexDirection:'column'}}>
                {/* <img src={inspirationQuoteImg} alt="voters hands" /> */}
                {/* <img src={welcomeImg1} alt="voters hands" width={600} height={400}/> */}
            </div>
            <div className={classes.welcome_block}>    
                <div className={classes.text_block}>
                    <h1>Welcome Voters!</h1>
                    <NavLink 
                        to='/signup'
                        className={classes.getStarted}
                    >
                        Get Started
                    </NavLink>
                </div>
            </div>
        </>
    )
}