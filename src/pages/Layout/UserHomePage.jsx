import classes from './UserHomePage.module.css';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import dashboardLogo from '../../assets/images/dashboard.jpg';
import myProfileLogo from '../../assets/images/my_profile_logo.jpeg';
import adminLogo from '../../assets/images/admin.jpg';

export default function UserHomePage(){
    const currentUser = useSelector(state=> state.user.currentUser)

    return(
        <div className={classes.body}>
            <div className={classes.img_links}>
                <div>
                    <NavLink to='profile'>
                        <img src={myProfileLogo} alt="My Profile Logo"></img>
                        <p>My Profile</p>

                    </NavLink>
                </div>
                <div>
                    <NavLink to='articles'>
                        <img src={dashboardLogo} alt="Dashboard Logo"></img>
                        <p>Articles</p>
                    </NavLink>
                </div>
                {(currentUser.role === 'superAdmin') &&
                <div>
                    <NavLink to='admin'>
                        <img src={adminLogo} alt="Admin Logo"></img>
                        <p>Admin Space</p>
                    </NavLink>
                </div>}
            </div>
        </div>
    )
}