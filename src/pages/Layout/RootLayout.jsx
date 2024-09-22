import { Link, Outlet, redirect } from "react-router-dom";
import MainNavigation from "../../components/MainNavigation";
import { getLocalStorageToken } from "../../util/local_storage";
import { useSelector } from "react-redux";
import classes from './RootLayout.module.css';

export default function RootLayout(){
    const isLoggedIn = useSelector(state=>state.auth.isAuthenticated)
    // console.log(isLoggedIn, 'isAuthenticated state value')

    return(
        <div className={classes.body}>
            <MainNavigation/>
            <Outlet/>
        </div>
    )
}

export function loader(){
    const token = getLocalStorageToken();
    if (token) {
        return redirect('/user');
    }
    return token;
}
