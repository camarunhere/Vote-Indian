import { Link, Form, NavLink } from "react-router-dom"
import { getLocalStorageToken } from "../util/local_storage"
import { useSelector } from "react-redux";
import classes from './MainNavigation.module.css';
import app_logo from '../assets/images/elections/elections_logo1.png';
import { useState, useEffect } from "react";

export default function MainNavigation(){
    const userToken = getLocalStorageToken();
    const currentUser = useSelector(state => state.user.currentUser);
    // console.log(userToken)
    // console.log(currentUser.role, 'currentUser role')

    //Styling Purpose
    // const [isSticky, setIsSticky] = useState(false);
    // const [isScrolledDown, setIsScrolledDown] = useState(false);
    // const [prevScrollY, setPrevScrollY] = useState(0);

    // //Styling Purpose
    // useEffect(() => {
    //     // console.log('mainNavigation bar rerendering')
    //     const handleScroll = () => {
    //     const currentScrollY = window.scrollY;
    //     setIsScrolledDown(currentScrollY > prevScrollY);
    //     setPrevScrollY(currentScrollY);
    //     setIsSticky(currentScrollY > 0);
    //     };

    //     window.addEventListener('scroll', handleScroll);

    //     return () => {
    //     window.removeEventListener('scroll', handleScroll);
    //     };
    // }, [prevScrollY]);


    return(
        // <header className={`${classes.header} ${isSticky ? classes.sticky : ''} ${isScrolledDown ? classes.smaller : ''}`}>
        <header className={classes.header}>
            <NavLink to='/user' style={{textDecoration:'none'}} >
            <div className={classes.title} >
                <img 
                    src={app_logo} 
                    alt="Study Logo"
                    className={classes.logo}
                />
                <h2>General Elections of India</h2>
            </div> 
            </NavLink>
        <nav className={classes.nav}>  
            <ul className={classes.list}>
                {
                !userToken 
                    ?   <>  
                            <li>
                                <NavLink to='/signup'>
                                    Signup
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/login'>
                                    Login
                                </NavLink>
                            </li>
                        </>
                    :
                        <>
                            <li>
                                <NavLink to='/user/profile'>
                                    Profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/user/articles'>
                                    Articles
                                </NavLink>
                            </li>
                            {(currentUser.role === 'superAdmin') &&
                                <li>
                                    <NavLink to='/user/admin'>
                                        Admin
                                    </NavLink>
                                </li>
                            }
                            <span>
                                <Form method="post" action='/user/logout'>
                                    <button className={classes.del_but}>Logout</button>
                                </Form>
                            </span>
                        </>
                }
            </ul>

        </nav>
        
        </header>
    )
}